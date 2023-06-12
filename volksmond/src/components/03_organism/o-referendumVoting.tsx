import React, { useEffect, useState, useContext, useCallback } from "react";
import SolutionDataService from "../../services/solution.service";
import ProblemDataService from "../../services/problem.service";
import ISolutionData from '../../types/solution';
import '../../styles/03_organism/o-discussionsList.scss';
import CitizenIdContext from '../../context/CitizenIdContext';

type Props = {
    discussionId?: string | null;
};

const ReferendumVoting: React.FC<Props> = ({ discussionId = null }) => {
  const [solutions, setSolutions] = useState<ISolutionData[]>([]);
  const citizenId = useContext(CitizenIdContext);

  const retrieveAllSolutions = useCallback((): void => {
    SolutionDataService.getByDiscussionId(discussionId)
      .then((response: any) => {
        setSolutions(response.data);
        console.log("response.data", response.data);
        console.log("solutions", solutions);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }, [discussionId, solutions]);

  useEffect(() => {
    retrieveAllSolutions();
  }, [retrieveAllSolutions]);

  const handleVote = (e: React.FormEvent): void => {
    e.preventDefault();
      const target = e.target as typeof e.target & {
        problemId: { value: Uint32Array }
        solutionId: { value: Uint32Array }
        citizenId: { value: Uint32Array }
      };

      const vote = {
        problemId: discussionId,
        solutionId: target.solutionId?.value,
        citizenId: citizenId
      };

    ProblemDataService.vote(vote)
        .then((response: any) => {
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    };

    return (
      <div className="o-referendumVote">
        <form onSubmit={handleVote}>
          <div>
            {solutions.length > 0 ? (
              solutions.map((solution: ISolutionData, index: number) => (
                <div className="o-referendumVote__card" key={index}>
                  <input name="solutionId" type="radio" value={solution.id} id={"solution" + solution.id}></input>
                  <label htmlFor={"solution" + solution.id}>
                    <h3>{solution.title}</h3>
                    <p>{solution.text}</p>
                  </label>
                </div>
              ))
            ) : (
              <div>No solutions found.</div>
            )}
          </div>
          <button type="submit">Vote</button>
        </form>
      </div>
    );
};

export default ReferendumVoting;
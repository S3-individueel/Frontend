import React, { useEffect, useState, useContext } from "react";
import SolutionDataService from "../../services/solution.service";
import ProblemDataService from "../../services/problem.service";
import ISolutionData from '../../types/solution';
import IProblemData from '../../types/problem';
import '../../styles/03_organism/o-discussionsList.scss';
import CommentsList from '../02_molecule/m-commentsList';
import CitizenIdContext from '../../context/CitizenIdContext';

type Props = {
    discussionId?: string | null;
};

const ReferendumVoting: React.FC<Props> = ({ discussionId = null }) => {
  const [solutions, setSolutions] = useState<ISolutionData[]>([]);
  const citizenId = useContext(CitizenIdContext);

    useEffect(() => {
        retrieveAllSolutions();
    }, []);

    const retrieveAllSolutions = (): void => {
        SolutionDataService.getByDiscussionId(discussionId)
            .then((response: any) => {
                setSolutions(response.data);
                console.log("response.data", response.data);
                console.log("solutions", solutions);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

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

    const deleteCitizen = (e: React.FormEvent): void => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            id: { value: number }
        };
        SolutionDataService.delete(target.id.value);
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
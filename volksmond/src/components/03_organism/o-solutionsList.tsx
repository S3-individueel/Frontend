import React, { useEffect, useState, useCallback } from "react";
import SolutionDataService from "../../services/solution.service";
import ISolutionData from '../../types/solution';
import '../../styles/03_organism/o-referendumVote.scss';
import CommentsList from '../02_molecule/m-commentsList';
import { Link } from "react-router-dom";

type Props = {
    discussionId?: string | null;
};

const SolutionsList: React.FC<Props> = ({ discussionId = null }) => {
  const [solutions, setSolutions] = useState<ISolutionData[]>([]);


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

    return (
      <div className="o-solutionsList">
        {solutions.length > 0 ? (
          solutions.map((solution: ISolutionData, index: number) => (
            <div className="o-solutionsList__card" key={index}>
              <h3>{solution.title}</h3>
              <span>{solution.citizen?.firstname} {solution.citizen?.lastname}</span>
              <p>{solution.text}</p>
              <CommentsList solutionId={solution.id} />
              <div>
                <span>{solution.score} points</span>
                <Link to={solution.problemId + "/solution/" + solution.id}>See all comments</Link>
              </div>
            </div>
          ))
        ) : (
      <div>No solutions found.</div>
      )}
</div>
    );
};

export default SolutionsList;
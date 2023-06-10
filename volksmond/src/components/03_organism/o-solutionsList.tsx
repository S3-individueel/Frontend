import React, { useEffect, useState } from "react";
import SolutionDataService from "../../services/solution.service";
import ISolutionData from '../../types/solution';
import '../../styles/03_organism/o-discussionsList.scss';
import CommentsList from '../02_molecule/m-commentsList';

type Props = {
    discussionId?: string | null;
};

const SolutionsList: React.FC<Props> = ({ discussionId = null }) => {
    const [solutions, setSolutions] = useState<ISolutionData[]>([]);

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

    const postCitizen = (e: React.FormEvent): void => {
        e.preventDefault();

        // Rest of the code...

    };

    const deleteCitizen = (e: React.FormEvent): void => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            id: { value: number }
        };
        SolutionDataService.delete(target.id.value);
    };

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
          <a href={solution.problemId + "/solution/" + solution.id}>See all comments</a>
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
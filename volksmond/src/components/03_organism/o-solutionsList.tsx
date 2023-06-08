import React, { useEffect, useState } from "react";
import SolutionDataService from "../../services/solution.service";
import ISolutionData from '../../types/solution';
import '../../styles/03_organism/o-discussionsList.scss';
import CommentsList from '../02_molecule/m-commentsList';

type Props = {};

const SolutionsList: React.FC<Props> = () => {
    const [solutions, setSolutions] = useState<ISolutionData[]>([]);

    useEffect(() => {
        retrieveAllSolutions();
    }, []);

    const retrieveAllSolutions = (): void => {
        SolutionDataService.getAll()
            .then((response: any) => {
                setSolutions(response.data);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const postCitizen = (e: React.FormEvent): void => {
        e.preventDefault();

        const target = e.target as typeof e.target & {
            id?: { value: Uint32Array },
            citizenId?: { value: Uint32Array },
            problemId?: { value: Uint32Array },
            title: { value: string },
            text: { value: string },
            score?: { value: Uint32Array },
        };

        const solution: ISolutionData = {
            id: target.id?.value,
            problemId: target.problemId?.value,
            citizenId: target.citizenId?.value,
            title: target.title?.value,
            text: target.text.value,
            score: target.score?.value,
        };

        SolutionDataService.create(solution)
            .then((response: any) => {
                setSolutions([...solutions, response.data]);
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
        // <div className="o-discussionsList">
        //     {problems.map((problem: ISolutionData, index: number) => (
        //         <div className="o-discussionsList__card">
        //             <h2>{problem.title}</h2>
        //             <span>CitizenId {problem.citizenId}</span>
        //             <p>{problem.description}</p>
        //             <a href={"/discussion/" + problem.id}>See discussions</a>
        //         </div>
        //     ))}
        // </div>

        <div className="o-solutionsList">
            {solutions.map((solution: ISolutionData, index: number) => (
                <div className="o-solutionsList__card" key={index}>
                    <h3>{ solution.title }</h3>
                    <span>CitizenId { solution.citizenId }</span>
                    <p>{ solution.text }</p>

                    <CommentsList />

                    <div>
                        <span>{ solution.score } points</span>
                        <a href={ "/solution/" + solution.id }>See all comments</a>
                    </div>
                </div>
            ))}
        </div>
        
    );
};

export default SolutionsList;

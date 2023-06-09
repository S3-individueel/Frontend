import React, { useEffect, useState } from "react";
import ProblemDataService from "../../services/problem.service";
import SolutionDataService from "../../services/solution.service";
import IProblemData from '../../types/problem';
import ISolutionData from '../../types/solution';
import '../../styles/03_organism/o-solutionsList.scss'
import '../../styles/02_molecule/m-commentsList.scss'
import { useParams } from "react-router-dom";
import SolutionsList from "../03_organism/o-solutionsList";
import CommentsList from "../02_molecule/m-commentsList";

type Props = {};

const SolutionPage: React.FC<Props> = () => {
    const [problems, setProblems] = useState<IProblemData>();
    const [solution, setSolution] = useState<ISolutionData>();
    //const { solutionId } = useParams<{ solutionId: string }>();
    const { solutionId, discussionId } = useParams<{ solutionId: string, discussionId: string }>();

    useEffect(() => {
        retrieveProblem();
        retrieveSolution();
    }, []);

    const retrieveProblem = (): void => {
        ProblemDataService.get(discussionId)
            .then((response: any) => {
                setProblems(response.data);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };
    const retrieveSolution = (): void => {
        SolutionDataService.get(discussionId)
            .then((response: any) => {
                setSolution(response.data);
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
            title: { value: string },
            description: { value: string },
            postDate?: { value: Date },
            gender: { value: string },
            photo: { value: string }
        };

        const problem: IProblemData = {
            id: target.id?.value,
            citizenId: target.citizenId?.value,
            title: target.title?.value,
            description: target.description?.value,
            postDate: target.postDate?.value
        };

        ProblemDataService.create(problem)
            .then((response: any) => {
                setProblems(response.data);
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
        ProblemDataService.delete(target.id.value);
    };

    return (
        <div>
            <h1>{problems?.title}</h1>
            <span>{problems?.citizen?.firstname} {problems?.citizen?.lastname}</span>
            <p>
                {problems?.description}
            </p>
            <strong>Referendum starts {problems?.postDate?.toString()}</strong>

            <h2>Suggested solution</h2>
            <div>
                <h3>{solution?.title}</h3>
                <span>{solution?.citizen?.firstname} {solution?.citizen?.lastname}</span>
                <p>{solution?.text}</p>

                <div>
                    <button>^</button>
                    <span>{solution?.score}</span>
                    <button>v</button>
                </div>

                <CommentsList solutionId={solutionId}/>
            </div>
        </div>
    );
};

export default SolutionPage;

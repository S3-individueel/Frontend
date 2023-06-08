import React, { useEffect, useState } from "react";
import ProblemDataService from "../../services/problem.service";
import IProblemData from '../../types/problem';
import '../../styles/03_organism/o-solutionsList.scss'
import '../../styles/02_molecule/m-commentsList.scss'
import { useParams } from "react-router-dom";
import SolutionsList from "../03_organism/o-solutionsList";

type Props = {};

const DiscussionPage: React.FC<Props> = () => {
    const [problems, setProblems] = useState<IProblemData>();
    const { discussionId } = useParams<{ discussionId: string }>();

    useEffect(() => {
        retrieveAllCitizens();
    }, []);

    const retrieveAllCitizens = (): void => {
        ProblemDataService.get(discussionId)
            .then((response: any) => {
                setProblems(response.data);
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
            <span>CitizenId {problems?.citizenId}</span>
            <p>
                {problems?.description}
            </p>
            <strong>Referendum starts {problems?.postDate?.toString()}</strong>

            <h2>Suggested solutions</h2>
            
            <SolutionsList />
        </div>
    );
};

export default DiscussionPage;

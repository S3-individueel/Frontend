import React, { useEffect, useState } from "react";
import ProblemDataService from "../../services/problem.service";
import IProblemData from '../../types/problem';
import '../../styles/03_organism/o-discussionsList.scss';

type Props = {};

const DiscussionsList: React.FC<Props> = () => {
    const [problems, setProblems] = useState<IProblemData[]>([]);

    useEffect(() => {
        retrieveAllProblems();
    }, []);

    const retrieveAllProblems = (): void => {
        ProblemDataService.getAll()
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
                setProblems([...problems, response.data]);
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
        <div className="o-discussionsList">
            {problems.map((problem: IProblemData, index: number) => (
                <div className="o-discussionsList__card">
                    <h2>{ problem.title }</h2>
                    <span>{problem.citizen?.firstname} {problem.citizen?.lastname}</span>
                    <p>{ problem.description }</p>
                    <a href={ "/discussion/" + problem.id }>See discussion</a>
                </div>
            ))}
        </div>
    );
};

export default DiscussionsList;

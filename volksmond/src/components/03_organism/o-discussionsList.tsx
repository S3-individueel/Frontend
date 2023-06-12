import React, { useEffect, useState, useCallback } from "react";
import ProblemDataService from "../../services/problem.service";
import IProblemData from '../../types/problem';
import '../../styles/03_organism/o-discussionsList.scss';

type Props = {};

const DiscussionsList: React.FC<Props> = () => {
    const [problems, setProblems] = useState<IProblemData[]>([]);

    const retrieveAllProblems = useCallback((): void => {
        ProblemDataService.getAll()
            .then((response: any) => {
                setProblems(response.data);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }, []);

    useEffect(() => {
        retrieveAllProblems();
    }, [retrieveAllProblems]);

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

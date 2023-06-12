import React, { useCallback, useEffect, useState } from "react";
import ProblemDataService from "../../services/problem.service";
import IProblemData from '../../types/problem';
import IReferendumData from '../../types/referendum';
import '../../styles/03_organism/o-solutionsList.scss'
import '../../styles/02_molecule/m-commentsList.scss'
import { useParams } from "react-router-dom";
import SolutionsList from "../03_organism/o-solutionsList";
import ReferendumVoting from "../03_organism/o-referendumVoting";
import SolutionDataService from "../../services/solution.service";
type Props = {};

const DiscussionPage: React.FC<Props> = () => {
    const [problems, setProblems] = useState<IProblemData>();
    const { discussionId } = useParams<{ discussionId: string }>();
    const [solutionTitle, setSolutionTitle] = useState("");
    const [solutionText, setSolutionText] = useState("");


    const retrieveProblem = useCallback((): void => {
        ProblemDataService.get(discussionId)
            .then((response: any) => {
                setProblems(response.data);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }, [discussionId]);

    useEffect(() => {
        retrieveProblem();
    }, [retrieveProblem]);

    const createSolution = (e: React.FormEvent): void => {
        e.preventDefault();

        const solutionData = {
            title: solutionTitle,
            text: solutionText,
            citizenId: 1, // Replace with the actual citizenId value
            problemId: discussionId,
        };

        SolutionDataService.create(solutionData)
            .then((response: any) => {
                // Handle the successful creation of the solution
                console.log(response.data);
                // You can update the state or perform any other necessary actions
            })
            .catch((error: Error) => {
                // Handle the error if necessary
                console.log(error);
            });

        // Reset the form fields
        setSolutionTitle("");
        setSolutionText("");
    };

    const handleSolutionTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSolutionTitle(e.target.value);
    };

    const handleSolutionTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setSolutionText(e.target.value);
    };

    return (
        <div>
            <h1>{problems?.title}</h1>
            <span>{problems?.citizen?.firstname} {problems?.citizen?.lastname}</span>
            <p>
                {problems?.description}
            </p>
            {problems?.referendums?.map((referendum: IReferendumData, index: number) => {
                const votingStart = referendum.votingStart ? new Date(referendum.votingStart) : null;
                const votingEnd = referendum.votingEnd ? new Date(referendum.votingEnd) : null;

                if(referendum.active){
                    return (
                        <div>
                            <strong key={index}>
                                Voting ends {votingEnd?.toLocaleDateString()} {votingEnd?.toLocaleTimeString()} 
                            </strong>

                            <div>
                                <ReferendumVoting discussionId={discussionId} />
                            </div>
                        </div>
                    );
                } else if (referendum.ended) {
                    return (
                        <div>
                            <strong key={index}>
                                Voting ended {votingEnd?.toLocaleDateString()} {votingEnd?.toLocaleTimeString()}
                            </strong>
                            <h2>winner:</h2>
                            <h1>{referendum.winningSolution?.title}</h1>
                        </div>
                    );
                } else {
                    return (
                        <strong key={index}>
                            Referendum starts from {votingStart?.toLocaleDateString()} {votingStart?.toLocaleTimeString()} till {votingEnd?.toLocaleDateString()} {votingEnd?.toLocaleTimeString()}
                        </strong>
                    );
                }
            })}

            <h2>Create solution</h2>
            <form onSubmit={createSolution}>
                <div>
                    <label htmlFor="solutionTitle">Title:</label>
                    <input
                        type="text"
                        id="solutionTitle"
                        value={solutionTitle}
                        onChange={handleSolutionTitleChange}
                    />
                </div>
                <div>
                    <label htmlFor="solutionText">Text:</label>
                    <textarea
                        id="solutionText"
                        value={solutionText}
                        onChange={handleSolutionTextChange}
                    ></textarea>
                </div>
                <button type="submit">Create</button>
            </form>

            <h2>Suggested solutions</h2>

            <SolutionsList discussionId={discussionId} />
        </div>
    );
};

export default DiscussionPage;

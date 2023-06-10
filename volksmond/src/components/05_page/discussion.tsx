import React, { useEffect, useState } from "react";
import ProblemDataService from "../../services/problem.service";
import IProblemData from '../../types/problem';
import '../../styles/03_organism/o-solutionsList.scss'
import '../../styles/02_molecule/m-commentsList.scss'
import { useParams } from "react-router-dom";
import SolutionsList from "../03_organism/o-solutionsList";
import SolutionDataService from "../../services/solution.service";

type Props = {};

const DiscussionPage: React.FC<Props> = () => {
    const [problems, setProblems] = useState<IProblemData>();
    const { discussionId, solutionId } = useParams<{ discussionId: string, solutionId: string }>();
    const [solutionTitle, setSolutionTitle] = useState("");
    const [solutionText, setSolutionText] = useState("");

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

    const postProblem = (e: React.FormEvent): void => {
        e.preventDefault();

        const target = e.target as typeof e.target & {
            id?: { value: Uint32Array },
            citizenId?: { value: Uint32Array },
            title: { value: string },
            description: { value: string },
            postDate?: { value: Date },
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

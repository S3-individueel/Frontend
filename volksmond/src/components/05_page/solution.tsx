import React, { useEffect, useState } from "react";
import ProblemDataService from "../../services/problem.service";
import SolutionDataService from "../../services/solution.service";
import ReplyDataService from "../../services/reply.service";
import IProblemData from '../../types/problem';
import ISolutionData from '../../types/solution';
import IReplyData from '../../types/reply';
import '../../styles/05_page/p-solution.scss'
import '../../styles/03_organism/o-solutionsList.scss'
import '../../styles/02_molecule/m-commentsList.scss'
import { useParams } from "react-router-dom";
import SolutionsList from "../03_organism/o-solutionsList";
import CommentsList from "../02_molecule/m-commentsList";

type Props = {};

const SolutionPage: React.FC<Props> = () => {
    const [problems, setProblems] = useState<IProblemData>();
    const [solution, setSolution] = useState<ISolutionData>();
    const [replies, setReplies] = useState<IReplyData[]>([]);
    const [selectedReply, setSelectedReply] = useState<{
        name: string,
        text: string,
        citizenId: any,
        replyId: any
    }>();
    const [sortValue, setSortValue] = useState<string>(''); // Sort value for CommentsList
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
        SolutionDataService.get(solutionId)
            .then((response: any) => {
                setSolution(response.data);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };


    const handleVote = (solutionId: any, voteType: any) => {
        SolutionDataService.vote({ solutionId: solutionId, citizenId: 1, vote: voteType })
            .then((response: any) => {
                // Update the score in the local state
                if (solution) {
                    solution.score = response.data.score;
                    setSolution({ ...solution });
                }
            })
            .catch((error: Error) => {
                // Handle the error if necessary
                console.log(error);
            });
    };

    const postReply = (e: React.FormEvent): void => {
        e.preventDefault();

        const target = e.target as typeof e.target & {
            text: { value: string };
            citizenId: { value: number };
            replyId: { value: number };
            solutionId: { value: number };
        };

        const reply: IReplyData = {
            text: target.text.value,
            citizenId: target.citizenId.value,
            replyId: target.replyId.value,
            solutionId: target.solutionId.value,
        };

        ReplyDataService.create(reply)
            .then((response: any) => {
                setReplies([...replies, response.data]);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });

        // Reset the reply form
        target.text.value = '';
    };

    const handleReplySelect = (_name: string, _text: string, _citizenId: any, _replyId: any) => {
        var reply = {
            name: _name,
            text: _text,
            citizenId: _citizenId,
            replyId: _replyId
        }
        setSelectedReply(reply);
        console.log(selectedReply);
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortValue(e.target.value);
    };

    const deleteCitizen = (e: React.FormEvent): void => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            id: { value: number }
        };
        ProblemDataService.delete(target.id.value);
    };

    return (
        <div className="p-solution">
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

                <div className="a-votes">
                    <button onClick={() => handleVote(solution?.id, 1)}>^</button>
                    <span>{solution?.score}</span>
                    <button onClick={() => handleVote(solution?.id, -1)}>v</button>
                </div>

                <h4>Comments</h4>
                <label htmlFor="sort-select">Sort by:</label>
                <select id="sort-select" value={sortValue} onChange={handleSortChange}>
                    <option value="">None</option>
                    <option value="score">Score</option>
                    <option value="id">ID</option>
                </select>

                <CommentsList solutionId={solutionId} handleReply={handleReplySelect} sortValue={sortValue} />

                <form onSubmit={postReply}>
                    {selectedReply ? (
                        <div className="replyShowcase">
                            <h5>{selectedReply.name}</h5>
                            <p>{selectedReply.text}</p>
                            <input name="replyId" type="hidden" value={selectedReply.replyId} />
                        </div>
                    ) : (
                        <input name="replyId" type="hidden" value="0" />
                    )}

                    <label>citizenId</label>
                    <input name="citizenId" type="number" />
                    <br />
                    <label>Reply</label>
                    <textarea name="text" placeholder="Type your reply..." required />
                    <input name="solutionId" type="hidden" defaultValue={solutionId} />
                    <button type="submit">Reply</button>
                </form>
            </div>
        </div>
    );
};

export default SolutionPage;

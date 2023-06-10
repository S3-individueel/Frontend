import React, { useEffect, useState, useContext } from "react";
import ReplyDataService from "../../services/reply.service";
import IReplyData from '../../types/reply';
import '../../styles/03_organism/o-discussionsList.scss';
import CitizenIdContext from '../../context/CitizenIdContext';

type Props = {
    repliesProp?: IReplyData[] | null; // Optional parent ID for nested comments
    solutionId?: any | null;
    handleReply?: Function | null;
    sortValue?: string; // Sort value received as prop
};

const CommentsList: React.FC<Props> = ({
    repliesProp = null,
    solutionId = null,
    handleReply = null,
    sortValue = '',
}) => {
    const [replies, setReplies] = useState<IReplyData[]>([]);
    const citizenId = useContext(CitizenIdContext);

    useEffect(() => {
        if (repliesProp != null) {
            setReplies(repliesProp);
        } else {
            retrieveAllReplies();
        }
    }, []);

    useEffect(() => {
        sortReplies();
    }, [sortValue]);

    const retrieveAllReplies = (): void => {
        ReplyDataService.getBySolutionId(solutionId)
            .then((response: any) => {
                setReplies(response.data);
            })
            .catch((e: Error) => {
                //console.log(e);
            });
    };

    const handleVote = (replyId: any, voteType: any) => {
        ReplyDataService.vote({ replyId: replyId, citizenId: citizenId, vote: voteType })
            .then((response: any) => {
                // Update the score in the local state
                const updatedReplies = replies.map((reply) => {
                    if (reply.id === replyId) {
                        return { ...reply, score: response.data.score };
                    }
                    return reply;
                });
                setReplies(updatedReplies);
            })
            .catch((error: Error) => {
                // Handle the error if necessary
                console.log(error);
            });
    };

    const deleteCitizen = (e: React.FormEvent): void => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            id: { value: number };
        };
        ReplyDataService.delete(target.id.value);
    };

    const sortReplies = () => {
        switch (sortValue) {
            case 'score':
                const sortedRepliesByScore = [...replies].sort((a, b) => b.score - a.score);
                setReplies(sortedRepliesByScore);
                break;
            case 'id':
                const sortedRepliesById = [...replies].sort((a, b) => a.id - b.id);
                setReplies(sortedRepliesById);
                break;
            default:
                // No sorting or invalid sorting value
                break;
        }
    };

    return (
        <div className="m-commentsList">

            {replies.map((reply: IReplyData, index: number) =>
                handleReply ? (
                    <div key={index}>
                        <span>
                            {reply.citizen?.firstname} {reply.citizen?.lastname}
                        </span>
                        <p>{reply.text}</p>

                        <div className="a-votes">
                            <button onClick={() => handleVote(reply.id, 1)}>^</button>
                            <span>{reply.score}</span>
                            <button onClick={() => handleVote(reply.id, -1)}>v</button>
                        </div>

                        <button
                            onClick={() =>
                                handleReply(reply.citizen?.firstname, reply.text, reply.citizenId, reply.id)
                            }
                        >
                            Reply
                        </button>

                        <CommentsList repliesProp={reply.replies} handleReply={handleReply} sortValue={sortValue} />
                    </div>
                ) : (
                    <div key={index} className="m-commentsList--truncate">
                        <span>
                            {reply.citizen?.firstname} {reply.citizen?.lastname}
                        </span>
                        <p>{reply.text}</p>

                        <CommentsList repliesProp={reply.replies} sortValue={sortValue} />
                    </div>
                )
            )}
        </div>
    );
};

export default CommentsList;

import React, { useEffect, useState } from "react";
import ReplyDataService from "../../services/reply.service";
import IReplyData from '../../types/reply';
import '../../styles/03_organism/o-discussionsList.scss';

type Props = {
    repliesProp?: IReplyData[] | null; // Optional parent ID for nested comments
    solutionId?: any | null;
    handleReply?: Function | null;
};

const CommentsList: React.FC<Props> = ({
    repliesProp = null,
    solutionId = null,
    handleReply = null,
}) => {
    const [replies, setReplies] = useState<IReplyData[]>([]);

    useEffect(() => {
        if (repliesProp != null) {
            setReplies(repliesProp);
        } else {
            retrieveAllReplies();
        }
    }, []);

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
        ReplyDataService.vote({ replyId: replyId, citizenId: 1, vote: voteType })
            .then((response: any) => {
                // Handle the response if necessary
                console.log(response);
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

    return (
        <div className="m-commentsList">
            {replies.map((reply: IReplyData, index: number) => (
                handleReply ? (
                    <div key={index}>
                        <span>{reply.citizen?.firstname} {reply.citizen?.lastname}</span>
                        <p>{reply.text} <small>...{reply.id}</small></p>

                        <div className="a-votes">
                            <button onClick={() => handleVote(reply.id, 1)}>^</button>
                            <span>{reply.score}</span>
                            <button onClick={() => handleVote(reply.id, -1)}>v</button>
                        </div>

                        <button onClick={() => handleReply(reply.citizen?.firstname, reply.text, reply.citizenId, reply.id)}>Reply</button>

                        <CommentsList repliesProp={reply.replies} handleReply={handleReply}/>
                    </div>
                ) : (
                    <div key={index}>
                        <span>{reply.citizen?.firstname} {reply.citizen?.lastname}</span>
                        <p>{reply.text}</p>

                        <CommentsList repliesProp={reply.replies} />
                    </div>
                )
            ))}
        </div>
    );
};

export default CommentsList;

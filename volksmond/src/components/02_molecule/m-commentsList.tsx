import React, { useEffect, useState } from "react";
import ReplyDataService from "../../services/reply.service";
import IReplyData from '../../types/reply';
import '../../styles/03_organism/o-discussionsList.scss';

type Props = {
    repliesProp?: [] | null; // Optional parent ID for nested comments
    discussionId?: any | null;
};

const CommentsList: React.FC<Props> = ({ repliesProp = null, discussionId = null }) => {
    const [replies, setReplies] = useState<IReplyData[]>([]);

    useEffect(() => {
        if(repliesProp)
            setReplies(repliesProp);
        else
            retrieveAllReplies();
    }, []);

    const retrieveAllReplies = (): void => {
        ReplyDataService.getBySolutionId(discussionId)
            .then((response: any) => {
                setReplies(response.data);
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
            solutionId?: { value: Uint32Array },
            replyId?: { value: Uint32Array },
            text: { value: string },
            isDeleted?: { value: boolean },
            isPinned?: { value: boolean }
        };

        const reply: IReplyData = {
            id: target.id?.value,
            citizenId: target.citizenId?.value,
            solutionId: target.solutionId?.value,
            replyId: target.replyId?.value,
            text: target.text.value,
            isDeleted: target.isDeleted?.value,
            isPinned: target.isPinned?.value,
        };

        ReplyDataService.create(reply)
            .then((response: any) => {
                setReplies([...replies, response.data]);
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
        ReplyDataService.delete(target.id.value);
    };

    return (

        <div className="m-commentsList">
            {replies.map((reply: IReplyData, index: number) => (
                <div key={index}>
                    <span>CitizenId {reply.citizenId}</span>
                    <p>{reply.text}</p>
                    <CommentsList repliesProp={reply.replies} />
                </div>
            ))}
        </div>

    );
};

export default CommentsList;

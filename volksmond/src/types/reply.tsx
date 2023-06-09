export default interface IReplyData {
    id?: any | null,
    citizenId?: any | null,
    solutionId?: any | null,
    replyId?: any | null,
    text: string,
    isDeleted?: boolean,
    isPinned?: boolean,
    replies?: [],
    votes?: [],
}
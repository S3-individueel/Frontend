import ICitizenData from "./citizen";

export default interface ISolutionData {
    id?: any | null,
    problemId?: any | null,
    citizenId?: any | null,
    title: string,
    text: string,
    score?: any | null,
    replies?: [] | null,
    votes?: [] | null,
    citizen?: ICitizenData | null,
}
import ICitizenData from "./citizen";

export default interface IProblemData {
    id?: any | null,
    citizenId?: any | null,
    title: string,
    description: string,
    postDate?: Date,
    citizen?: ICitizenData
}
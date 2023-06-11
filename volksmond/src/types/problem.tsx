import ICitizenData from "./citizen";
import IReferendumData from "./referendum";

export default interface IProblemData {
    id?: any | null,
    citizenId?: any | null,
    title: string,
    description: string,
    postDate?: Date,
    citizen?: ICitizenData,
    referendums?: IReferendumData[]
}
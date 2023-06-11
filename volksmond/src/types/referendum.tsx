import ISolutionData from "./solution"

export default interface IReferendumData {
    id?: any | null,
    problemId?: any | null,
    votingStart?: Date
    votingEnd?: Date,
    active?: boolean,
    ended?: boolean,
    winningSolution?: ISolutionData
}
import http from "../http-common";
import ISolutionData from "../types/solution"

class SolutionDataService {
    getAll() {
        return http.get<Array<ISolutionData>>("/Solutions");
    }

    get(id: any) {
        return http.get<ISolutionData>(`/Solutions/${id}`);
    }

    getByDiscussionId(id: any) {
        return http.get<ISolutionData>(`/Problems/${id}/Solutions`);
    }

    create(data: ISolutionData) {
        return http.post<ISolutionData>("/Solutions", data);
    }

    update(data: ISolutionData, id: any) {
        return http.put<any>(`/Solutions/${id}`, data);
    }

    delete(id: any) {
        return http.delete<any>(`/Solutions/${id}`);
    }

    deleteAll() {
        return http.delete<any>(`/Solutions`);
    }

    findByTitle(title: string) {
        return http.get<Array<ISolutionData>>(`/Solutions?title=${title}`);
    }

    vote(vote: { solutionId: any, citizenId: any, vote: any }) {
        return http.post<any>(`/Solutions/${vote.solutionId}/vote`, vote)
    }
}

const solutionDataService = new SolutionDataService();
export default solutionDataService;
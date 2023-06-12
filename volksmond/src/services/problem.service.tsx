import http from "../http-common";
import IProblemData from "../types/problem"

class ProblemDataService {
    getAll() {
        return http.get<Array<IProblemData>>("/Problems");
    }

    get(id: any) {
        return http.get<IProblemData>(`/Problems/${id}`);
    }

    create(data: IProblemData) {
        return http.post<IProblemData>("/Problems", data);
    }

    update(data: IProblemData, id: any) {
        return http.put<any>(`/Problems/${id}`, data);
    }

    delete(id: any) {
        return http.delete<any>(`/Problems/${id}`);
    }

    deleteAll() {
        return http.delete<any>(`/Problems`);
    }

    findByTitle(title: string) {
        return http.get<Array<IProblemData>>(`/Problems?title=${title}`);
    }

    vote(vote: { problemId: any, solutionId: any, citizenId: any }) {
        return http.post<any>(`/Problems/${vote.problemId}/vote`, vote)
    }
}

const problemDataService = new ProblemDataService();
export default problemDataService;
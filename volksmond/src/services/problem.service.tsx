import http from "../http-common";
import IProblemData from "../types/problem"

class ProblemDataService {
    getAll() {
        return http.get<Array<IProblemData>>("/Problems");
    }

    get(id: string) {
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
}

export default new ProblemDataService();
import http from "../http-common";
import ISolutionData from "../types/solution"

class SolutionDataService {
    getAll() {
        return http.get<Array<ISolutionData>>("/Solutions");
    }

    get(id: string) {
        return http.get<ISolutionData>(`/Solutions/${id}`);
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
}

export default new SolutionDataService();
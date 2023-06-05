import http from "../http-common";
import ICitizenData from "../types/citizen"

class CitizenDataService {
    getAll() {
        return http.get<Array<ICitizenData>>("/Citizens");
    }

    get(id: string) {
        return http.get<ICitizenData>(`/Citizens/${id}`);
    }

    create(data: ICitizenData) {
        return http.post<ICitizenData>("/Citizens", data);
    }

    update(data: ICitizenData, id: any) {
        return http.put<any>(`/Citizens/${id}`, data);
    }

    delete(id: any) {
        return http.delete<any>(`/Citizens/${id}`);
    }

    deleteAll() {
        return http.delete<any>(`/Citizens`);
    }

    findByTitle(title: string) {
        return http.get<Array<ICitizenData>>(`/Citizens?title=${title}`);
    }
}

export default new CitizenDataService();
import http from "../http-common";
import IReplyData from "../types/reply"

class ReplyDataService {
    getAll() {
        return http.get<Array<IReplyData>>("/Replies");
    }

    getBySolutionId(id: any) {
        return http.get<IReplyData>(`/Solutions/${id}/Replies`);
    }

    get(id: any) {
        return http.get<IReplyData>(`/Replies/${id}`);
    }

    create(data: IReplyData) {
        return http.post<IReplyData>("/Replies", data);
    }

    update(data: IReplyData, id: any) {
        return http.put<any>(`/Replies/${id}`, data);
    }

    delete(id: any) {
        return http.delete<any>(`/Replies/${id}`);
    }

    deleteAll() {
        return http.delete<any>(`/Replies`);
    }

    findByTitle(title: string) {
        return http.get<Array<IReplyData>>(`/Replies?title=${title}`);
    }
}

export default new ReplyDataService();
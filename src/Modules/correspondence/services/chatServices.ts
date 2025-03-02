import { api } from "../../../api";

const ChatServices = {
  get: async () => {
    const response = await api.get("/correspondence/chat/");
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/correspondence/chat/${id}/`);
    return response.data;
  },
  getUsersByPosition: async () => {
    const response = await api.get("/positions/list-of-position/");
    return response.data;
  },
  post: async (data: any) => {
    const response = await api.post("/correspondence/chat/", data);
    return response.data;
  },
  patch: async (id: number, data: any) => {
    const response = await api.patch(`/correspondence/chat/${id}/`, data);
    return response.data;
  },
};

export default ChatServices;

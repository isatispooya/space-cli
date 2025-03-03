import { api } from "../../../api";
import { ChatType } from "../types";

const ChatServices = {
  get: async (): Promise<ChatType["MessagesType"][]> => {
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
  post: async (data: ChatType["postMessegeType"]) => {
    const response = await api.post("/correspondence/chat/", data);
    return response.data;
  },
  patch: async (id: number, data: ChatType["postMessegeType"]) => {
    const response = await api.patch(`/correspondence/chat/${id}/`, data);
    return response.data;
  },
  patchSeen: async (sender_id: number, data: ChatType["postSeenType"]) => {
    const response = await api.patch(
      `/correspondence/seen-chat/${sender_id}/`,
      data
    );
    return response.data;
  },
};

export default ChatServices;

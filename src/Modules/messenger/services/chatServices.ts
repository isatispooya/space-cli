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
  getUserOfPosition: async () => {
    const response = await api.get("/positions/user-list-of-position/");
    return response.data;
  },
  post: async (data: ChatType["postMessegeType"]) => {
    const response = await api.post("/correspondence/chat/", data);
    return response.data;
  },

  postAttachment: async (data: FormData) => {
    try {
      // اگر data از نوع FormData نیست، یک خطا پرتاب کنید
      if (!(data instanceof FormData)) {
        throw new Error("داده باید از نوع FormData باشد");
      }

      // ارسال درخواست با FormData
      const response = await api.post("/correspondence/attache/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      console.error("خطا در ارسال فایل:", error);
      throw error;
    }
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

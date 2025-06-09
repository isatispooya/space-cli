import { toast } from "react-toastify";
import { api } from "../../../api";
import { ChatType } from "../types/chat.type";

const handleSuccess = (message: string) => {
  toast.success(message || "عملیات با موفقیت انجام شد");
};

const handleError = (error: any) => {
  const msg = error?.response?.data?.error;
  ("خطایی رخ داده است");
  toast.error(msg);
  throw error;
};

const ChatServices = {
  get: async (): Promise<ChatType["MessagesType"][]> => {
    const response = await api.get("/correspondence/chat/");
    return response.data;
  },
  search: async (query: string): Promise<ChatType["MessagesType"][]> => {
    const response = await api.get(
      `/correspondence/correspondence/?query=${query}`
    );
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/correspondence/chat/${id}/`);
    return response.data;
  },

  getUserOfPosition: async () => {
    const response = await api.get("/positions/user-list-of-position/");
    return response.data;
  },
  post: async (data: ChatType["postMessegeType"]) => {
    try {
      const response = await api.post("/correspondence/chat/", data);
      handleSuccess("پیام با موفقیت ارسال شد");
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  postAttachment: async (data: FormData) => {
    try {
      if (!(data instanceof FormData)) {
        throw new Error("داده باید از نوع FormData باشد");
      }
      const response = await api.post("/correspondence/attache/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      handleSuccess("فایل با موفقیت ارسال شد");
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  patch: async (id: number, data: ChatType["postMessegeType"]) => {
    try {
      const response = await api.patch(`/correspondence/chat/${id}/`, data);
      handleSuccess("پیام با موفقیت ویرایش شد");
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  patchSeen: async (sender_id: number, data: ChatType["postSeenType"]) => {
    try {
      const response = await api.patch(
        `/correspondence/seen-chat/${sender_id}/`,
        data
      );
      return response.data;
    } catch (error) {
      console.log("error", error);
    }
  },
};

export default ChatServices;

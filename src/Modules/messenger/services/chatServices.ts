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

  postAttachment: async (data: any) => {
    // Create a new FormData object
    const formData = new FormData();

    // Append data to FormData
    // If data is an object, loop through its properties
    if (typeof data === "object" && data !== null) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
    } else {
      // If data is a single value, append it with a default key
      formData.append("file", data);
    }

    // Make the POST request with FormData
    const response = await api.post("/correspondence/attache/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

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

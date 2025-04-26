import { api } from "@/api";

const receiveSer = {
  getReceive: async () => {
    const response = await api.get("/correspondence/correspondence/");
    return response.data;
  },
  getReceiveById: async (id: string) => {
    const response = await api.get(`/correspondence/correspondence/${id}/`);
    return response.data;
  },
};

export default receiveSer;

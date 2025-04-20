import { api } from "@/api";

const receiveSer = {
  getReceive: async () => {
    const response = await api.get("/correspondence/correspondence/");
    return response.data;
  },
};

export default receiveSer;

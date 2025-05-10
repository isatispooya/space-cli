import { api } from "../../../api";
import { EmProcessPostType } from "../types";

const emProcessServices = {
  getEmProcess: async () => {
    const response = await api.get("/positions/job-history/");
    return response.data;
  },
  postEmprocess: async (data: EmProcessPostType) => {
    const response = await api.post("/positions/job-history/", data);
    return response.data;
  },
  deleteEmprocess: async (id: number) => {
    const response = await api.delete(`/positions/job-history/${id}/`);
    return response.data;
  },
  updateEmprocess: async (id: number, data: EmProcessPostType) => {
    const response = await api.patch(`/positions/job-history/${id}/`, data);
    return response.data;
  },
};
export default emProcessServices;

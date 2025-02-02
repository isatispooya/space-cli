import { api } from "../../../api";  
import { CorrespondencePostType, CorrespondenceTypes } from "../types";


const correspondenceService = {
  get: async () => {
    const response = await api.get("/correspondence/");
    return response.data;
  },

  create: async (data: CorrespondencePostType) => {
    const response = await api.post("/correspondence/", data);
    return response.data;
  },

  update: async (id: number, data: CorrespondenceTypes) => {
    const response = await api.patch(`/correspondence/${id}/`, data);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await api.delete(`/correspondence/${id}/`);
    return response.data;
  },
};

export default correspondenceService;




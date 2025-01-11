import api from "../../../api/api";
import { CompanyData } from "../types/companyData.type";

export const companiesService = {
  get: async () => {
    const response = await api.get("/companies/");
    return response.data;
  },

  create: async (data: FormData) => {
    const response = await api.post("/companies/", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  update: async (id: number, data: CompanyData) => {
    const response = await api.patch(`/companies/${id}/`, data);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await api.delete(`/companies/${id}/`);
    return response.data;
  },
};

export default companiesService;

import api from "../../../api/api";
import { CompanyPostType, CompanyType } from "../types";

export const companiesService = {
  get: async () : Promise<CompanyType["getCompanyRes"]> => {
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

  update: async (id: number, data: CompanyPostType) : Promise<CompanyType["getCompanyRes"]> => {
    const response = await api.patch(`/companies/${id}/`, data);
    return response.data;
  },

  delete: async (id: number) : Promise<void> => {
    const response = await api.delete(`/companies/${id}/`);
    return response.data;
  },
  postCompanyRasmio: async (data: FormData) => {
    const response = await api.post("/companies/register-company-from-rasmio/", data);
    return response.data;
  },
  getCompanyRasmio: async (id?: number) => {
    const endpoint = id 
      ? `/companies/register-company-from-rasmio/${id}/`
      : '/companies/register-company-from-rasmio/';
    const response = await api.get(endpoint);
    return response.data;
  },
};

export default companiesService;

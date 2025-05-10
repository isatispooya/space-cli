import { api } from "../../../api";
import { UnderwritingType } from "../types/underwriting.type";
import { UnderwritingCreateType } from "../types/underwritingCreate.type";

const underwritingServices = {
  get: async () => {
    const response = await api.get("/stock_affairs/create_underwriting/");
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/stock_affairs/create_underwriting/${id}/`);
    return response.data;
  },
  create: async (data: UnderwritingCreateType) => {
    const response = await api.post(
      "/stock_affairs/create_underwriting/",
      data
    );
    return response.data;
  },
  update: async (data: UnderwritingType) => {
    const response = await api.patch(
      `/stock_affairs/create_underwriting/${data.id}/`,
      data
    );
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(
      `/stock_affairs/create_underwriting/${id}/`
    );
    return response.data;
  },
  getReports: async () => {
    const response = await api.get("/stock_affairs/underwriting-report/");
    return response.data;
  },
};

export default underwritingServices;

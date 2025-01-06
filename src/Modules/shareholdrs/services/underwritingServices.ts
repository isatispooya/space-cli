import { api } from "../../../api";
import { underwritingCreateTypes, underwritingTypes } from "../types";

const underwritingServices = {
  get: async () => {
    const response = await api.get("/stock_affairs/create_underwriting/");
    return response.data;
  },
  create: async (data: underwritingCreateTypes) => {
    const response = await api.post("/stock_affairs/create_underwriting/", data);
    return response.data;
  },
  update: async (data: underwritingTypes) => {
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

};

export default underwritingServices;



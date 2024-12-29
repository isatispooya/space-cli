import { api } from "../../../api";
import { PrecedenceTypes } from "../types";

const precendenceServices = {
  get: async () => {
    const response = await api.get("/stock_affairs/precedence/");
    return response.data;
  },
  create: async (data: PrecedenceTypes) => {
    const response = await api.post("/stock_affairs/precedence/", data);
    return response.data;
  },
  update: async (id: string, data: PrecedenceTypes) => {
    const response = await api.patch(`/stock_affairs/precedence/${id}/`, data);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/stock_affairs/precedence/${id}/`);
    return response.data;
  },
};

export default precendenceServices;
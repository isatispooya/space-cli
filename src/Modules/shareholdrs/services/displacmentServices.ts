import { api } from "../../../api";
import { DisplacementPrecendenceType } from "../types/displacementPrecendence.type";

const displacmentServices = {
  get: async () => {
    const response = await api.get("/stock_affairs/displacement_precedence/");
    return response.data;
  },
  create: async (data: DisplacementPrecendenceType) => {
    const response = await api.post(
      "/stock_affairs/displacement_precedence/",
      data
    );
    return response.data;
  },
  update: async (id: string, data: DisplacementPrecendenceType) => {
    const response = await api.patch(
      `/stock_affairs/displacement_precedence/${id}/`,
      data
    );
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(
      `/stock_affairs/displacement_precedence/${id}/`
    );
    return response.data;
  },
};

export default displacmentServices;

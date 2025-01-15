import { api } from "../../../api";
import {  CapitalIncreaseTypes } from "../types/capitalIncrease.type";
import { CapitalIncreaseCreate } from "../types/capitalCreate.type";

const capitalServices = {
  get: async () => {
    const response = await api.get("/stock_affairs/capital_increase_payment/");
    return response.data;
  },
  create: async (data: CapitalIncreaseCreate) => {
    const response = await api.post(
      "/stock_affairs/capital_increase_payment/",
      data
    );
    return response.data;
  },
  update: async (data: CapitalIncreaseTypes, id: number) => {
    const response = await api.patch(
      `/stock_affairs/capital_increase_payment/${id}/`,
      data
    );
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(
      `/stock_affairs/capital_increase_payment/${id}/`
    );
    return response.data;
  },
};

export default capitalServices;

import { api } from "../../../api"; 
import { PrecedenceTypes } from "../types";

const patchPrecendence = async (id: number, data: PrecedenceTypes) => {
  return await api.patch(`/stock_affairs/precedence/${id}/`, data);
};

export default patchPrecendence;

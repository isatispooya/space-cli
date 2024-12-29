import { api } from "../../../api";
import { PrecedenceTypes } from "../types";

const postPrecendence = async (data: PrecedenceTypes) => {
  const response = await api.post("/stock_affairs/precedence/", data);
  return response.data;
};

export default postPrecendence;

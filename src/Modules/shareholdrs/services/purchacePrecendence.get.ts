import { api } from "../../../api";

const getPurchacePrecendence = async () => {
  const response = await api.get("/stock_affairs/unused_precedence_purchase/");
  return response.data;
};

export default getPurchacePrecendence;

import { api } from "../../../api";

const getPurchacePrecendence = async () => {
  const response = await api.get("/stock_affairs/create_unused_purchase/");
  return response.data;
};

export default getPurchacePrecendence;

import { api } from "../../../api";

const getPrecedence = async () => {
  const response = await api.get("/stock_affairs/precedence/");
  return response.data;
};

export default getPrecedence;

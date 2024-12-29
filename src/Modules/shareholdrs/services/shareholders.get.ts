import { api } from "../../../api";

const getShareholders = async () => {
  const response = await api.get("/stock_affairs/shareholders/");
  return response.data;
};

export default getShareholders;

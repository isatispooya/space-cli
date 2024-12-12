import { api } from "../../../api";

const getDisplacementPrecendence = async () => {
  const response = await api.get("/stock_affairs/displacement_precedence/");
  return response.data;
};

export default getDisplacementPrecendence;

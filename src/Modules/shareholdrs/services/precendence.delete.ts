import { api } from "../../../api";

const deletePrecendence = async (id: number) => {
  return await api.delete(`/stock_affairs/precedence/${id}/`);
};

export default deletePrecendence;

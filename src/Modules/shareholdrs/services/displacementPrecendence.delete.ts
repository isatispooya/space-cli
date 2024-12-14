import { api } from "../../../api";

const displacementPrecendenceDelete = (id: number) => {
  return api.delete(`/stock_affairs/displacement_precedence/${id}/`);
};

export default displacementPrecendenceDelete;

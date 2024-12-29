import { api } from "../../../api";
import { PurchacePrecendenceCreate } from "../types";

const unusedPrecedenceProcessPatch = async (id: number , data: PurchacePrecendenceCreate) => {
  const response = await api.patch(
    `/stock_affairs/unused_precedence_purchase/${id}/`
  , data);
  return response.data;
};
export default unusedPrecedenceProcessPatch;

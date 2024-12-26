import {
  PurchacePrecendenceCreate,
  purchacePrecendenceTypes,
} from "../types/PurchacePrecendence.type";
import { api } from "../../../api";

const postPurchacePrecendence = async (
  data: PurchacePrecendenceCreate
): Promise<purchacePrecendenceTypes> => {
  const response = await api.post("/api/purchase-precedence/", data);
  return response.data;
};

export default postPurchacePrecendence;

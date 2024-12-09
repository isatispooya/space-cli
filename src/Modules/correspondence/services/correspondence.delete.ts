import { api } from "../../../api";
import { CorrespondenceTypes } from "../types";

const deleteCorrespondence = async (
  id: number
): Promise<CorrespondenceTypes> => {
  const response = await api.delete(`/correspondence/${id}`);
  return response.data;
};

export default deleteCorrespondence;

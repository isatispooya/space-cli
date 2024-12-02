import api from "../../../api/api";
import { DeleteCorrespondenceResponse } from "../types";



 const deleteCorrespondence = async (id: number): Promise<DeleteCorrespondenceResponse> => {
  const response = await api.delete(`/correspondence/${id}`);
  return response.data;
}; 

export default deleteCorrespondence;

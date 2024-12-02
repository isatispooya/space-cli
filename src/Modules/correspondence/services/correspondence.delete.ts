import api from "../../../api/api";

export interface DeleteCorrespondenceResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: [];
}

export const deleteCorrespondence = async (id: number): Promise<DeleteCorrespondenceResponse> => {
  const response = await api.delete(`/correspondence/${id}`);
  return response.data;
}; 
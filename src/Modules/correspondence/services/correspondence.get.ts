import { api } from "../../../api";
import { CorrespondenceTypes } from "../types";

interface CorrespondencesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: CorrespondenceTypes[];
}

const getCorrespondences = async (): Promise<CorrespondencesResponse> => {
  const response = await api.get("/correspondence/");
  return response.data;
};

export default getCorrespondences;

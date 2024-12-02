import api from "../../../api/api";
import { CorrespondenceData } from "../types";

interface CorrespondencesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: CorrespondenceData[];
}

const getCorrespondences = async (): Promise<CorrespondencesResponse> => {
  const response = await api.get("/correspondence/");
  return response.data;
};

export default getCorrespondences;

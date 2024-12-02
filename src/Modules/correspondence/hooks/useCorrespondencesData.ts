import { useQuery } from "@tanstack/react-query";
import { getCorrespondence } from "../services";
import { CorrespondenceData } from "../types";

interface CorrespondencesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: CorrespondenceData[];
}

const useCorrespondencesData = () => {
  return useQuery<CorrespondencesResponse>({
    queryKey: ["correspondences"],
    queryFn: getCorrespondence,
  });
};

export default useCorrespondencesData;

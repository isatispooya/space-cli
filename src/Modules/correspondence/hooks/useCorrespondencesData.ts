import { useQuery } from "@tanstack/react-query";
import { getCorrespondence } from "../services";
import { CorrespondenceTypes } from "../types";

interface CorrespondencesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: CorrespondenceTypes[];
}

const useCorrespondencesData = () => {
  return useQuery<CorrespondencesResponse>({
    queryKey: ["correspondences"],
    queryFn: getCorrespondence,
  });
};

export default useCorrespondencesData;

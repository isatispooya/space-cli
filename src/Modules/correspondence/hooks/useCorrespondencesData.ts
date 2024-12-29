import { useQuery } from "@tanstack/react-query";
import { correspondenceService } from "../services";
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
    queryFn: correspondenceService.get,
  });
};

export default useCorrespondencesData;

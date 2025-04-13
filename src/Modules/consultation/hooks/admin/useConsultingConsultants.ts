import { useQuery, UseQueryResult } from "@tanstack/react-query";
import consultingConsultantsService from "../../services/admin/consultingConsultantsService";

const useConsultingConsultants = {
  useGetConsultingConsultants: (): UseQueryResult => {
    return useQuery({
      queryKey: ["consulting-consultants"],
      queryFn: consultingConsultantsService.getConsultingConsultants,
    });
  },
};

export default useConsultingConsultants;

import { useQuery } from "@tanstack/react-query";
import { companiesService } from "../services";

const useCompaniesData = () => {
  return useQuery({
    queryKey: ["companies"],
    queryFn: companiesService.get,
  });
};

export default useCompaniesData;

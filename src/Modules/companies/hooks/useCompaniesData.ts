import { useQuery } from "@tanstack/react-query";
import { getCompanies } from "../services"; 

const useCompaniesData = () => {
  return useQuery({
    queryKey: ["companies"],
    queryFn: getCompanies,
  });
};

export default useCompaniesData;

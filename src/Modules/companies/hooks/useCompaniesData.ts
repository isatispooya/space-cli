import { useQuery } from "@tanstack/react-query";
import getCompanies from "../services/companies.get";

const useCompaniesData = () => {
  return useQuery({
    queryKey: ["companies"],
    queryFn: getCompanies,
  });
};

export default useCompaniesData;

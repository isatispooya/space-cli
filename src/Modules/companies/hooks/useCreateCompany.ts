import { useMutation } from "@tanstack/react-query";
import { companiesService } from "../services";
import { CompanyData } from "../types/companyData.type";

const useCreateCompany = () => {
  return useMutation<void, Error, CompanyData>({
    mutationFn: companiesService.create,
  });
};

export default useCreateCompany;

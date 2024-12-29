import { useMutation } from "@tanstack/react-query";
import { companiesService } from "../services";
import { CompanyData } from "../types/companyData.type";

const useUpdateCompany = (id: number) => {
  return useMutation<CompanyData, Error, CompanyData>({
    mutationKey: ["updateCompany", id],
    mutationFn: (data) => companiesService.update(id, data),
  });
};

export default useUpdateCompany;

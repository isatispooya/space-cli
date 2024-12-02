import { useMutation } from "@tanstack/react-query";
import { updateCompany } from "../services";
import { CompanyFormValues, CompanyData } from "../types";

const useUpdateCompany = (id: number) => {
  return useMutation<CompanyData, Error, CompanyFormValues>({
    mutationKey: ["updateCompany", id],
    mutationFn: (data) => updateCompany(id, data),
  });
};

export default useUpdateCompany;

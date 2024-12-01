import { useMutation } from "@tanstack/react-query";
import deleteCompany from "../services/companies.delete";

export const useDeleteCompany = () => {
  return useMutation({
    mutationKey: ["deleteCompany"],
    mutationFn: deleteCompany,
  });
};

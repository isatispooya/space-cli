import { useMutation } from "@tanstack/react-query";
import deleteCompany from "../services/companies.delete";

const useDeleteCompany = () => {
  return useMutation({
    mutationKey: ["deleteCompany"],
    mutationFn: deleteCompany,
  });
};

export default useDeleteCompany;

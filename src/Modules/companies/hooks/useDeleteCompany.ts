import { useMutation } from "@tanstack/react-query";
import { companiesService } from "../services";

const useDeleteCompany = () => {
  return useMutation({
    mutationKey: ["deleteCompany"],
    mutationFn: companiesService.delete,
  });
};

export default useDeleteCompany;

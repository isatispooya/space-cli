import { useMutation } from "@tanstack/react-query";
import { createCompany } from "../services";
import { ICreateCompaniesPost } from "../types";

const useCreateCompany = () => {
  return useMutation<void, Error, ICreateCompaniesPost>({
    mutationFn: createCompany,
  });
};

export default useCreateCompany;

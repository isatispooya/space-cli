import { useMutation } from "@tanstack/react-query";
import createCompaniesPost, {
  ICreateCompaniesPost,
} from "../services/createcompanies.post";

const useCreateCompany = () => {
  return useMutation<void, Error, ICreateCompaniesPost>({
    mutationFn: createCompaniesPost,
  });
};

export default useCreateCompany;

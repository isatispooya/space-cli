import { useMutation } from "@tanstack/react-query";
import updateCompany from "../services/updatecompanies.patch";

const useUpdateCompany = () => {
  return useMutation({
    mutationKey: ["updateCompany"],
    mutationFn: updateCompany,
  });
};
 
export default useUpdateCompany;
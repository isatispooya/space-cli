import { employmentServices } from "../services";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
  useQueryClient,
} from "@tanstack/react-query";
import { EmploymentsPostTypes, EmploymentsTypes } from "../types";
import { AxiosError } from "axios";

const useEmployments = {
  useGetJobOffers: (): UseQueryResult<EmploymentsTypes[]> => {
    return useQuery({
      queryKey: ["employments"],
      queryFn: employmentServices.getEmployments,
    });
  },
  usePostJobOffer: (): UseMutationResult<
    EmploymentsPostTypes,
    AxiosError,
    FormData
  > => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationKey: ["postJobOffer"],
      mutationFn: (formData: FormData) => {
        const data = Object.fromEntries(
          formData
        ) as unknown as EmploymentsPostTypes;
        return employmentServices.postJobOffer(data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["employments"] });
      },
    });
  },
};

export default useEmployments;

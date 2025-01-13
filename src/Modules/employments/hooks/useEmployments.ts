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
    EmploymentsTypes,
    AxiosError,
    FormData
  > => {
    const queryClient = useQueryClient();

    return useMutation<EmploymentsTypes, AxiosError, FormData>({
      mutationKey: ["postJobOffer"],
      mutationFn: (data: FormData) => employmentServices.postJobOffer(data as EmploymentsPostTypes),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["employments"] });
      },
    });
  },
};

export default useEmployments;

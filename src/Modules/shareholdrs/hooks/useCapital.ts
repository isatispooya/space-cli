import {
  useQuery,
  useMutation,
  UseMutationResult,
  UseQueryResult,
} from "@tanstack/react-query";
import {  CapitalIncreaseCreate } from "../types/capitalCreate.type";
import { CapitalIncreaseTypes } from "../types/capitalIncrease.type";
import { capitalServices } from "../services";

const useCapital = {
  useGet: (): UseQueryResult<CapitalIncreaseTypes[]> => {
    return useQuery({
      queryKey: ["capital"],
      queryFn: capitalServices.get,
    });
  },
  useCreate: (): UseMutationResult<
    CapitalIncreaseTypes,
    Error,
    CapitalIncreaseCreate
  > => {
    return useMutation<CapitalIncreaseTypes, Error, CapitalIncreaseCreate>({
      mutationFn: capitalServices.create,
    });
  },
  useUpdate: (): UseMutationResult<
    CapitalIncreaseTypes,
    Error,
    { id: number; data: CapitalIncreaseTypes }
  > => {
    return useMutation({
      mutationFn: ({ id, data }) => capitalServices.update(data, id),
    });
  },
  useDelete: (): UseMutationResult<void, Error, number> => {
    return useMutation({
      mutationFn: (id: number) => capitalServices.delete(id),
    });
  },
};

export default useCapital;

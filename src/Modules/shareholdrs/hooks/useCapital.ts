import {
  useQuery,
  useMutation,
  UseMutationResult,
  UseQueryResult,
} from "@tanstack/react-query";
import { CapitalIncreaseCreateType } from "../types/capitalCreate.type";
import { CapitalIncreaseType } from "../types/capitalIncrease.type";
import { capitalServices } from "../services";

const useCapital = {
  useGet: (): UseQueryResult<CapitalIncreaseType[]> => {
    return useQuery({
      queryKey: ["capital"],
      queryFn: capitalServices.get,
    });
  },
  useCreate: (): UseMutationResult<
    CapitalIncreaseType,
    Error,
    CapitalIncreaseCreateType
  > => {
    return useMutation<CapitalIncreaseType, Error, CapitalIncreaseCreateType>({
      mutationFn: capitalServices.create,
    });
  },
  useUpdate: (): UseMutationResult<
    CapitalIncreaseType,
    Error,
    { id: number; data: CapitalIncreaseType }
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

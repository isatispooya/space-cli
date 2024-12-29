import {
  useQuery,
  useMutation,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";
import precendenceServices from "../services/precendenceServices";
import { PrecedenceTypes } from "../types";

const usePrecendence = {
  useGet: (): UseQueryResult<PrecedenceTypes[]> => {
    return useQuery({
      queryKey: ["precedence"],
      queryFn: precendenceServices.get,
    });
  },

  useCreate: (): UseMutationResult<PrecedenceTypes, Error, PrecedenceTypes> => {
    return useMutation({
      mutationKey: ["createPrecedence"],
      mutationFn: (data: PrecedenceTypes) => precendenceServices.create(data),
    });
  },

  useUpdate: (): UseMutationResult<
    PrecedenceTypes,
    Error,
    { id: string; data: PrecedenceTypes }
  > => {
    return useMutation({
      mutationKey: ["updatePrecedence"],
      mutationFn: ({ id, data }) => precendenceServices.update(id, data),
    });
  },

  useDelete: (): UseMutationResult<void, Error, string> => {
    return useMutation({
      mutationKey: ["deletePrecedence"],
      mutationFn: (id: string) => precendenceServices.delete(id),
    });
  },
};

export default usePrecendence;

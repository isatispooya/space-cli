import {
  useQuery,
  useMutation,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";
import precendenceServices from "../services/precendenceServices";
import { PrecedenceType } from "../types/precedence.type";

const usePrecendence = {
  useGet: (): UseQueryResult<PrecedenceType[]> => {
    return useQuery({
      queryKey: ["precedence"],
      queryFn: precendenceServices.get,
    });
  },

  useGetById: (id: number): UseQueryResult<PrecedenceType> => {
    return useQuery({
      queryKey: ["precedence", id],
      queryFn: () => precendenceServices.getById(id),
    });
  },

  useCreate: (): UseMutationResult<
    PrecedenceType,
    Error,
    PrecedenceType
  > => {
    return useMutation({
      mutationKey: ["createPrecedence"],
      mutationFn: (data: PrecedenceType) => precendenceServices.create(data),
    });
  },

  useUpdate: (): UseMutationResult<
    PrecedenceType,
    Error,
    { id: string; data: PrecedenceType }
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

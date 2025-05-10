import {
  useQuery,
  useMutation,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";
import displacementServices from "../services/displacmentServices";
import { DisplacementPrecendenceType } from "../types/displacementPrecendence.type";

const useDisplacement = {
  useGet: (): UseQueryResult<DisplacementPrecendenceType[]> => {
    return useQuery({
      queryKey: ["displacement"],
      queryFn: displacementServices.get,
    });
  },
  useCreate: (): UseMutationResult<
    DisplacementPrecendenceType,
    Error,
    DisplacementPrecendenceType
  > => {
    return useMutation({
      mutationKey: ["createDisplacement"],
      mutationFn: (data: DisplacementPrecendenceType) =>
        displacementServices.create(data),
    });
  },
  useUpdate: (): UseMutationResult<
    DisplacementPrecendenceType,
    Error,
    { id: string; data: DisplacementPrecendenceType }
  > => {
    return useMutation({
      mutationKey: ["updateDisplacement"],
      mutationFn: ({ id, data }) => displacementServices.update(id, data),
    });
  },
  useDelete: (): UseMutationResult<void, Error, string> => {
    return useMutation({
      mutationKey: ["deleteDisplacement"],
      mutationFn: (id: string) => displacementServices.delete(id),
    });
  },
};

export default useDisplacement;

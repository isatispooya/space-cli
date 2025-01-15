import {
  useQuery,
  useMutation,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";
import displacementServices from "../services/displacmentServices";
import { DisplacementPrecendenceTypes } from "../types/displacementPrecendence.type";

const useDisplacement = {
  useGet: (): UseQueryResult<DisplacementPrecendenceTypes[]> => {
    return useQuery({
      queryKey: ["displacement"],
      queryFn: displacementServices.get,
    });
  },
  useCreate: (): UseMutationResult<
    DisplacementPrecendenceTypes,
    Error,
    DisplacementPrecendenceTypes
  > => {
    return useMutation({
      mutationKey: ["createDisplacement"],
      mutationFn: (data: DisplacementPrecendenceTypes) =>
        displacementServices.create(data),
    });
  },
  useUpdate: (): UseMutationResult<
    DisplacementPrecendenceTypes,
    Error,
    { id: string; data: DisplacementPrecendenceTypes }
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

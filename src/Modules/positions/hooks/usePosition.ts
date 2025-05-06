import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { getPositions, patchPosition, postPosition } from "../services";
import { PositionPostTypes, PositionTypes } from "../types";
import { AxiosError } from "axios";
import getAllPositions from "../services/allposition.get";
import getUserOfPosition from "../services/userOfPosition.get";
export const usePosition = {
  useGet: (): UseQueryResult<PositionTypes[]> => {
    return useQuery({
      queryKey: ["positions.get"],
      queryFn: getPositions,
    });
  },
  useGetAll: (): UseQueryResult<PositionTypes[]> => {
    return useQuery({
      queryKey: ["positions.getAll"],
      queryFn: getAllPositions,
    });
  },
  useGetUserOfPosition: (): UseQueryResult<PositionTypes[]> => {
    return useQuery({
      queryKey: ["positions.getUserOfPosition"],
      queryFn: getUserOfPosition,
    });
  },
  useCreate: (): UseMutationResult<
    PositionPostTypes,
    AxiosError,
    PositionPostTypes
  > => {
    return useMutation({
      mutationKey: ["create-position"],
      mutationFn: async (data: PositionPostTypes) => {
        const response = await postPosition(data);
        return response.data;
      },
    });
  },
  useUpdate: (
    id: number
  ): UseMutationResult<
    PositionPostTypes,
    AxiosError,
    { data: PositionPostTypes }
  > => {
    return useMutation({
      mutationKey: ["update-position"],
      mutationFn: async ({ data }: { data: PositionPostTypes }) => {
        const response = await patchPosition({ id, data });
        return response.data;
      },
    });
  },
};

export default usePosition;

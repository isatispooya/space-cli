import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { getPositions, patchPosition, postPosition } from "../services";
import { PositionPostType, PositionType } from "../types";
import { AxiosError } from "axios";
import getAllPositions from "../services/allposition.get";
import getUserOfPosition from "../services/userOfPosition.get";
export const usePosition = {
  useGet: (): UseQueryResult<PositionType[]> => {
    return useQuery({
      queryKey: ["positions.get"],
      queryFn: getPositions,
    });
  },
  useGetAll: (): UseQueryResult<PositionType[]> => {
    return useQuery({
      queryKey: ["positions.getAll"],
      queryFn: getAllPositions,
    });
  },
  useGetUserOfPosition: (): UseQueryResult<PositionType[]> => {
    return useQuery({
      queryKey: ["positions.getUserOfPosition"],
      queryFn: getUserOfPosition,
    });
  },
  useCreate: (): UseMutationResult<
    PositionPostType,
    AxiosError,
    PositionPostType
  > => {
    return useMutation({
      mutationKey: ["create-position"],
      mutationFn: async (data: PositionPostType) => {
        const response = await postPosition(data);
        return response.data;
      },
    });
  },
  useUpdate: (
    id: number
  ): UseMutationResult<
    PositionPostType,
    AxiosError,
    { data: PositionPostType }
  > => {
    return useMutation({
      mutationKey: ["update-position"],
      mutationFn: async ({ data }: { data: PositionPostType }) => {
        const response = await patchPosition({ id, data });
        return response.data;
      },
    });
  },
};

export default usePosition;

import {
  useQuery,
  useMutation,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";
import shareServices from "../services/shareServices";
import { ShareholdersTypes } from "../types/shareholders.type";
import ShareHoldersNewTypes from "../types/shareHolderss.type";


const useShareholders = {
  useGet: (): UseQueryResult<ShareHoldersNewTypes[]> => {
    return useQuery({
      queryKey: ["shareholders"],
      queryFn: shareServices.get,
    });
  },

  useCreate: (): UseMutationResult<
    ShareholdersTypes,
    Error,
    ShareholdersTypes
  > => {
    return useMutation({
      mutationFn: (data: ShareholdersTypes) => shareServices.create(data),
    });
  },

  useUpdate: (): UseMutationResult<
    ShareholdersTypes,
    Error,
    { id: string; data: ShareholdersTypes }
  > => {
    return useMutation({
      mutationFn: ({ id, data }) => shareServices.update(id, data),
    });
  },

  useDelete: (): UseMutationResult<void, Error, string> => {
    return useMutation({
      mutationFn: (id: string) => shareServices.delete(id),
    });
  },
};

export default useShareholders;

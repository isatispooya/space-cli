import { ShareHoldersNewType } from "./../types/shareHolderss.type";
import {
  useQuery,
  useMutation,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";
import shareServices from "../services/shareServices";
import { ShareholdersType } from "../types/shareholders.type";

const useShareholders = {
  useGet: (): UseQueryResult<ShareHoldersNewType[]> => {
    return useQuery({
      queryKey: ["shareholders"],
      queryFn: shareServices.get,
    });
  },

  useCreate: (): UseMutationResult<
    ShareholdersType,
    Error,
    ShareholdersType
  > => {
    return useMutation({
      mutationFn: (data: ShareholdersType) => shareServices.create(data),
    });
  },

  useUpdate: (): UseMutationResult<
    ShareholdersType,
    Error,
    { id: string; data: ShareholdersType }
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

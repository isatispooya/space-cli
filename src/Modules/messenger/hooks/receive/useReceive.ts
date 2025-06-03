import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { receiveSer } from "../../services/receive";
import { ReferralReqType } from "../../types/receive/ReceiveMessage.type";
import { SenderType } from "../../types/sent/sent.type";
import { ArchiveReqType } from "../../types/receive/archive";

const useReceive = {
  useGet: (): UseQueryResult<ReferralReqType> => {
    return useQuery({
      queryKey: ["receive"],
      queryFn: receiveSer.getReceive,
    });
  },
  useGetById: (id: string): UseQueryResult<{ sender: SenderType }> => {
    return useQuery({
      queryKey: ["receiveById", id],
      queryFn: () => receiveSer.getReceiveById(id),
    });
  },
  usePostRefferal: (): UseMutationResult<
    ReferralReqType,
    Error,
    ReferralReqType
  > => {
    return useMutation({
      mutationKey: ["receivePost"],
      mutationFn: receiveSer.postRefferal,
    });
  },
  useGetReceiveWorkflow: (id: string): UseQueryResult<any> => {
    return useQuery({
      queryKey: ["receiveWorkflow", id],
      queryFn: () => receiveSer.getReceiveWorkflow(id),
    });
  },
  usePostArchive: (): UseMutationResult<
    ArchiveReqType,
    Error,
    ArchiveReqType
  > => {
    return useMutation({
      mutationKey: ["receivePostArchive"],
      mutationFn: (data: ArchiveReqType) => receiveSer.postArchive(data),
    });
  },
  useDeleteArchive: () => {
    return useMutation({
      mutationKey: ["receiveDeleteArchive"],
      mutationFn: ({ id }: { id: string }) => receiveSer.deleteArchive(id),
    });
  }
  
};

export default useReceive;

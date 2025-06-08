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
import { toast } from "react-toastify";

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
  },

  useGetReceiveWorkflow: (): UseQueryResult<any> => {
    return useQuery({
      queryKey: ["receiveWorkflow"],
      queryFn: () => receiveSer.getReceiveWorkflow(),
    });
  },

  usePostReceiveWorkflow: () => {
    return useMutation({
      mutationKey: ["receivePostWorkflow"],
      mutationFn: (data: any) => receiveSer.postReceiveWorkflow(data),
      onSuccess: () => {
        toast.success("ارسال شد");
      },
      onError: () => {
        toast.error("خطا در ارسال");
      },
    });
  },

  useGetReference: (id: string): UseQueryResult<any> => {
    return useQuery({
      queryKey: ["receiveReference"],
      queryFn: () => receiveSer.getReference(id),
    });
  },
};

export default useReceive;

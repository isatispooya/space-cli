import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { receiveSer } from "../../services/receive";
import { 
 
  CorrespondenceReceiverType, 
  ReferralReqType 
} from "../../types/receive/ReceiveMessage.type";
import { SenderType } from "../../types/sent/sent.type";

const useReceive = {
  useGet: (): UseQueryResult<CorrespondenceReceiverType> => {
    return useQuery({
      queryKey: ["receive"],
      queryFn: receiveSer.getReceive,
    });
  },

  useGetById: (id: string): UseQueryResult<{sender: SenderType}> => {
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
};

export default useReceive;

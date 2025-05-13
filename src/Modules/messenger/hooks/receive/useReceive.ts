import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { receiveSer } from "../../services/receive";
import { ReferralReqType } from "../../types/receive/ReceiveMessage.type";

const useReceive = {
  useGet: (): UseQueryResult<any> => {
    return useQuery({
      queryKey: ["receive"],
      queryFn: receiveSer.getReceive,
    });
  },

  useGetById: (id: string): UseQueryResult<any> => {
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
};

export default useReceive;

import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";

import giftUserServices from "../services/giftUserService";
import { RequestType, RequestUpdateType } from "../types";

const useGiftsUser = {
  useGetGifts: (): UseQueryResult<RequestType[]> => {
    return useQuery({
      queryKey: ["giftsUser"],
      queryFn: giftUserServices.get,
    });
  },
  useUpdateGiftsUser: (): UseMutationResult<
    RequestType,
    Error,
    { id: number; data: RequestUpdateType }
  > => {
    return useMutation({
      mutationKey: ["updateGiftsUser"],
      mutationFn: ({ id, data }) => giftUserServices.update(id, data),
    });
  },
};

export default useGiftsUser;

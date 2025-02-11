import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";

import giftUserServices from "../services/giftUserService";
import { RequestTypes, RequestUpdateTypes } from "../types";

const useGiftsUser = {
  useGetGifts: (): UseQueryResult<RequestTypes[]> => {
    return useQuery({
      queryKey: ["giftsUser"],
      queryFn: giftUserServices.get,
    });
  },
  useUpdateGiftsUser: (): UseMutationResult<
    RequestTypes,
    Error,
    { id: number; data: RequestUpdateTypes }
  > => {
    return useMutation({
      mutationKey: ["updateGiftsUser"],
      mutationFn: ({ id, data }) => giftUserServices.update(id, data),
    });
  },
};

export default useGiftsUser;

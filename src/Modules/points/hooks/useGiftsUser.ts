import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { GiftTypes } from "../types";
import giftUserServices from "../services/giftUserService";

const useGiftsUser = {
  useGetGifts: (): UseQueryResult<GiftTypes[]> => {
    return useQuery({
      queryKey: ["giftsUser"],
      queryFn: giftUserServices.get,
    });
  },
};

export default useGiftsUser;

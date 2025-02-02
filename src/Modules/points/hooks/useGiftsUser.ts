import { useQuery, UseQueryResult } from "@tanstack/react-query";

import giftUserServices from "../services/giftUserService";
import { RequestTypes } from "../types";

const useGiftsUser = {
  useGetGifts: (): UseQueryResult<RequestTypes[]> => {
    return useQuery({
      queryKey: ["giftsUser"],
      queryFn: giftUserServices.get,
    });
  },
};

export default useGiftsUser;

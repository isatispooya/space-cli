import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { giftServices } from "../services";
import { GiftsPost, GiftTypes } from "../types";
import { AxiosError } from "axios";

const useGifts = {
  useGetGifts: (): UseQueryResult<GiftTypes[]> => {
    return useQuery({
      queryKey: ["gifts"],
      queryFn: giftServices.getGifts,
    });
  },
  usePostGift: (): UseMutationResult<
    GiftsPost,
    AxiosError,
    { id: string; gift: string; description: string }
  > => {
    return useMutation({
      mutationKey: ["postGift"],
      mutationFn: (data: { id: string; gift: string; description: string }) =>
        giftServices.postGift(data),
    });
  },
};

export default useGifts;

import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { giftServices } from "../services";
import { GiftsPost, GiftTypes } from "../types";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

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
      onSuccess: (response) => {
        toast.success(response.message || "دریافت هدیه با موفقیت انجام شد");
      },
      onError: (error: AxiosError<{error: string}>) => {
        const errorMessage = error.response?.data?.error || "خطایی رخ داده است";
        toast.error(errorMessage);
      },
    });
  },
};

export default useGifts;

import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { giftServices } from "../services";
import { GiftType } from "../types/gifts.type";
import { GiftsPostType } from "../types/giftsPost.type";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import useRemainPoints from "./useRemainPoints";

const useGifts = {
  useGetGifts: (): UseQueryResult<GiftType[]> => {
    return useQuery({
      queryKey: ["gifts"],
      queryFn: giftServices.getGifts,
    });
  },
  usePostGift: (): UseMutationResult<
    GiftsPostType,
    AxiosError,
    { id: string; gift: string; description: string }
  > => {
    const { refetch } = useRemainPoints();

    return useMutation({
      mutationKey: ["postGift"],
      mutationFn: (data: { id: string; gift: string; description: string }) =>
        giftServices.postGift(data),
      onSuccess: (response) => {
        toast.success(response.message || "دریافت هدیه با موفقیت انجام شد");
        refetch();
      },
      onError: (error: AxiosError<{ error: string }>) => {
        const errorMessage = error.response?.data?.error || "خطایی رخ داده است";
        toast.error(errorMessage);
      },
    });
  },
};

export default useGifts;

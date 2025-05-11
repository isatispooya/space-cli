import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { profileService } from "../services";
import { PostProfileType } from "../types";
import { AxiosError } from "axios";

export const useUpdateProfilePicture = (): UseMutationResult<
  PostProfileType,
  AxiosError,
  FormData
> => {
  return useMutation({
    mutationKey: ["updateProfilePicture"],
    mutationFn: profileService.updateImage,
  });
};

export default useUpdateProfilePicture;

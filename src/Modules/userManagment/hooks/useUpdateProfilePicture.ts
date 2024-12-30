import { useMutation } from "@tanstack/react-query";
import { profileService } from "../services";

export const useUpdateProfilePicture = () => {
  return useMutation({
    mutationKey: ["updateProfilePicture"],
    mutationFn: profileService.updateImage,
  });
};

export default useUpdateProfilePicture;

import { useMutation } from "@tanstack/react-query";
import faraSahmService from "../services/farasahmservice";

const usePostFaraSahm = () => {
  return useMutation({
    mutationKey: ["post-fara-sahm"],
    mutationFn: () => faraSahmService.post(),
  });
};

export default usePostFaraSahm;

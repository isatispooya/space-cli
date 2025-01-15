import { timeflowService } from "../service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { VerifyPatchTypes } from "../types/verify.type";

const useVerify = {
  useGet: () => {
    return useQuery({
      queryKey: ["timeflow"],
      queryFn: () => timeflowService.get(),
    });
  },

  useGetVerify: () => {
    return useQuery({
      queryKey: ["timeflow-verify"],
      queryFn: () => timeflowService.getVerify(),
    });
  },

  usePostVerify: () => {
    return useMutation({
      mutationKey: ["timeflow-verify"],
      mutationFn: ({ id, data }: VerifyPatchTypes) =>
        timeflowService.postVerify(id, data),
    });
  },
};

export default useVerify;

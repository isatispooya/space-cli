import { verifyTimeFlow } from "../service";
import { useMutation, useQuery } from "@tanstack/react-query";

const useVerify = {
  useGet: () => {
    return useQuery({
      queryKey: ["timeflow"],
      queryFn: () => verifyTimeFlow.get(),
    });
  },
  usePost: () => {
    return useMutation({
      mutationKey: ["verify-timeflow"],
      mutationFn: (data) => verifyTimeFlow.post(data),
    });
  },
};

export default useVerify;

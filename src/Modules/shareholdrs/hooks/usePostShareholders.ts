import { useMutation } from "@tanstack/react-query";
import { postShareholders } from "../services";

const usePostShareholders = () => {
  return useMutation({
    mutationKey: ["postShareholders"],
    mutationFn: postShareholders,
  });
};

export default usePostShareholders;

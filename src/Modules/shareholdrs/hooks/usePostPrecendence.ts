import { useMutation } from "@tanstack/react-query";
import { postPrecendence } from "../services";

const usePostPrecendence = () => {
  return useMutation({
    mutationKey: ["postPrecendence"],
    mutationFn: postPrecendence,
  });
};

export default usePostPrecendence;

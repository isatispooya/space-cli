import { useMutation } from "@tanstack/react-query";
import { postPosition } from "../services";



const useCreatePos = () => {
  return useMutation({
    mutationKey: ["create-position"],
    mutationFn: postPosition,
  });
};

export default useCreatePos;

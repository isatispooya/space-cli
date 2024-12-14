import { useMutation } from "@tanstack/react-query";
import { postDisplacementPrecendence } from "../services";

const usePostDisplacementPrecendence = () => {
  return useMutation({
    mutationKey: ["postDisplacementPrecendence"],
    mutationFn: postDisplacementPrecendence,
  });
};

export default usePostDisplacementPrecendence;

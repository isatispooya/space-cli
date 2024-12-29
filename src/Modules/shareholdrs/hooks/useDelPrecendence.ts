import { useMutation } from "@tanstack/react-query";
import { deletePrecendence } from "../services";

const useDelPrecendence = () => {
  return useMutation({
    mutationKey: ["deletePrecendence"],
    mutationFn: deletePrecendence,
  });
};

export default useDelPrecendence;

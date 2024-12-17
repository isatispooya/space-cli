import { useMutation } from "@tanstack/react-query";
import { postPurchacePrecendence } from "../services";
import { PurchacePrecendenceCreate } from "../types/PurchacePrecendence.type";

const usePostPurchacePrecendence = () => {
  return useMutation<any, Error, PurchacePrecendenceCreate>({
    mutationKey: ["purchacePrecendence"],
    mutationFn: postPurchacePrecendence,
  });
};

export default usePostPurchacePrecendence;

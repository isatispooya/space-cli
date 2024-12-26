import { useMutation } from "@tanstack/react-query";
import { postPurchacePrecendence } from "../services";
import {
  purchacePrecendenceTypes,
  PurchacePrecendenceCreate,
} from "../types/PurchacePrecendence.type";

const usePostPurchacePrecendence = () => {
  return useMutation<
    purchacePrecendenceTypes,
    Error,
    PurchacePrecendenceCreate
  >({
    mutationKey: ["purchacePrecendence"],
    mutationFn: postPurchacePrecendence,
  });
};

export default usePostPurchacePrecendence;

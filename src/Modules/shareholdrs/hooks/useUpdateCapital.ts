import { useMutation } from "@tanstack/react-query";
import { patchCapitalIncreasePayment } from "../services";
import { CapitalIncreasePaymentTypes } from "../types";

const useUpdateCapital = () => {
  return useMutation({
    mutationKey: ["update-capital"],
    mutationFn: (data: CapitalIncreasePaymentTypes) =>
      patchCapitalIncreasePayment(data, data.id),
  });
};

export default useUpdateCapital;

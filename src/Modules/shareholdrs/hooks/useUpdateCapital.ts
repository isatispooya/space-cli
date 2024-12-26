import { useMutation } from "@tanstack/react-query";
import { patchCapitalIncreasePayment } from "../services";
import { CapitalIncreaseTypes } from "../types";

const useUpdateCapital = () => {
  return useMutation({
    mutationKey: ["update-capital"],
    mutationFn: (data: CapitalIncreaseTypes) =>
      patchCapitalIncreasePayment(data, data.id),
  });
};

export default useUpdateCapital;

import { useMutation } from "@tanstack/react-query";
import { deleteCapitalIncreasePayment } from "../services";

const useDelCapital = () => {
  return useMutation({
    mutationKey: ["delete-capital"],
    mutationFn: (id: number) => deleteCapitalIncreasePayment(id.toString()),
  });
};

export default useDelCapital;

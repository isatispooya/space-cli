import { useMutation } from "@tanstack/react-query";
import { purchasePrecendenseDelete } from "../services";

const useDelPurchasePrecendense = () => {
  return useMutation({
    mutationKey: ["DelPurchasePrecendense"],
    mutationFn: purchasePrecendenseDelete,
  });
};

export default useDelPurchasePrecendense;

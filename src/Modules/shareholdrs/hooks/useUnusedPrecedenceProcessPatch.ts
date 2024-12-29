import { useMutation } from "@tanstack/react-query";
import { unusedPrecedenceProcessPatch } from "../services";
import { PurchacePrecendenceCreate } from "../types";


const useUnusedPrecedenceProcessPatch = (id: number) => {
  return useMutation({
    mutationKey: ["unusedPrecedenceProcessPatch"],
    mutationFn: (data: PurchacePrecendenceCreate) => unusedPrecedenceProcessPatch(id, data),
    
  });
};

export default useUnusedPrecedenceProcessPatch;

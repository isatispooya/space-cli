import { useMutation } from "@tanstack/react-query";
import { patchPrecendence } from "../services";
import { PrecedenceTypes } from "../types";

interface UpdateParams {
  id: number;
  data: PrecedenceTypes;
}

const useUpdatePrecendence = () => {
  return useMutation({
    mutationKey: ["updatePrecendence"],
    mutationFn: ({ id, data }: UpdateParams) => patchPrecendence(id, data),
  });
};

export default useUpdatePrecendence;

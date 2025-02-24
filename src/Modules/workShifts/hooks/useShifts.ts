import {
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";

import { shiftsServices } from "../services";
import { Shift } from "../types/shifts.type";

const useShifts = {
  useCreate: (): UseMutationResult<Shift[], Error, Shift[]> => {
    return useMutation<Shift[], Error, Shift[]>({
      mutationFn: shiftsServices.create,
    });
  },
};

export default useShifts;

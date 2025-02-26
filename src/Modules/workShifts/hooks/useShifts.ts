import {
  useMutation,
  UseMutationResult,
  UseQueryResult,
  useQuery,
} from "@tanstack/react-query";

import { shiftsServices } from "../services";
import { Shift } from "../types/shifts.type";
import { shiftTypes } from "../types";

const useShifts = {
  useGetShifts: (): UseQueryResult<shiftTypes> => {
    return useQuery({
      queryKey: ["shifts"],
      queryFn: shiftsServices.getShifts,
    });
  },

  useCreate: (): UseMutationResult<Shift[], Error, Shift[]> => {
    return useMutation<Shift[], Error, Shift[]>({
      mutationFn: shiftsServices.create,
    });
  },
  useUpdate: (): UseMutationResult<
    Shift,
    Error,
    { id: string; data: Shift }
  > => {
    return useMutation<Shift, Error, { id: string; data: Shift }>({
      mutationFn: ({ id, data }) => shiftsServices.update(id, data),
    });
  },
};

export default useShifts;

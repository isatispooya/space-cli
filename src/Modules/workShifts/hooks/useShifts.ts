import {
  useMutation,
  UseMutationResult,
  UseQueryResult,
  useQuery,
} from "@tanstack/react-query";
import { shiftsServices } from "../services";
import { ShiftTypes } from "../types";
import { AxiosError } from "axios";

const useShifts = {
  useGetShifts: (): UseQueryResult<ShiftTypes["getRes"][]> => {
    return useQuery({
      queryKey: ["shifts"],
      queryFn: shiftsServices.getShifts,
    });
  },

  useCreateShifts: (): UseMutationResult<
    ShiftTypes["postRes"],
    AxiosError,
    ShiftTypes["postReq"]
  > => {
    return useMutation({
      mutationKey: ["createShifts"],
      mutationFn: (data: ShiftTypes["postReq"]) =>
        shiftsServices.createShifts(data),
    });
  },

  useCreateShiftsDates: (): UseMutationResult<
    ShiftTypes["postDatesRes"],
    AxiosError,
    ShiftTypes["postDatesReq"]
  > => {
    return useMutation({
      mutationKey: ["createShiftsDates"],
      mutationFn: (data: ShiftTypes["postDatesReq"]) =>
        shiftsServices.createShiftsDates(data),
    });
  },

  useGetShiftsDates: (
    id: string
  ): UseQueryResult<ShiftTypes["datesRes"], AxiosError> => {
    return useQuery({
      queryKey: ["shiftsDates", id],
      queryFn: () => shiftsServices.getShiftsDates(id),
    });
  },
};

export default useShifts;

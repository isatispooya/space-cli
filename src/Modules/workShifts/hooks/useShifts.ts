import {
  useMutation,
  UseMutationResult,
  UseQueryResult,
  useQuery,
} from "@tanstack/react-query";
import { shiftsServices } from "../services";
import { ShiftType } from "../types";
import { AxiosError } from "axios";

const useShifts = {
  useGetShifts: (): UseQueryResult<ShiftType["getRes"][]> => {
    return useQuery({
      queryKey: ["shifts"],
      queryFn: shiftsServices.getShifts,
    });
  },

  useCreateShifts: (): UseMutationResult<
    ShiftType["postRes"],
    AxiosError,
    ShiftType["postReq"]
  > => {
    return useMutation({
      mutationKey: ["createShifts"],
      mutationFn: (data: ShiftType["postReq"]) =>
        shiftsServices.createShifts(data),
    });
  },

  useCreateShiftsDates: (): UseMutationResult<
    ShiftType["postDatesRes"],
    AxiosError,
    ShiftType["postDatesReq"]
  > => {
    return useMutation({
      mutationKey: ["createShiftsDates"],
      mutationFn: (data: ShiftType["postDatesReq"]) =>
        shiftsServices.createShiftsDates(data),
    });
  },

  useGetShiftsDates: (
    id: string
  ): UseQueryResult<ShiftType["datesRes"], AxiosError> => {
    return useQuery({
      queryKey: ["shiftsDates", id],
      queryFn: () => shiftsServices.getShiftsDates(id),
    });
  },

  useDeleteShifts: (): UseMutationResult<
    ShiftType["deleteRes"],
    AxiosError,
    string
  > => {
    return useMutation({
      mutationKey: ["deleteShifts"],
      mutationFn: (id: string) => shiftsServices.deleteShifts(id),
    });
  },

  useDeleteShiftsDates: (): UseMutationResult<
    ShiftType["deleteRes"],
    AxiosError,
    string
  > => {
    return useMutation({
      mutationKey: ["deleteShiftsDates"],
      mutationFn: (id: string) => shiftsServices.deleteShiftsDates(id),
    });
  },

  useUpdateShiftDates: (): UseMutationResult<
    ShiftType["datesRes"],
    AxiosError,
    { id: string; data: ShiftType["updateDatesReq"] }
  > => {
    return useMutation({
      mutationKey: ["updateShiftsDates"],
      mutationFn: ({ id, data }) => shiftsServices.updateShiftsDates(id, data),
    });
  },

  useCreateShiftsAssign: (): UseMutationResult<
    ShiftType["updateDatesRes"],
    AxiosError,
    ShiftType["assignReq"]
  > => {
    return useMutation({
      mutationKey: ["createShiftsAssignments"],
      mutationFn: (data: ShiftType["assignReq"]) =>
        shiftsServices.createShiftsAssignments(data),
    });
  },
};

export default useShifts;

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

  useDeleteShifts: (): UseMutationResult<
    ShiftTypes["deleteRes"],
    AxiosError,
    string
  > => {
    return useMutation({
      mutationKey: ["deleteShifts"],
      mutationFn: (id: string) => shiftsServices.deleteShifts(id),
    });
  },

  useDeleteShiftsDates: (): UseMutationResult<
    ShiftTypes["deleteRes"],
    AxiosError,
    string
  > => {
    return useMutation({
      mutationKey: ["deleteShiftsDates"],
      mutationFn: (id: string) => shiftsServices.deleteShiftsDates(id),
    });
  },

  useUpdateShiftDates: (): UseMutationResult<
    ShiftTypes["datesRes"],
    AxiosError,
    { id: string; data: ShiftTypes["updateDatesReq"] }
  > => {
    return useMutation({
      mutationKey: ["updateShiftsDates"],
      mutationFn: ({ id, data }) => shiftsServices.updateShiftsDates(id, data),
    });
  },

  useCreateShiftsAssign: (): UseMutationResult<
    ShiftTypes["updateDatesRes"],
    AxiosError,
    ShiftTypes["assignReq"]
  > => {
    return useMutation({
      mutationKey: ["createShiftsAssignments"],
      mutationFn: (data: ShiftTypes["assignReq"]) =>
        shiftsServices.createShiftsAssignments(data),
    });
  },
};

export default useShifts;

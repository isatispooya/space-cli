import {
  useMutation,
  UseMutationResult,
  UseQueryResult,
  useQuery,
} from "@tanstack/react-query";
import { shiftsServices } from "../services";
import { WorkShiftTypes } from "../types";
import { AxiosError } from "axios";

const useShifts = {
  useGetShifts: (): UseQueryResult<WorkShiftTypes["shiftTypes"]> => {
    return useQuery({
      queryKey: ["shifts"],
      queryFn: shiftsServices.getShifts,
    });
  },
  useCreate: (): UseMutationResult<
    unknown,
    AxiosError,
    WorkShiftTypes["ShiftPayload"]
  > => {
    return useMutation({
      mutationFn: (data: WorkShiftTypes["ShiftPayload"]) =>
        shiftsServices.create(data),
    });
  },
  useUpdate: (): UseMutationResult<
    WorkShiftTypes["ShiftPayload"],
    Error,
    { id: string; data: WorkShiftTypes["ShiftPayload"] }
  > => {
    return useMutation({
      mutationFn: ({ id, data }) => shiftsServices.update(id, data),
    });
  },
  useGetShiftsassign: () => {
    return useQuery<WorkShiftTypes["ShiftAssignResponse"][]>({
      queryKey: ["shiftsassign"],
      queryFn: shiftsServices.getShiftsassign,
    });
  },

  useGetShiftsNames: () => {
    return useQuery<WorkShiftTypes["ShiftName"][]>({
      queryKey: ["shiftsnames"],
      queryFn: shiftsServices.getShiftsNames,
    });
  },

  useSetShiftUser: () =>
    useMutation({
      mutationKey: ["shiftsassign"],
      mutationFn: (SetShiftUser: WorkShiftTypes["SetShiftUserPostType"]) =>
        shiftsServices.createShiftsassign(SetShiftUser),
    }),
};

export default useShifts;

import {
  useMutation,
  UseMutationResult,
  UseQueryResult,
  useQuery,
} from "@tanstack/react-query";
import { shiftsServices } from "../services";
import { WorkShiftTypes } from "../types";

const useShifts = {
  useGetShifts: (): UseQueryResult<WorkShiftTypes["shiftTypes"]> => {
    return useQuery({
      queryKey: ["shifts"],
      queryFn: shiftsServices.getShifts,
    });
  },
  useCreate: (): UseMutationResult<
    unknown,
    Error,
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

  useSetShiftUser: () =>
    useMutation({
      mutationKey: ["shiftsassign"],
      mutationFn: (SetShiftUser: WorkShiftTypes["SetShiftUserPostType"]) =>
        shiftsServices.createShiftsassign(SetShiftUser),
    }),
};

export default useShifts;

import { UseQueryResult, useQuery, useMutation } from "@tanstack/react-query";
import { ShiftResponse, SetShiftUserType } from "../types/shifts.type";
import { shiftsassignServices } from "../services";

const useShiftsassign = () => {
  const useGetShiftsassign = (): UseQueryResult<ShiftResponse[]> => {
    return useQuery<ShiftResponse[]>({
      queryKey: ["shiftsassign"],
      queryFn: shiftsassignServices.getShiftsassign,
    });
  };

  const useSetShiftUser = () => useMutation({
    mutationKey: ["shiftsassign"],
    mutationFn: (SetShiftUser: SetShiftUserType) =>
      shiftsassignServices.createShiftsassign(SetShiftUser),
  });

  return { useGetShiftsassign, useSetShiftUser };
};

export default useShiftsassign;

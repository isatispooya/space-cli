import { useShifts } from "../hooks";

const ShiftsAssignFeat = () => {
  const { data: shifts, isLoading: shiftsLoading } = useShifts.useGetShifts();
  const { mutate: assignShifts } = useShifts.useCreateShiftsAssign();

  return (
    <div>
      <h1>Shifts Assign</h1>
    </div>
  );
};

export default ShiftsAssignFeat;

import { useState, useEffect } from "react";
import { useShifts } from "../hooks";
import { WorkShiftTypes } from "../types";
import {
  Accordian,
  ButtonBase,
  DynamicList,
  LoaderLg,
  SelectInput,
} from "@/components";

const ShiftsAssignForm = () => {
  const { data: shiftsAssignData, isLoading: isLoadingShiftsAssign } =
    useShifts.useGetShiftsassign();
  const { isLoading: isLoadingShifts } = useShifts.useGetShifts();
  const { mutate, isPending: isPendingSetShiftUser } =
    useShifts.useSetShiftUser();
  const { data: shiftsNamesData } = useShifts.useGetShiftsNames();
  const [shifts, setShifts] = useState<WorkShiftTypes["Shift"][]>([]);
  const [shiftAssignments, setShiftAssignments] = useState<
    WorkShiftTypes["FormShiftAssignment"][]
  >([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [visibleItems, setVisibleItems] = useState(10);
  const [isOpen, setIsOpen] = useState(false);

  console.log(shiftsNamesData, "shiftsNamesData");

  const users =
    shiftsAssignData?.map((item: WorkShiftTypes["ShiftAssignResponse"]) => ({
      id: item.user.id,
      name: `${item.user.first_name} ${item.user.last_name} | ${item.user.uniqueIdentifier}`,
    })) ?? [];

  useEffect(() => {
    if (shiftsNamesData && Array.isArray(shiftsNamesData)) {
      const formattedShifts = shiftsNamesData.map((item) => ({
        id: item.id,
        name: item.name,
      }));
      setShifts(formattedShifts);
    }
  }, [shiftsNamesData]);

  useEffect(() => {
    if (shiftsAssignData && users.length > 0) {
      const initialAssignments = shiftsAssignData.map(
        (item: WorkShiftTypes["ShiftAssignResponse"]) => ({
          userId: item.user.id,
          userName: `${item.user.first_name} ${item.user.last_name} | ${item.user.uniqueIdentifier}`,
          shiftId: item.shift_detail?.id,
          shiftName: item.shift_detail?.name,
          isRegistered: !!item.shift_detail,
          isEditing: false,
          assignmentId: item.id,
        })
      );
      setShiftAssignments(initialAssignments);
    }
  }, [shiftsAssignData, users.length]);

  const handleShiftChange = (shiftId: string, userId: number) => {
    const selectedShift = shifts.find((shift) => shift.id === Number(shiftId));
    setShiftAssignments((prev) =>
      prev.map((assignment) =>
        assignment.userId === userId
          ? {
              ...assignment,
              shiftId: selectedShift?.id,
              shiftName: selectedShift?.name,
              isRegistered: false,
            }
          : assignment
      )
    );
  };

  const handleSubmit = (assignment: WorkShiftTypes["FormShiftAssignment"]) => {
    if (assignment.isRegistered && !assignment.isEditing) {
      // Enable editing mode
      setShiftAssignments((prev) =>
        prev.map((a) =>
          a.userId === assignment.userId ? { ...a, isEditing: true } : a
        )
      );
    } else {
      // Submit shift assignment
      const uniqueIdentifier = assignment.userName.split("|")[1].trim();
      mutate({
        uniqueidentifier: uniqueIdentifier,
        shift_id: assignment.shiftId || 0,
      });
      setShiftAssignments((prev) =>
        prev.map((a) =>
          a.userId === assignment.userId
            ? { ...a, isRegistered: true, isEditing: false }
            : a
        )
      );
    }
  };

  const renderAssignmentItem = (
    assignment: WorkShiftTypes["FormShiftAssignment"]
  ) => (
    <div className="flex items-center justify-between">
      <span className="w-1/3 text-gray-700">{assignment.userName}</span>

      <SelectInput
        value={assignment.shiftId?.toString() || ""}
        onChange={(value) => handleShiftChange(value, assignment.userId)}
        options={[
          { value: "", label: "انتخاب شیفت" },
          ...(shiftsNamesData
            ? shiftsNamesData.map((shift) => ({
                value: shift.id.toString(),
                label: shift.name,
              }))
            : []),
        ]}
        className="w-1/3"
        disabled={assignment.isRegistered && !assignment.isEditing}
      />

      <ButtonBase
        onClick={() => handleSubmit(assignment)}
        label={
          assignment.isRegistered && !assignment.isEditing ? "ویرایش" : "ثبت"
        }
        bgColor={
          assignment.isRegistered && !assignment.isEditing
            ? "rgb(51 65 85)"
            : "rgb(30 41 59)"
        }
        hoverColor={
          assignment.isRegistered && !assignment.isEditing
            ? "rgb(51 65 85)"
            : "rgb(30 41 59)"
        }
      />
    </div>
  );

  const handleLoadMore = () => {
    setVisibleItems((prev) => prev + 10);
  };

  if (isLoadingShiftsAssign && isLoadingShifts) {
    return <LoaderLg />;
  }

  if (isPendingSetShiftUser) {
    return <LoaderLg />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6  mt-8">
      <Accordian
        title="تخصیص شیفت"
        isOpen={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
      >
        <DynamicList
          data={shiftAssignments}
          isPending={isLoadingShiftsAssign || isLoadingShifts}
          searchQuery={searchQuery}
          visibleItems={visibleItems}
          onSearchChange={setSearchQuery}
          onItemClick={() => {}}
          onLoadMore={handleLoadMore}
          renderItem={renderAssignmentItem}
          noResultsMessage="کاربری برای نمایش وجود ندارد"
        />
      </Accordian>
    </div>
  );
};

export default ShiftsAssignForm;

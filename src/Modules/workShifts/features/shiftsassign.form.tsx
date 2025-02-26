import { useState, useEffect } from "react";
import { TiEdit } from "react-icons/ti";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { useShifts } from "../hooks";
import { WorkShiftTypes } from "../types";

const ShiftsAssignForm = () => {
  const { data: shiftsAssignData } = useShifts.useGetShiftsassign();
  const { data: shiftsData } = useShifts.useGetShifts();
  const { mutate } = useShifts.useSetShiftUser();

  const [shifts, setShifts] = useState<WorkShiftTypes["Shift"][]>([]);
  const [shiftAssignments, setShiftAssignments] = useState<
    WorkShiftTypes["FormShiftAssignment"][]
  >([]);

  const users =
    shiftsAssignData?.map((item: WorkShiftTypes["ShiftAssignResponse"]) => ({
      id: item.user.id,
      name: `${item.user.first_name} ${item.user.last_name} | ${item.user.uniqueIdentifier}`,
    })) ?? [];

  useEffect(() => {
    if (shiftsData && Array.isArray(shiftsData)) {
      const formattedShifts = shiftsData.map((item) => ({
        id: item.shift?.id ?? item.id ?? 0,
        name: item.shift?.name ?? item.name ?? "Unknown Shift",
      }));
      setShifts(formattedShifts);
    }
  }, [shiftsData]);

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

  const handleShiftChange = (userId: number, shiftId: string) => {
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

  const renderShiftItem = (
    assignment: WorkShiftTypes["FormShiftAssignment"]
  ) => (
    <div
      key={assignment.userId}
      className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
    >
      <span className="w-1/3 text-gray-700">{assignment.userName}</span>

      <select
        value={assignment.shiftId?.toString() || ""}
        onChange={(e) => handleShiftChange(assignment.userId, e.target.value)}
        className="w-1/3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
      >
        <option value="">انتخاب شیفت</option>
        {shifts.map((shift) => (
          <option key={shift.id} value={shift.id.toString()}>
            {shift.name}
          </option>
        ))}
      </select>

      <button
        onClick={() => handleSubmit(assignment)}
        className={`w-1/4 flex items-center justify-center gap-2 py-2 rounded-md transition duration-200 ${
          assignment.isRegistered && !assignment.isEditing
            ? "bg-yellow-500 hover:bg-yellow-600 text-white"
            : "bg-green-600 hover:bg-green-700 text-white"
        } disabled:bg-gray-300 disabled:cursor-not-allowed`}
      >
        {assignment.isRegistered && !assignment.isEditing ? (
          <>
            <TiEdit size={20} />
            <span>ویرایش</span>
          </>
        ) : (
          <>
            <IoCheckmarkCircleOutline size={20} />
            <span>ثبت</span>
          </>
        )}
      </button>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        تخصیص شیفت
      </h2>

      <div className="space-y-4">
        {shiftAssignments.length > 0 ? (
          shiftAssignments.map(renderShiftItem)
        ) : (
          <p className="text-gray-500 text-center">
            کاربری برای نمایش وجود ندارد
          </p>
        )}
      </div>
    </div>
  );
};

export default ShiftsAssignForm;

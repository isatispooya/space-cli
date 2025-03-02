import { useEffect } from "react";
import { DateObject, getAllDatesInRange } from "react-multi-date-picker";
import { useDispatch, useSelector } from "react-redux";
import useShifts from "../hooks/useShifts";
import { WorkShiftTypes } from "../types";
import { LoaderLg, NoContent, Toast } from "@/components";
import { ShiftSchedule, ShiftList } from "../components";
import { convertToShiftDay } from "../utils";
import { ErrorResponse } from "@/types";
import { CheckmarkIcon, ErrorIcon } from "react-hot-toast";
import { AxiosError } from "axios";
import {
  createDefaultTimes,
  validateShiftData,
  updateShiftField,
  removeShift,
} from "../utils";

import {
  setShiftName,
  setDates,
  setShifts,
  setSearchQuery,
  setIsSubmitting,
  setError,
  setVisibleItems,
  selectShiftName,
  selectDates,
  selectShifts,
  selectSearchQuery,
  selectIsSubmitting,
  selectError,
  selectVisibleItems,
} from "../store/shiftsForm.store";

const ShiftsForm = () => {
  const dispatch = useDispatch();

  // Select state from Redux store
  const shiftName = useSelector(selectShiftName);
  const dates = useSelector(selectDates);
  const shifts = useSelector(selectShifts);
  const searchQuery = useSelector(selectSearchQuery);
  const isSubmitting = useSelector(selectIsSubmitting);
  const error = useSelector(selectError);
  const visibleItems = useSelector(selectVisibleItems);

  const { mutate: createShift, isPending } = useShifts.useCreate();

  useEffect(() => {
    if (dates.length === 0) {
      dispatch(setShifts([]));
      return;
    }

    const newDates = getAllDatesInRange(dates).map((date) =>
      (date as DateObject).format()
    );

    const { defaultStartTime, defaultEndTime } = createDefaultTimes();

    const updatedShifts = newDates.map((date) => ({
      date,
      shiftName,
      startTime: defaultStartTime,
      endTime: defaultEndTime,
      isWorkDay: true,
    }));

    dispatch(setShifts(updatedShifts));
  }, [dates, shiftName, dispatch]);

  const handleDateChange = (dateObjects: DateObject[]) => {
    dispatch(setDates(dateObjects));
  };

  const updateShift = (
    index: number,
    field: keyof Pick<
      WorkShiftTypes["FormShiftState"],
      "startTime" | "endTime" | "isWorkDay"
    >,
    value: DateObject | null | boolean
  ) => {
    const updatedShifts = updateShiftField(shifts, index, field, value);
    dispatch(setShifts(updatedShifts));
  };

  const deleteShift = (index: number) => {
    const updatedShifts = removeShift(shifts, index);
    dispatch(setShifts(updatedShifts));
    if (updatedShifts.length === 0) {
      dispatch(setDates([]));
    }
  };

  const handleSubmit = async () => {
    try {
      dispatch(setIsSubmitting(true));
      dispatch(setError(null));

      if (!validateShiftData(shifts, shiftName)) {
        dispatch(setError("لطفاً همه فیلدهای لازم را پر کنید"));
        return;
      }

      const shiftPayload = [
        {
          shiftname: shiftName,
          day: shifts.map(convertToShiftDay),
        },
      ] as unknown as WorkShiftTypes["ShiftPayload"];

      await createShift(shiftPayload, {
        onSuccess: () => {
          dispatch(setShiftName(""));
          dispatch(setDates([]));
          dispatch(setShifts([]));
          Toast(
            "شیفت‌ها با موفقیت ثبت شدند",
            <CheckmarkIcon />,
            "bg-green-500"
          );
        },
        onError: (error: AxiosError<unknown>) => {
          const errorMessage = (error.response?.data as ErrorResponse)?.error;
          Toast(errorMessage || "خطایی رخ داد", <ErrorIcon />, "bg-red-500");
        },
      });
    } catch (err: unknown) {
      dispatch(
        setError(
          "خطایی رخ داد: " + (err instanceof Error ? err.message : String(err))
        )
      );
    } finally {
      dispatch(setIsSubmitting(false));
    }
  };

  const handleLoadMore = () => {
    if (shifts.length > visibleItems) {
      dispatch(setVisibleItems(visibleItems + 10));
    }
  };

  if (isPending) {
    return <LoaderLg />;
  }

  return (
    <div className="min-h-screen flex justify-center items-start p-3">
      <div className="w-full max-w-[1000px]">
        <div className="w-full rounded-2xl p-4 mt-4 bg-white shadow-md">
          <h2 className="text-[#29D2C7] mb-4 text-left font-medium text-xl">
            برنامه‌ریزی شیفت‌ها
          </h2>

          <ShiftSchedule
            shiftName={shiftName}
            dates={dates}
            onShiftNameChange={(name) => dispatch(setShiftName(name))}
            onDateChange={handleDateChange}
          />
        </div>

        {error && <NoContent label={error} />}

        {shifts.length > 0 && (
          <ShiftList
            shifts={shifts}
            isSubmitting={isSubmitting}
            searchQuery={searchQuery}
            visibleItems={visibleItems}
            shiftName={shiftName}
            onSearchChange={(query) => dispatch(setSearchQuery(query))}
            onLoadMore={handleLoadMore}
            onDelete={deleteShift}
            onUpdate={updateShift}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default ShiftsForm;

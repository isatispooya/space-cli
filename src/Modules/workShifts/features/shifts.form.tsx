import { useEffect } from "react";
import { DateObject, getAllDatesInRange } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Typography, Box } from "@mui/material";
import useShifts from "../hooks/useShifts";
import { WorkShiftTypes } from "../types";
import { LoaderLg, Toast } from "@/components";
import { ShiftSchedule, ShiftList } from "../components";
import { convertToShiftDay } from "../utils";
import { ErrorResponse } from "@/types";
import { CheckmarkIcon, ErrorIcon } from "react-hot-toast";
import { AxiosError } from "axios";
import { useShiftsFormStore } from "../store";

const ShiftsForm = () => {
  const {
    shiftName,
    dates,
    shifts,
    setShiftName,
    setDates,
    setShifts,
    searchQuery,
    setSearchQuery,
    isSubmitting,
    setIsSubmitting,
    error,
    setError,
    visibleItems,
    setVisibleItems,
  } = useShiftsFormStore();

  const { mutate: createShift, isPending } = useShifts.useCreate();

  useEffect(() => {
    if (dates.length === 0) {
      setShifts([]);
      return;
    }

    const newDates = getAllDatesInRange(dates).map((date) =>
      (date as DateObject).format()
    );

    const defaultStartTime = new DateObject({
      calendar: persian,
      locale: persian_fa,
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
      hour: 8,
      minute: 0,
    });

    const defaultEndTime = new DateObject({
      calendar: persian,
      locale: persian_fa,
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
      hour: 15,
      minute: 30,
    });

    const updatedShifts = newDates.map((date) => ({
      date,
      shiftName,
      startTime: defaultStartTime,
      endTime: defaultEndTime,
      isWorkDay: true,
    }));

    setShifts(updatedShifts);
  }, [dates, shiftName, setShifts]);

  const handleDateChange = (dateObjects: DateObject[]) => {
    setDates(dateObjects);
  };

  const updateShift = (
    index: number,
    field: keyof Pick<
      WorkShiftTypes["FormShiftState"],
      "startTime" | "endTime" | "isWorkDay"
    >,
    value: DateObject | null | boolean
  ) => {
    const updatedShifts = [...shifts];
    updatedShifts[index] = {
      ...updatedShifts[index],
      [field]: value,
    };
    setShifts(updatedShifts);
  };

  const deleteShift = (index: number) => {
    const updatedShifts = shifts.filter((_, i) => i !== index);
    setShifts(updatedShifts);
    if (updatedShifts.length === 0) {
      setDates([]);
    }
  };

  const validateShiftData = (
    shifts: WorkShiftTypes["FormShiftState"][],
    shiftName: string
  ): boolean => {
    return (
      shifts.every((shift) => shift.startTime && shift.endTime) &&
      Boolean(shiftName)
    );
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      if (!validateShiftData(shifts, shiftName)) {
        setError("لطفاً همه فیلدهای لازم را پر کنید");
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
          setShiftName("");
          setDates([]);
          setShifts([]);
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
      setError(
        "خطایی رخ داد: " + (err instanceof Error ? err.message : String(err))
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoadMore = () => {
    if (shifts.length > visibleItems) {
      setVisibleItems((prev) => prev + 10);
    }
  };

  if (isPending) {
    return <LoaderLg />;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        p: 3,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: { xs: "100%", sm: 1000 } }}>
        <Box
          sx={{
            width: "100%",
            borderRadius: 4,
            p: 4,
            mt: 4,
            bgcolor: "white",
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#29D2C7",
              mb: 4,
              textAlign: "left",
              fontWeight: 500,
            }}
          >
            برنامه‌ریزی شیفت‌ها
          </Typography>

          <ShiftSchedule
            shiftName={shiftName}
            dates={dates}
            onShiftNameChange={setShiftName}
            onDateChange={handleDateChange}
          />
        </Box>

        {error && (
          <Typography color="error" sx={{ mt: 2, textAlign: "center" }}>
            {error}
          </Typography>
        )}

        {shifts.length > 0 && (
          <ShiftList
            shifts={shifts}
            isSubmitting={isSubmitting}
            searchQuery={searchQuery}
            visibleItems={visibleItems}
            shiftName={shiftName}
            onSearchChange={setSearchQuery}
            onLoadMore={handleLoadMore}
            onDelete={deleteShift}
            onUpdate={updateShift}
            onSubmit={handleSubmit}
          />
        )}
      </Box>
    </Box>
  );
};

export default ShiftsForm;

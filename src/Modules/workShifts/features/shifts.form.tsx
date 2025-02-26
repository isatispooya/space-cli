import { useEffect } from "react";
import { DateObject, getAllDatesInRange } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Typography, Paper, Box } from "@mui/material";
import useShifts from "../hooks/useShifts";
import { DateType } from "react-date-object";
import { WorkShiftTypes } from "../types";
import { LoaderLg, Toast } from "@/components";
import { ShiftSchedule, ShiftList } from "../components";
import { convertToShiftDay } from "../utils";
import { BiCheckCircle } from "react-icons/bi";
import { ErrorResponse } from "@/types";
import { ErrorIcon } from "react-hot-toast";
import { AxiosError } from "axios";
import { useShiftsFormStore } from "../store";

const ShiftsForm = () => {
  const { shiftName, dates, shifts, setShiftName, setDates, setShifts } =
    useShiftsFormStore();

  const { mutate: createShift, isPending } = useShifts.useCreate();

  useEffect(() => {
    if (dates.length === 0) {
      setShifts([]);
      return;
    }

    const newDates = getAllDatesInRange(dates).map((date) =>
      (date as DateObject).format()
    );
    const updatedShifts = newDates.map((date) => {
      const existingShift = shifts.find((shift) => shift.date === date);
      return {
        date: date,
        shiftName: shiftName,
        startTime:
          existingShift?.startTime ||
          new DateObject({
            calendar: persian,
            locale: persian_fa,
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            day: new Date().getDate(),
            hour: 8,
            minute: 0,
          }),
        endTime:
          existingShift?.endTime ||
          new DateObject({
            calendar: persian,
            locale: persian_fa,
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            day: new Date().getDate(),
            hour: 15,
            minute: 30,
          }),
        isWorkDay: existingShift?.isWorkDay ?? true,
      };
    });
    setShifts(updatedShifts);
  }, [shiftName, dates, shifts]);

  const handleDateChange = (dateObjects: DateObject[]) => {
    setDates(dateObjects);
  };

  const updateShift = (
    index: number,
    field: keyof Pick<
      WorkShiftTypes["FormShiftState"],
      "startTime" | "endTime" | "isWorkDay"
    >,
    value: DateObject | boolean
  ) => {
    const updatedShifts = [...shifts];
    updatedShifts[index] = {
      ...updatedShifts[index],
      [field]:
        field === "isWorkDay"
          ? value
          : new DateObject({
              date: value as unknown as DateType,
              calendar: persian,
              locale: persian_fa,
            }),
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
            <BiCheckCircle />,
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
    setVisibleItems((prev) => prev + 10);
  };

  if (isPending) {
    return <LoaderLg />;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: { xs: 2, sm: 4 },
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: { xs: "100%", sm: 1000 } }}>
        <Paper
          sx={{
            p: { xs: 2, sm: 4 },
            borderRadius: 3,
            bgcolor: "#fff",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              mb: 4,
              fontWeight: 700,
              color: "#1e293b",
              textAlign: "center",
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

          {error && (
            <Typography color="error" sx={{ mt: 2, textAlign: "center" }}>
              {error}
            </Typography>
          )}
        </Paper>

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

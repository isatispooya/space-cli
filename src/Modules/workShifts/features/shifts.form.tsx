import { useState, useEffect } from "react";
import DatePicker, {
  DateObject,
  getAllDatesInRange,
} from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {
  Button,
  Switch,
  FormControlLabel,
  Typography,
  Paper,
  List,
  ListItem,
  TextField,
  IconButton,
  Box,
  Grid,
} from "@mui/material";
import { TiDeleteOutline } from "react-icons/ti";
import useShifts from "../hooks/useShifts";
import { DateType } from "react-date-object";
import { WorkShiftTypes } from "../types";
import { LoaderLg } from "../../../components";

const ShiftsForm = () => {
  const [dates, setDates] = useState<DateObject[]>([]);
  const [shiftName, setShiftName] = useState<string>("");
  const [shifts, setShifts] = useState<WorkShiftTypes["FormShiftState"][]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const formatTime = (time: DateObject): string => {
    const hours = time.hour.toString().padStart(2, "0");
    const minutes = time.minute.toString().padStart(2, "0");
    return `${hours}:${minutes}:00`;
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

  const convertToShiftDay = (
    shift: WorkShiftTypes["FormShiftState"]
  ): WorkShiftTypes["ShiftDay"] => {
    const dateObject = new DateObject({
      date: shift.date,
      calendar: persian,
      locale: persian_fa,
    });
    const gregorianDate = dateObject.toDate();

    return {
      date: gregorianDate.toISOString().split("T")[0],
      start_time: shift.startTime ? formatTime(shift.startTime) : null,
      end_time: shift.endTime ? formatTime(shift.endTime) : null,
      work_day: shift.isWorkDay,
    };
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
          console.log("شیفت‌ها با موفقیت ثبت شدند");
        },
        onError: (err) => {
          setError("خطا در ثبت شیفت‌ها: " + err.message);
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
          <Grid container spacing={3} direction="column">
            <Grid item xs={12}>
              <TextField
                value={shiftName}
                onChange={(e) => setShiftName(e.target.value)}
                fullWidth
                id="outlined-basic"
                label="نام شیفت"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="subtitle1"
                sx={{ mb: 1, fontWeight: 500, color: "#475569" }}
              >
                انتخاب بازه تاریخ
              </Typography>
              <DatePicker
                range
                calendarPosition="top-left"
                fixMainPosition
                value={dates}
                minDate={new DateObject({ calendar: persian }).toFirstOfMonth()}
                maxDate={new DateObject({ calendar: persian }).toLastOfMonth()}
                onChange={handleDateChange}
                plugins={[<DatePanel eachDaysInRange position="left" />]}
                calendar={persian}
                locale={persian_fa}
              />
            </Grid>
          </Grid>
          {error && (
            <Typography color="error" sx={{ mt: 2, textAlign: "center" }}>
              {error}
            </Typography>
          )}
        </Paper>

        {shifts.length > 0 && (
          <Paper
            sx={{
              mt: 4,
              p: { xs: 2, sm: 4 },
              borderRadius: 3,
              bgcolor: "#fff",
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            }}
          >
            <Typography
              variant="h6"
              sx={{ mb: 3, fontWeight: 700, color: "#1e293b" }}
            >
              لیست شیفت‌ها
            </Typography>
            <List sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {shifts.map((shift, index) => (
                <ListItem
                  key={index}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: 2,
                    position: "relative",
                  }}
                >
                  <IconButton
                    onClick={() => deleteShift(index)}
                    sx={{
                      position: "absolute",
                      top: 8,
                      left: 8,
                      color: "#ef4444",
                    }}
                  >
                    <TiDeleteOutline />
                  </IconButton>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      alignItems: { xs: "flex-start", sm: "center" },
                      gap: { xs: 2, sm: 3 },
                      width: "100%",
                      mt: { xs: 4, sm: 0 },
                      pl: { xs: 0, sm: 6 },
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 600,
                        color: "#1e293b",
                        minWidth: { xs: "auto", sm: "120px" },
                      }}
                    >
                      <Box
                        component="span"
                        sx={{
                          bgcolor: "#dbeafe",
                          color: "#1e40af",
                          px: 1,
                          py: 0.5,
                          borderRadius: 1,
                        }}
                      >
                        {shift.shiftName}
                      </Box>
                      <Box component="span" sx={{ mx: 1, color: "#64748b" }}>
                        |
                      </Box>
                      {shift.date}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: { xs: "flex-start", sm: "center" },
                        gap: { xs: 2, sm: 2 },
                        width: { xs: "100%", sm: "auto" },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          width: { xs: "100%", sm: "auto" },
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{
                            color: "#475569",
                            minWidth: "40px",
                            textAlign: "right",
                          }}
                        >
                          شروع:
                        </Typography>
                        <DatePicker
                          disableDayPicker
                          format="HH:mm"
                          plugins={[<TimePicker hideSeconds />]}
                          calendar={persian}
                          locale={persian_fa}
                          value={shift.startTime}
                          onChange={(time: DateObject) =>
                            updateShift(index, "startTime", time)
                          }
                          containerStyle={{ width: "100%" }}
                        />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          width: { xs: "100%", sm: "auto" },
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{
                            color: "#475569",
                            minWidth: "40px",
                            textAlign: "right",
                          }}
                        >
                          پایان:
                        </Typography>
                        <DatePicker
                          disableDayPicker
                          format="HH:mm"
                          plugins={[<TimePicker hideSeconds />]}
                          calendar={persian}
                          locale={persian_fa}
                          value={shift.endTime}
                          onChange={(time: DateObject) =>
                            updateShift(index, "endTime", time)
                          }
                          containerStyle={{ width: "100%" }}
                        />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: { xs: "flex-start", sm: "center" },
                          pl: { xs: "40px", sm: 0 },
                        }}
                      >
                        <FormControlLabel
                          control={
                            <Switch
                              checked={shift.isWorkDay}
                              onChange={(e) =>
                                updateShift(
                                  index,
                                  "isWorkDay",
                                  e.target.checked
                                )
                              }
                              sx={{
                                "& .MuiSwitch-switchBase.Mui-checked": {
                                  color: "#22c55e",
                                },
                                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                                  { bgcolor: "#86efac" },
                              }}
                            />
                          }
                          label={
                            <Typography
                              sx={{
                                color: shift.isWorkDay ? "#22c55e" : "#ef4444",
                                fontWeight: 500,
                              }}
                            >
                              {shift.isWorkDay ? "کاری" : "تعطیل"}
                            </Typography>
                          }
                        />
                      </Box>
                    </Box>
                  </Box>
                </ListItem>
              ))}
            </List>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={
                isSubmitting ||
                !shiftName ||
                !shifts.every((shift) => shift.startTime && shift.endTime)
              }
              fullWidth
              sx={{
                mt: 4,
                py: 1.5,
                borderRadius: 2,
                bgcolor: "#3b82f6",
                "&:hover": { bgcolor: "#2563eb" },
                "&:disabled": { bgcolor: "#e5e7eb", color: "#9ca3af" },
              }}
            >
              {isSubmitting ? "در حال ثبت..." : "ثبت نهایی شیفت‌ها"}
            </Button>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default ShiftsForm;

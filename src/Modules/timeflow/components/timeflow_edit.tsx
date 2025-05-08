import { useParams, useNavigate } from "react-router-dom";
import moment from "moment-jalaali";
import { useTimeflow } from "../hooks";
import { AnimatePresence, motion } from "framer-motion";
import {
  DatePicker,
  TimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterMomentJalaali } from "@mui/x-date-pickers/AdapterMomentJalaali";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Paper,
  Box,
  Typography,
  alpha,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState, useEffect } from "react";
import { LoaderLg, NoContent } from "../../../components";
import { AccessTime, CalendarMonth, Edit } from "@mui/icons-material";
import { TimeflowEditType, TimeflowEditMoment } from "../types";

moment.loadPersian({ usePersianDigits: true, dialect: "persian-modern" });

const typeTranslator = (type: string): string => {
  switch (type) {
    case "login":
      return "ورود";
    case "logout":
      return "خروج";
    case "leave":
      return "مرخصی";
    case "end-leave":
      return "پایان مرخصی";
    case "start-mission":
      return "شروع ماموریت";
    case "end-mission":
      return "پایان ماموریت";
    default:
      return type;
  }
};

const TimeflowEditForm = () => {
  const [dateValue, setDateValue] = useState<TimeflowEditMoment | null>(null);
  const [timeValue, setTimeValue] = useState<TimeflowEditMoment | null>(null);
  const [typeValue, setTypeValue] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const navigate = useNavigate();
  const { data, refetch, isLoading } = useTimeflow.useGetUserAllTimeflow();
  const { id } = useParams();
  const { mutate: edit, isSuccess } = useTimeflow.usePatchTimeflowEdit();

  useEffect(() => {
    if (isSuccess) {
      setSuccess(true);
      refetch();
      setTimeout(() => {
        navigate("/timeflow");
      }, 2000);
    }
  }, [isSuccess, refetch, navigate]);

  useEffect(() => {
    if (!dateValue && !timeValue && data) {
      const EDITABLE_DATA = data?.find(
        (item: TimeflowEditType) => item.id === Number(id)
      );

      if (EDITABLE_DATA) {
        const initialMoment = moment(EDITABLE_DATA.time_user);
        setDateValue(initialMoment);
        setTimeValue(initialMoment);
        setTypeValue(EDITABLE_DATA.type || "");
      }
    }
  }, [data, dateValue, id, timeValue]);

  if (isLoading) return <LoaderLg />;

  const EDITABLE_DATA = data?.find(
    (item: TimeflowEditType) => item.id === Number(id)
  );

  if (!EDITABLE_DATA) return <NoContent label="اطلاعات مورد نظر یافت نشد" />;

  const handleSubmit = () => {
    if (dateValue && timeValue) {
      const payload: TimeflowEditType = {
        id: Number(id),
        time_user: dateValue.toISOString(),
        type: typeValue,
      };

      edit({ data: payload, id: Number(id) });
    }
  };

  const handleSnackbarClose = () => {
    setSuccess(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMomentJalaali}>
      <AnimatePresence>
        <motion.div
          key="edit-form"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-4xl mx-auto "
        >
          <Paper
            elevation={3}
            sx={{
              borderRadius: "16px",
              overflow: "hidden",
              background: "linear-gradient(to right bottom, #ffffff, #f8f9ff)",
              border: "1px solid rgba(86, 119, 188, 0.1)",
            }}
          >
            <Box
              sx={{
                background: "linear-gradient(135deg, #5677BC, #3f5ca8)",
                p: 3,
                color: "white",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  right: -20,
                  top: -20,
                  width: 150,
                  height: 150,
                  borderRadius: "50%",
                  background: alpha("#ffffff", 0.1),
                  zIndex: 0,
                }}
              />

              <Typography
                variant="h5"
                component="h1"
                sx={{ fontWeight: "bold", position: "relative", zIndex: 1 }}
              >
                <Edit sx={{ mr: 1, verticalAlign: "middle", fontSize: 28 }} />
                ویرایش تردد
              </Typography>
            </Box>

            <Box sx={{ p: 4 }}>
              <Box sx={{ mb: 4 }}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    mb: 4,
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
                  <Box
                    sx={{
                      flex: 1,
                      position: "relative",
                      "& .MuiFormControl-root": {
                        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                        borderRadius: "12px",
                      },
                    }}
                  >
                    <CalendarMonth
                      sx={{
                        position: "absolute",
                        left: 12,
                        top: 16,
                        zIndex: 1,
                        color: "#5677BC",
                        opacity: 0.7,
                      }}
                    />
                    <DatePicker
                      disabled={true}
                      label="تاریخ"
                      value={dateValue}
                      onChange={(newDate) => setDateValue(newDate)}
                      sx={{
                        width: "100%",
                        direction: "ltr",
                        "& .MuiInputBase-root": {
                          borderRadius: "12px",
                          pl: 5,
                        },
                      }}
                    />
                  </Box>

                  <Box
                    sx={{
                      flex: 1,
                      position: "relative",
                      "& .MuiFormControl-root": {
                        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                        borderRadius: "12px",
                      },
                    }}
                  >
                    <AccessTime
                      sx={{
                        position: "absolute",
                        left: 12,
                        top: 16,
                        zIndex: 1,
                        color: "#5677BC",
                        opacity: 0.7,
                      }}
                    />
                    <TimePicker
                      label="ساعت"
                      value={timeValue}
                      onChange={(newTime) => setTimeValue(newTime)}
                      sx={{
                        width: "100%",
                        direction: "ltr",
                        "& .MuiInputBase-root": {
                          borderRadius: "12px",
                          pl: 5,
                        },
                      }}
                    />
                  </Box>
                </Box>

                <FormControl
                  fullWidth
                  sx={{
                    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                    borderRadius: "12px",
                    mb: 4,
                    "& .MuiInputBase-root": {
                      borderRadius: "12px",
                    },
                  }}
                >
                  <InputLabel id="type-label">نوع</InputLabel>
                  <Select
                    labelId="type-label"
                    value={typeValue}
                    label="نوع"
                    onChange={(e: SelectChangeEvent) =>
                      setTypeValue(e.target.value)
                    }
                    renderValue={(value) => typeTranslator(value)}
                  >
                    <MenuItem value="login">ورود</MenuItem>
                    <MenuItem value="logout">خروج</MenuItem>
                    <MenuItem value="leave">مرخصی</MenuItem>
                    <MenuItem value="end-leave">پایان مرخصی</MenuItem>
                    <MenuItem value="start-mission">شروع ماموریت</MenuItem>
                    <MenuItem value="end-mission">پایان ماموریت</MenuItem>
                  </Select>
                </FormControl>

                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleSubmit}
                  sx={{
                    background: "linear-gradient(135deg, #5677BC, #3f5ca8)",
                    borderRadius: "12px",
                    py: 1.5,
                    fontSize: "1rem",
                    fontWeight: "bold",
                    boxShadow: "0 4px 15px rgba(86, 119, 188, 0.3)",
                    "&:hover": {
                      boxShadow: "0 6px 20px rgba(86, 119, 188, 0.4)",
                      background: "linear-gradient(135deg, #5677BC, #4b6ab4)",
                    },
                  }}
                >
                  بروزرسانی تردد
                </Button>
              </Box>
            </Box>
          </Paper>

          <Snackbar
            open={success}
            autoHideDuration={2000}
            onClose={handleSnackbarClose}
          >
            <Alert
              onClose={handleSnackbarClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              با موفقیت بروزرسانی شد
            </Alert>
          </Snackbar>
        </motion.div>
      </AnimatePresence>
    </LocalizationProvider>
  );
};

export default TimeflowEditForm;

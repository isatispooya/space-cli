import { useState } from "react";
import {
  alpha,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { Edit } from "@mui/icons-material";
import { TimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useTimeflow } from "../hooks";
import { Toast } from "@/components";
import { AxiosError } from "axios";
import { CheckCircle, X } from "lucide-react";

type VerifyType = "login" | "logout" | "absent" | "leave" | "mission" | "";

interface TimeflowVerifyType {
  time_user: string;
  type: VerifyType;
}

interface TimeflowResponse {
  message: string;
  error: string;
}

export default function NewVerifyForm() {
  const [time, setTime] = useState<Dayjs | null>(dayjs());
  const [type, setType] = useState<VerifyType>("");
  const { mutate: userTimeflow } = useTimeflow.useUserTimeflow();

  const handleSubmit = () => {
    if (!time || !type) return;

    const timeflowData: TimeflowVerifyType = {
      time_user: time.toISOString(),
      type,
    };

    userTimeflow(
      { data: timeflowData },
      {
        onSuccess: (data: unknown) => {
          const response = data as TimeflowResponse;
          Toast(response.message, <CheckCircle />, "#00C853");
        },
        onError: (error: unknown) => {
          const axiosError = error as AxiosError<{
            message: string;
            error: string;
          }>;
          Toast(
            axiosError.response?.data?.error || "خطایی رخ داد",
            <X />,
            "#FF0000"
          );
        },
      }
    );
  };
  const handleTypeChange = (event: SelectChangeEvent) => {
    setType(event.target.value as VerifyType);
  };

  return (
    <AnimatePresence>
      <motion.div
        key="new-verify-form"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-4xl mx-auto"
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
              fontWeight="bold"
              position="relative"
              zIndex={1}
            >
              <Edit sx={{ mr: 1, verticalAlign: "middle", fontSize: 28 }} />
              ثبت تردد جدید
            </Typography>
          </Box>

          <Box sx={{ p: 4 }}>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <TimePicker
                label="زمان"
                value={time}
                onChange={setTime}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    sx: {
                      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                      borderRadius: "12px",
                      "& .MuiInputBase-root": {
                        borderRadius: "12px",
                      },
                    },
                  },
                }}
              />
            </FormControl>

            <FormControl
              fullWidth
              sx={{
                mb: 4,
                boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                borderRadius: "12px",
                "& .MuiInputBase-root": {
                  borderRadius: "12px",
                },
              }}
            >
              <InputLabel id="type-label">نوع تردد</InputLabel>
              <Select
                labelId="type-label"
                value={type}
                label="نوع تردد"
                onChange={handleTypeChange}
              >
                <MenuItem value="login">ورود</MenuItem>
                <MenuItem value="logout">خروج</MenuItem>
                <MenuItem value="leave_start">شروع مرخصی</MenuItem>
                <MenuItem value="leave_end">ورود مرخصی</MenuItem>
                <MenuItem value="mission_start">شروع ماموریت</MenuItem>
                <MenuItem value="mission_end">پایان ماموریت</MenuItem>
              </Select>
            </FormControl>

            <Button
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              disabled={!time || !type}
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
                "&.Mui-disabled": {
                  background: "rgba(0, 0, 0, 0.12)",
                  boxShadow: "none",
                },
              }}
            >
              ثبت تردد
            </Button>
          </Box>
        </Paper>
      </motion.div>
    </AnimatePresence>
  );
}

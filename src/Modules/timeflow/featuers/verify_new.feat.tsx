// import { Forms } from "@/components";
// import { FormField } from "@/types";
// import * as Yup from "yup";

// const NewVerifyForm = () => {
//   const validationSchema = Yup.object().shape({
//     time: Yup.string().required("Time is required"),
//     type: Yup.string().required("Type is required"),
//   });

//   const formFields: FormField[] = [
//     {
//       name: "time",
//       label: "زمان",
//       type: "timePicker",
//     },
//     {
//       name: "type",
//       label: "نوع تردد",
//       type: "select",
//       options: [
//         { value: "login", label: "ورود" },
//         { value: "logout", label: "خروج" },
//         { value: "absent", label: "غیبت" },
//         { value: "leave", label: "مرخصی" },
//         { value: "mission", label: "ماموریت" },
//       ],
//     },
//   ];

//   const initialValues = {
//     time: "",
//     type: "",
//   };

//   const onSubmit = (values: any) => {
//     console.log(values);
//   };

//   return (
//     <Forms
//       formFields={formFields}
//       initialValues={initialValues}
//       validationSchema={validationSchema}
//       title="ثبت تردد"
//       colors="text-[#29D2C7]"
//       buttonColors="bg-[#29D2C7] hover:bg-[#29D2C7]"
//       submitButtonText={{
//         default: "ثبت تردد",
//         loading: "در حال ارسال...",
//       }}
//       onSubmit={onSubmit}
//     />
//   );
// };

// export default NewVerifyForm;

"use client";

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
import {  Edit } from "@mui/icons-material";
import { TimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

export default function NewVerifyForm() {
  const [time, setTime] = useState<Dayjs | null>(dayjs());
  const [type, setType] = useState("");

  const handleSubmit = () => {
    console.log("زمان:", time?.format("HH:mm"));
    console.log("نوع تردد:", type);
  };

  return (
    <AnimatePresence>
      <motion.div
        key="new-verify-form"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-2xl mx-auto"
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
            {/* Time Picker */}
            <FormControl fullWidth sx={{ mb: 4 }}>
              <TimePicker
                label="زمان"
                value={time}
                onChange={(newValue) => setTime(newValue)}
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

            {/* Type Select */}
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
                onChange={(e: SelectChangeEvent) => setType(e.target.value)}
              >
                <MenuItem value="login">ورود</MenuItem>
                <MenuItem value="logout">خروج</MenuItem>
                <MenuItem value="absent">غیبت</MenuItem>
                <MenuItem value="leave">مرخصی</MenuItem>
                <MenuItem value="mission">ماموریت</MenuItem>
              </Select>
            </FormControl>

            {/* Submit Button */}
            <Button
              fullWidth
              variant="contained"
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
              ثبت تردد
            </Button>
          </Box>
        </Paper>
      </motion.div>
    </AnimatePresence>
  );
}

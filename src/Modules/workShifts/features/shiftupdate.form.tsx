// import { useState, useEffect } from "react";
// import DatePicker, {
//   DateObject,
//   getAllDatesInRange,
// } from "react-multi-date-picker";
// import DatePanel from "react-multi-date-picker/plugins/date_panel";
// import TimePicker from "react-multi-date-picker/plugins/time_picker";
// import persian from "react-date-object/calendars/persian";
// import persian_fa from "react-date-object/locales/persian_fa";
// import {
//   Button,
//   Switch,
//   FormControlLabel,
//   Typography,
//   Paper,
//   List,
//   ListItem,
//   IconButton,
//   Box,
//   Grid,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   SelectChangeEvent,
// } from "@mui/material";
// import { TiDeleteOutline } from "react-icons/ti";
// import { RiEdit2Line } from "react-icons/ri";
// import useShifts from "../hooks/useShifts";
// import { Shift } from "../types/shifts.type";
// import moment from "moment-jalaali";

// interface ShiftItem {
//   date: string;
//   shiftName: string;
//   startTime: DateObject | null;
//   endTime: DateObject | null;
//   isWorkDay: boolean;
//   id: number;
// }

// interface ShiftData {
//   date: string;
//   start_time: string | null;
//   end_time: string | null;
//   work_day: boolean;
//   shift_id: number;
// }

// interface ShiftGroup {
//   "shift-name": string;
//   day: ShiftData[];
// }

// const ShiftsUpdateForm: React.FC = () => {
//   const [dates, setDates] = useState<DateObject[]>([]);
//   const [shiftName, setShiftName] = useState<string>("");
//   const [shifts, setShifts] = useState<ShiftItem[]>([]);
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const { mutate: updateShiftMutate } = useShifts.useUpdate();
//   const { data } = useShifts.useGetShifts();

//   const [shiftsList, setShiftsList] = useState<string>("");
//   const [shiftOptions, setShiftOptions] = useState<
//     { id: number; name: string }[]
//   >([]);

//   const handleChange = (event: SelectChangeEvent<string>) => {
//     setShiftsList(event.target.value);
//     const selectedShift = shiftOptions.find(
//       (shift) => shift.id === Number(event.target.value)
//     );
//     if (selectedShift) {
//       setShiftName(selectedShift.name);
//     }
//   };

//   useEffect(() => {
//     if (data) {
//       const uniqueShifts = Array.from(
//         new Set(data.map((item: Shift) => item.shift.id))
//       ).map((id: number) => {
//         const shift = data.find((item: Shift) => item.shift.id === id)?.shift;
//         return { id: shift.id, name: shift.name };
//       });
//       setShiftOptions(uniqueShifts);
//     }
//   }, [data]);

//   useEffect(() => {
//     if (!data || !shiftName || dates.length === 0) {
//       setShifts([]);
//       return;
//     }

//     const newDates = getAllDatesInRange(dates).map(
//       (date) => (date as DateObject).toDate().toISOString().split("T")[0]
//     );

//     const filteredShifts = data.filter((item: Shift) => {
//       const shiftDate = item.date;
//       return item.shift.name === shiftName && newDates.includes(shiftDate);
//     });

//     console.log(
//       "داده‌های فیلترشده برای شیفت",
//       shiftName,
//       "در بازه انتخاب‌شده:",
//       filteredShifts
//     );

//     const updatedShifts = newDates.map((date: string) => {
//       const existingShift = filteredShifts.find(
//         (shift: Shift) => shift.date === date
//       );
//       return {
//         date,
//         shiftName,
//         startTime: existingShift?.start_time
//           ? new DateObject({
//               date: `2023-01-01 ${existingShift.start_time}`,
//               calendar: persian,
//               locale: persian_fa,
//             })
//           : null,
//         endTime: existingShift?.end_time
//           ? new DateObject({
//               date: `2023-01-01 ${existingShift.end_time}`,
//               calendar: persian,
//               locale: persian_fa,
//             })
//           : null,
//         isWorkDay: existingShift?.work_day ?? true,
//         id: existingShift?.shift.id ?? 0,
//       };
//     });
//     setShifts(updatedShifts);
//   }, [shiftName, dates, data]);

//   const handleDateChange = (dateObjects: DateObject[]) => {
//     setDates(dateObjects);
//   };

//   const updateShift = (
//     index: number,
//     field: keyof ShiftItem,
//     value: DateObject | boolean
//   ) => {
//     const updatedShifts = [...shifts];
//     updatedShifts[index] = {
//       ...updatedShifts[index],
//       [field]: value,
//     };
//     setShifts(updatedShifts);
//   };

//   const deleteShift = (index: number) => {
//     const updatedShifts = shifts.filter((_, i) => i !== index);
//     setShifts(updatedShifts);
//     if (updatedShifts.length === 0) {
//       setDates([]);
//     }
//   };

//   const handleSubmit = async () => {
//     try {

//       const isValid = shifts.every((shift) => shift.startTime && shift.endTime);
//       if (!isValid || !shiftName) {
//         setError("لطفاً همه فیلدهای لازم را پر کنید");
//         setIsSubmitting(false);
//         return;
//       }

//       const groupedShifts: ShiftGroup[] = shifts.reduce(
//         (acc: ShiftGroup[], shift: ShiftItem) => {
//           const dateObject = new DateObject({
//             date: shift.date,
//             calendar: persian,
//             locale: persian_fa,
//           });
//           const gregorianDate = dateObject.toDate();

//           const formatTime = (time: DateObject): string => {
//             const hours = time.hour.toString().padStart(2, "0");
//             const minutes = time.minute.toString().padStart(2, "0");
//             return `${hours}:${minutes}:00`;
//           };

//           const shiftData: ShiftData = {
//             date: gregorianDate.toISOString().split("T")[0],
//             start_time: shift.startTime
//               ? formatTime(shift.startTime as DateObject)
//               : null,
//             end_time: shift.endTime
//               ? formatTime(shift.endTime as DateObject)
//               : null,
//             work_day: shift.isWorkDay,
//             shift_id: shift.id,
//           };

//           const existingGroup = acc.find(
//             (group) => group["shift-name"] === shift.shiftName
//           );
//           if (existingGroup) {
//             existingGroup.day.push(shiftData);
//           } else {
//             acc.push({
//               "shift-name": shift.shiftName,
//               day: [shiftData],
//             });
//           }
//           return acc;
//         },
//         []
//       );


//       await updateShiftMutate(data:updateShift, {
//         onSuccess: () => {
//           setShiftName("");
//           setDates([]);
//           setShifts([]);
//         },
//         onError: (err: Error) => {
//           setError("خطا در ثبت شیفت‌ها: " + err.message);
//         },
//       });
//     } catch (err: unknown) {
//       setError(
//         "خطایی رخ داد: " + (err instanceof Error ? err.message : String(err))
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         p: { xs: 2, sm: 4 },
//         display: "flex",
//         justifyContent: "center",
//       }}
//     >
//       <Box sx={{ width: "100%", maxWidth: { xs: "100%", sm: 1000 } }}>
//         <Paper
//           sx={{
//             p: { xs: 2, sm: 4 },
//             borderRadius: 3,
//             bgcolor: "#fff",
//             boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
//           }}
//         >
//           <Typography
//             variant="h5"
//             sx={{
//               mb: 4,
//               fontWeight: 700,
//               color: "#1e293b",
//               textAlign: "center",
//             }}
//           >
//             ویرایش شیفت
//           </Typography>
//           <Grid container spacing={3} direction="column">
//             <Grid item xs={12}>
//               <FormControl fullWidth>
//                 <InputLabel id="demo-simple-select-label">نام شیفت</InputLabel>
//                 <Select
//                   labelId="demo-simple-select-label"
//                   id="demo-simple-select"
//                   value={shiftsList}
//                   label="شیفت"
//                   onChange={handleChange}
//                 >
//                   {shiftOptions.map((option) => (
//                     <MenuItem key={option.id} value={option.id.toString()}>
//                       {option.name}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12}>
//               <Typography
//                 variant="subtitle1"
//                 sx={{ mb: 1, fontWeight: 500, color: "#475569" }}
//               >
//                 انتخاب بازه تاریخ
//               </Typography>
//               <DatePicker
//                 range
//                 calendarPosition="top-left"
//                 fixMainPosition
//                 value={dates}
//                 minDate={new DateObject({ calendar: persian }).toFirstOfMonth()}
//                 maxDate={new DateObject({ calendar: persian }).toLastOfMonth()}
//                 onChange={handleDateChange}
//                 plugins={[<DatePanel eachDaysInRange position="left" />]}
//                 calendar={persian}
//                 locale={persian_fa}
//                 format="YYYY/MM/DD"
//               />
//             </Grid>
//           </Grid>
//           {error && (
//             <Typography color="error" sx={{ mt: 2, textAlign: "center" }}>
//               {error}
//             </Typography>
//           )}
//         </Paper>

//         {shifts.length > 0 && (
//           <Paper
//             sx={{
//               mt: 4,
//               p: { xs: 2, sm: 4 },
//               borderRadius: 3,
//               bgcolor: "#fff",
//               boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
//             }}
//           >
//             <Typography
//               variant="h6"
//               sx={{ mb: 3, fontWeight: 700, color: "#1e293b" }}
//             >
//               لیست شیفت‌ها
//             </Typography>
//             <List sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//               {shifts.map((shift, index) => (
//                 <ListItem
//                   key={index}
//                   sx={{
//                     p: 2,
//                     borderRadius: 2,
//                     bgcolor: "#f8fafc",
//                     border: "1px solid #e2e8f0",
//                     flexDirection: "column",
//                     alignItems: "flex-start",
//                     gap: 2,
//                     position: "relative",
//                   }}
//                 >
//                   <IconButton
//                     onClick={() => deleteShift(index)}
//                     sx={{
//                       position: "absolute",
//                       top: 8,
//                       left: 8,
//                       color: "#ef4444",
//                     }}
//                   >
//                     <TiDeleteOutline />
//                   </IconButton>
//                   {shift.startTime && (
//                     <IconButton
//                       sx={{
//                         position: "absolute",
//                         top: 8,
//                         right: 8,
//                       }}
//                     >
//                       <RiEdit2Line />
//                     </IconButton>
//                   )}
//                   <Box
//                     sx={{
//                       display: "flex",
//                       flexDirection: { xs: "column", sm: "row" },
//                       alignItems: { xs: "flex-start", sm: "center" },
//                       gap: { xs: 2, sm: 3 },
//                       width: "100%",
//                       mt: { xs: 4, sm: 0 },
//                       pl: { xs: 0, sm: 6 },
//                     }}
//                   >
//                     <Typography
//                       variant="subtitle1"
//                       sx={{
//                         fontWeight: 600,
//                         color: "#1e293b",
//                         minWidth: { xs: "auto", sm: "120px" },
//                       }}
//                     >
//                       <Box
//                         component="span"
//                         sx={{
//                           bgcolor: "#dbeafe",
//                           color: "#1e40af",
//                           px: 1,
//                           py: 0.5,
//                           borderRadius: 1,
//                         }}
//                       >
//                         {shift.shiftName}
//                       </Box>
//                       <Box component="span" sx={{ mx: 1, color: "#64748b" }}>
//                         |
//                       </Box>
//                       {moment(shift.date).format("jYYYY/jMM/jDD")}
//                     </Typography>
//                     <Box
//                       sx={{
//                         display: "flex",
//                         flexDirection: { xs: "column", sm: "row" },
//                         alignItems: { xs: "flex-start", sm: "center" },
//                         gap: { xs: 2, sm: 2 },
//                         width: { xs: "100%", sm: "auto" },
//                       }}
//                     >
//                       <Box
//                         sx={{
//                           display: "flex",
//                           alignItems: "center",
//                           gap: 1,
//                           width: { xs: "100%", sm: "auto" },
//                         }}
//                       >
//                         <Typography
//                           variant="subtitle2"
//                           sx={{
//                             color: "#475569",
//                             minWidth: "40px",
//                             textAlign: "right",
//                           }}
//                         >
//                           شروع:
//                         </Typography>
//                         <DatePicker
//                           disableDayPicker
//                           format="HH:mm"
//                           plugins={[<TimePicker hideSeconds />]}
//                           calendar={persian}
//                           locale={persian_fa}
//                           value={shift.startTime}
//                           onChange={(time: DateObject) =>
//                             updateShift(index, "startTime", time)
//                           }
//                           containerStyle={{ width: "100%" }}
//                         />
//                       </Box>
//                       <Box
//                         sx={{
//                           display: "flex",
//                           alignItems: "center",
//                           gap: 1,
//                           width: { xs: "100%", sm: "auto" },
//                         }}
//                       >
//                         <Typography
//                           variant="subtitle2"
//                           sx={{
//                             color: "#475569",
//                             minWidth: "40px",
//                             textAlign: "right",
//                           }}
//                         >
//                           پایان:
//                         </Typography>
//                         <DatePicker
//                           disableDayPicker
//                           format="HH:mm"
//                           plugins={[<TimePicker hideSeconds />]}
//                           calendar={persian}
//                           locale={persian_fa}
//                           value={shift.endTime}
//                           onChange={(time: DateObject) =>
//                             updateShift(index, "endTime", time)
//                           }
//                           containerStyle={{ width: "100%" }}
//                         />
//                       </Box>
//                       <Box
//                         sx={{
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: { xs: "flex-start", sm: "center" },
//                           pl: { xs: "40px", sm: 0 },
//                         }}
//                       >
//                         <FormControlLabel
//                           control={
//                             <Switch
//                               checked={shift.isWorkDay}
//                               onChange={(e) =>
//                                 updateShift(
//                                   index,
//                                   "isWorkDay",
//                                   e.target.checked
//                                 )
//                               }
//                               sx={{
//                                 "& .MuiSwitch-switchBase.Mui-checked": {
//                                   color: "#22c55e",
//                                 },
//                                 "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
//                                   { bgcolor: "#86efac" },
//                               }}
//                             />
//                           }
//                           label={
//                             <Typography
//                               sx={{
//                                 color: shift.isWorkDay ? "#22c55e" : "#ef4444",
//                                 fontWeight: 500,
//                               }}
//                             >
//                               {shift.isWorkDay ? "کاری" : "تعطیل"}
//                             </Typography>
//                           }
//                         />
//                       </Box>
//                     </Box>
//                   </Box>
//                 </ListItem>
//               ))}
//             </List>
//             <Button
//               variant="contained"
//               onClick={handleSubmit}
//               disabled={
//                 isSubmitting ||
//                 !shiftName ||
//                 !shifts.every((shift) => shift.startTime && shift.endTime)
//               }
//               fullWidth
//               sx={{
//                 mt: 6,
//                 py: 2,
//                 borderRadius: 3,
//                 fontSize: "1.1rem",
//                 bgcolor: "#3b82f6",
//                 "&:hover": { bgcolor: "#2563eb" },
//                 "&:disabled": { bgcolor: "#e5e7eb", color: "#9ca3af" },
//                 transition: "background-color 0.3s ease-in-out",
//               }}
//             >
//               {isSubmitting ? "در حال ثبت..." : "ثبت نهایی شیفت‌ها"}
//             </Button>
//           </Paper>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default ShiftsUpdateForm;

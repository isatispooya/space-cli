import { motion, AnimatePresence } from "framer-motion";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { Accordian } from "@/components";
import { useTimeflow } from "../hooks";
import { setOpenOwn, setSelectedOwnTime } from "../store/verifySlice";
import { RootState } from "../../../store/store";
import OwnLog from "../types/ownLogs.type";
import { formatTimeForDisplay, getTimeValue } from "../utils";
import { updateOwnLogTime } from "../utils";

interface OwnLogsSectionProps {
  logs: OwnLog[];
}

const OwnVerify = ({ logs }: OwnLogsSectionProps) => {
  const dispatch = useDispatch();
  const { isOpenOwn, selectedOwnTimes } = useSelector(
    (state: RootState) => state.verify
  );
  const { mutate: updateUser } = useTimeflow.useUserTimeflowAccept();

  const handleOwnTimeChange = (logId: number, newTime: Date | null) => {
    dispatch(setSelectedOwnTime({ logId, time: newTime }));
  };

  const handleUpdateOwnTime = (logId: number) => {
    const selectedTime = getTimeValue(
      logId,
      selectedOwnTimes,
      logs.find((log) => log.id === logId)?.time_user || null
    );

    updateOwnLogTime(logId, selectedTime, updateUser, dispatch);
  };

  const handleChange = (logId: number) => {
    console.log(logId);
  };

  return (
    <Accordian
      title="تردد"
      isOpen={isOpenOwn}
      onToggle={() => dispatch(setOpenOwn(!isOpenOwn))}
    >
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
          موارد تأیید نشده
        </h2>
        <AnimatePresence>
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center flex-wrap gap-4">
                <div>
                  <p className="text-gray-800 font-semibold">
                    کاربر: {log.user.username} ({log.user.first_name}{" "}
                    {log.user.last_name})
                  </p>
                  <p className="text-gray-600 text-sm">
                    زمان: {formatTimeForDisplay(log.time_user)}
                  </p>
                  <p className="text-gray-600 text-sm">
                    نوع: {log.type === "login" ? "ورود" : "خروج"}
                  </p>
                  <p className="text-sm font-medium text-yellow-600">
                    وضعیت: در انتظار
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <TimePicker
                    label="انتخاب زمان"
                    value={
                      selectedOwnTimes[log.id]
                        ? dayjs(selectedOwnTimes[log.id])
                        : log.time_user
                        ? dayjs(log.time_user)
                        : null
                    }
                    onChange={(newTime) =>
                      handleOwnTimeChange(
                        log.id,
                        newTime ? newTime.toDate() : null
                      )
                    }
                    sx={{ direction: "ltr" }}
                  />

                  <FormControl fullWidth>
                    <InputLabel id={`select-label-${log.id}`}>نوع</InputLabel>
                    <Select
                      labelId={`select-label-${log.id}`}
                      value={log.type}
                      label="نوع"
                      onChange={() => handleChange(log.id)}
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
                    color="primary"
                    onClick={() => handleUpdateOwnTime(log.id)}
                  >
                    به‌روزرسانی
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Accordian>
  );
};

export default OwnVerify;

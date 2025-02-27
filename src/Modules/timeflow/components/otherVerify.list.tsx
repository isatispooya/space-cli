import { motion, AnimatePresence } from "framer-motion";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { Accordian } from "@/components";
import { useTimeflow } from "../hooks";
import { setOpenOther, setSelectedOtherTime } from "../store/verifySlice";
import { RootState } from "../../../store/store";
import OtherLog from "../types/otherLogs.type";
import { formatTimeForDisplay, getTimeValue } from "../utils/time.utils";
import { updateOtherLogTime } from "../utils/api.utils";

interface OtherLogsSectionProps {
  logs: OtherLog[];
}

const OtherVerify = ({ logs }: OtherLogsSectionProps) => {
  const dispatch = useDispatch();
  const { isOpenOther, selectedOtherTimes } = useSelector(
    (state: RootState) => state.verify
  );
  const { mutate: updateParent } = useTimeflow.useUpdateUsersLoginByParent();
  const { mutate: updateLogoutParent } =
    useTimeflow.useUsersLogoutAcceptParent();

  // Handle time changes
  const handleOtherTimeChange = (logId: number, newTime: Date | null) => {
    dispatch(setSelectedOtherTime({ logId, time: newTime }));
  };

  // Update other time
  const handleUpdateOtherTime = (logId: number, logType: string) => {
    const selectedTime = getTimeValue(
      logId,
      selectedOtherTimes,
      logs.find((log) => log.id === logId)?.time_parent || null
    );

    updateOtherLogTime(
      logId,
      selectedTime,
      logType,
      updateParent,
      updateLogoutParent,
      dispatch
    );
  };

  return (
    <Accordian
      title="ورود و خروج زیرمجموعه‌ها"
      isOpen={isOpenOther}
      onToggle={() => dispatch(setOpenOther(!isOpenOther))}
    >
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-green-400 rounded-full"></span>
          موارد تأیید نشده زیرمجموعه‌ها
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
                    زمان:{" "}
                    {formatTimeForDisplay(
                      log.isOwnLog ? log.time_user : log.time_parent
                    )}
                  </p>
                  <p className="text-gray-600 text-sm">
                    نوع: {log.type === "login" ? "ورود" : "خروج"}
                  </p>
                  <p className="text-sm font-medium text-yellow-600">
                    وضعیت والد: در انتظار
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <TimePicker
                    label="انتخاب زمان والد"
                    value={
                      selectedOtherTimes[log.id]
                        ? dayjs(selectedOtherTimes[log.id])
                        : log.time_parent
                        ? dayjs(log.time_parent)
                        : null
                    }
                    onChange={(newTime) =>
                      handleOtherTimeChange(
                        log.id,
                        newTime ? newTime.toDate() : null
                      )
                    }
                    sx={{ direction: "ltr" }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdateOtherTime(log.id, log.type)}
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

export default OtherVerify;

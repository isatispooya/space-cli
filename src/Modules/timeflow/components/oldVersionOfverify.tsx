import { motion, AnimatePresence } from "framer-motion";
import "moment/locale/fa";
import moment from "moment-jalaali";
import { useEffect } from "react";
import { useTimeflow } from "../hooks";
import { Accordian } from "../../../components";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import { toast } from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import AbsenseConfirm from "./abbsenseConfirm";
import { useDispatch, useSelector } from "react-redux";
import {
  setOwnLogs,
  setOtherLogs,
  setOpenOwn,
  setOpenAbsense,
  setOpenOther,
  setSelectedOwnTime,
  setSelectedOtherTime,
  clearSelectedOwnTime,
  clearSelectedOtherTime,
  updateOwnLogStatus,
  updateOtherLogStatus,
} from "../store/verifySlice";
import { RootState } from "../../../store/store";

const TimeflowVerify = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useDispatch();
  const {
    ownLogs,
    otherLogs,
    isOpenOwn,
    isOpenAbsense,
    isOpenOther,
    selectedOwnTimes,
    selectedOtherTimes,
  } = useSelector((state: RootState) => state.verify);

  const navigate = useNavigate();
  const { data: userLogins } = useTimeflow.useGetUsersLogin();
  const { mutate: updateUser } = useTimeflow.useUserTimeflowAccept();
  const { mutate: updateParent } = useTimeflow.useUpdateUsersLoginByParent();
  const { mutate: updateLogoutParent } =
    useTimeflow.useUsersLogoutAcceptParent();

 
  const notApprovedOwnLogs = ownLogs.filter(
    (log) => log.status_self === "pending"
  );
  const notApprovedOtherLogs = otherLogs.filter(
    (log) => log.status_parent === "pending"
  );

  // Load user login data
  useEffect(() => {
    if (userLogins) {
      dispatch(
        setOwnLogs(
          userLogins.own_logs.map((log) => ({ ...log, isOwnLog: true })) || []
        )
      );
      dispatch(
        setOtherLogs(
          userLogins.other_logs.map((log) => ({ ...log, isOwnLog: false })) ||
            []
        )
      );
    }
  }, [userLogins, dispatch]);

  // Close modal if no pending logs
  useEffect(() => {
    if (notApprovedOwnLogs.length === 0 && notApprovedOtherLogs.length === 0) {
      onClose();
    }
  }, [notApprovedOwnLogs, notApprovedOtherLogs, onClose]);

  // Handle time changes
  const handleOwnTimeChange = (logId: number, newTime: Date | null) => {
    dispatch(setSelectedOwnTime({ logId, time: newTime }));
  };

  const handleOtherTimeChange = (logId: number, newTime: Date | null) => {
    dispatch(setSelectedOtherTime({ logId, time: newTime }));
  };

  // Update own time
  const handleUpdateOwnTime = (logId: number) => {
    const selectedTime =
      selectedOwnTimes[logId] !== undefined
        ? selectedOwnTimes[logId]
        : ownLogs.find((log) => log.id === logId)?.time_user || null;

    if (!selectedTime) {
      toast.error("زمان معتبری وجود ندارد.");
      return;
    }

    const formattedTime = new Date(selectedTime).toISOString();

    updateUser(
      { id: logId, data: { time_user: formattedTime } },
      {
        onSuccess: () => {
          dispatch(updateOwnLogStatus({ logId, time: formattedTime }));
          dispatch(clearSelectedOwnTime(logId));
          toast.success("زمان با موفقیت به‌روزرسانی شد.");
        },
        onError: () => {
          toast.error("خطا در به‌روزرسانی زمان.");
        },
      }
    );
  };

  // Update other time
  const handleUpdateOtherTime = (logId: number, logType: string) => {
    const selectedTime =
      selectedOtherTimes[logId] !== undefined
        ? selectedOtherTimes[logId]
        : otherLogs.find((log) => log.id === logId)?.time_parent || null;

    if (!selectedTime) {
      toast.error("زمان معتبری وجود ندارد.");
      return;
    }

    const formattedTime = new Date(selectedTime).toISOString();
    const updateMutation =
      logType === "logout" ? updateLogoutParent : updateParent;

    updateMutation(
      { id: logId, data: { time_parent: formattedTime } },
      {
        onSuccess: () => {
          dispatch(updateOtherLogStatus({ logId, time: formattedTime }));
          dispatch(clearSelectedOtherTime(logId));
          toast.success("زمان زیرمجموعه با موفقیت به‌روزرسانی شد.");
        },
        onError: () => {
          toast.error("خطا در به‌روزرسانی زمان زیرمجموعه.");
        },
      }
    );
  };

  const handleClose = () => {
    navigate("/login");
  };

  // Return null if no logs need approval
  if (notApprovedOwnLogs.length === 0 && notApprovedOtherLogs.length === 0) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 overflow-y-auto"
      >
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="bg-white/95 rounded-3xl shadow-2xl p-6 max-w-3xl w-full relative">
            {/* Close Button */}
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClose}
              className="absolute top-4 right-4 p-1 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300 transition-colors"
            >
              <IoClose size={24} />
            </motion.button>

            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              تأیید ورود و خروج
            </h1>

            <div className="flex flex-col gap-4">
              <Button
                variant="contained"
                color="secondary"
                onClick={() => dispatch(setOpenAbsense(true))}
                className="mb-4"
              >
                مدیریت غیبت‌ها
              </Button>

              {/* Own logs section */}
              {notApprovedOwnLogs.length > 0 && (
                <Accordian
                  title="ورود"
                  isOpen={isOpenOwn}
                  onToggle={() => dispatch(setOpenOwn(!isOpenOwn))}
                >
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      موارد تأیید نشده
                    </h2>
                    <AnimatePresence>
                      {notApprovedOwnLogs.map((log) => (
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
                                کاربر: {log.user.username} (
                                {log.user.first_name} {log.user.last_name})
                              </p>
                              <p className="text-gray-600 text-sm">
                                زمان:{" "}
                                {moment(log.time_user).format(
                                  "jYYYY/jMM/jDD - HH:mm"
                                )}
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
              )}

              {/* Other logs section */}
              {notApprovedOtherLogs.length > 0 && (
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
                      {notApprovedOtherLogs.map((log) => (
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
                                کاربر: {log.user.username} (
                                {log.user.first_name} {log.user.last_name})
                              </p>
                              <p className="text-gray-600 text-sm">
                                زمان:{" "}
                                {moment(
                                  log.isOwnLog ? log.time_user : log.time_parent
                                ).format("jYYYY/jMM/jDD - HH:mm")}
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
                                onClick={() =>
                                  handleUpdateOtherTime(log.id, log.type)
                                }
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
              )}

              {/* Absense management modal */}
              {isOpenAbsense && (
                <AbsenseConfirm
                  onClose={() => dispatch(setOpenAbsense(false))}
                />
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TimeflowVerify;

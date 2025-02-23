import { motion, AnimatePresence } from "framer-motion";
import "moment/locale/fa";
import moment from "moment-jalaali";
import { useState, useEffect } from "react";
import { useTimeflow } from "../hooks";
import { Accordian } from "../../../components";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import OwnLog from "../types/ownLogs.type";
import OtherLog from "../types/otherLogs.type";
import { toast } from "react-hot-toast";

const TimeflowVerify = ({ onClose }: { onClose: () => void }) => {
  const { mutate: updateUser } = useTimeflow.useUserTimeflowAccept();
  const { data: userLogins } = useTimeflow.useGetUsersLogin();
  const { mutate: updateParent } = useTimeflow.useUpdateUsersLoginByParent();
  const { mutate: updateLogoutParent } =
    useTimeflow.useUsersLogoutAcceptParent();
  const [ownLogs, setOwnLogs] = useState<OwnLog[]>([]);
  const [otherLogs, setOtherLogs] = useState<OtherLog[]>([]);
  const [isOpenOwn, setIsOpenOwn] = useState(false);
  const [isOpenOther, setIsOpenOther] = useState(false);
  const [selectedOwnTimes, setSelectedOwnTimes] = useState<
    Record<number, Date | null>
  >({});
  const [selectedOtherTimes, setSelectedOtherTimes] = useState<
    Record<number, Date | null>
  >({});

  useEffect(() => {
    if (userLogins) {
      setOwnLogs(
        userLogins.own_logs.map((log) => ({
          ...log,
          isOwnLog: true,
        })) || []
      );
      setOtherLogs(
        userLogins.other_logs.map((log) => ({
          ...log,
          isOwnLog: false,
        })) || []
      );
    }
  }, [userLogins]);

  const notApprovedOwnLogs = ownLogs.filter(
    (log) => log.status_self === "pending"
  );

  const notApprovedOtherLogs = otherLogs.filter(
    (log) => log.status_parent === "pending"
  );

  const handleOwnTimeChange = (logId: number, newTime: Date | null) => {
    setSelectedOwnTimes((prev) => ({
      ...prev,
      [logId]: newTime,
    }));
  };

  const handleOtherTimeChange = (logId: number, newTime: Date | null) => {
    setSelectedOtherTimes((prev) => ({
      ...prev,
      [logId]: newTime,
    }));
  };

  const handleUpdateOwnTime = (logId: number) => {
    // اگر کاربر زمان را تغییر نداده باشد، از زمان پیش‌فرض log.time_user استفاده می‌کنیم
    const selectedTime =
      selectedOwnTimes[logId] !== undefined
        ? selectedOwnTimes[logId]
        : ownLogs.find((log) => log.id === logId)?.time_user || null;

    if (!selectedTime) {
      toast.error("زمان معتبری وجود ندارد.");
      return;
    }

    const formattedTime = new Date(selectedTime).toISOString();
    const patchData = { time_user: formattedTime };

    updateUser(
      { id: logId, data: patchData },
      {
        onSuccess: () => {
          setOwnLogs((prevLogs) =>
            prevLogs.map((log) =>
              log.id === logId
                ? { ...log, time_user: formattedTime, status_self: "approved" }
                : log
            )
          );
          setSelectedOwnTimes((prev) => {
            const newTimes = { ...prev };
            delete newTimes[logId];
            return newTimes;
          });
          toast.success("زمان با موفقیت به‌روزرسانی شد.");
        },
        onError: () => {
          toast.error("خطا در به‌روزرسانی زمان.");
        },
      }
    );
  };

  const handleUpdateOtherTime = (logId: number, logType: string) => {
    // اگر کاربر زمان را تغییر نداده باشد، از زمان پیش‌فرض log.time_parent استفاده می‌کنیم
    const selectedTime =
      selectedOtherTimes[logId] !== undefined
        ? selectedOtherTimes[logId]
        : otherLogs.find((log) => log.id === logId)?.time_parent || null;

    if (!selectedTime) {
      toast.error("زمان معتبری وجود ندارد.");
      return;
    }

    const formattedTime = new Date(selectedTime).toISOString();
    const patchData = { time_parent: formattedTime };
    const updateMutation =
      logType === "logout" ? updateLogoutParent : updateParent;

    updateMutation(
      { id: logId, data: patchData },
      {
        onSuccess: () => {
          setOtherLogs((prevLogs) =>
            prevLogs.map((log) =>
              log.id === logId
                ? {
                    ...log,
                    time_parent: formattedTime,
                    status_parent: "approved",
                  }
                : log
            )
          );
          setSelectedOtherTimes((prev) => {
            const newTimes = { ...prev };
            delete newTimes[logId];
            return newTimes;
          });
          toast.success("زمان زیرمجموعه با موفقیت به‌روزرسانی شد.");
        },
        onError: () => {
          toast.error("خطا در به‌روزرسانی زمان زیرمجموعه.");
        },
      }
    );
  };

  useEffect(() => {
    if (notApprovedOwnLogs.length === 0 && notApprovedOtherLogs.length === 0) {
      onClose();
    }
  }, [notApprovedOwnLogs, notApprovedOtherLogs, onClose]);

  if (notApprovedOwnLogs.length === 0 && notApprovedOtherLogs.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 overflow-y-auto"
    >
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white/95 rounded-3xl shadow-2xl p-6 max-w-3xl w-full">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            تأیید ورود و خروج
          </h1>
          <div className="flex flex-col gap-4">
            {notApprovedOwnLogs.length > 0 && (
              <Accordian
                title="ورود"
                isOpen={isOpenOwn}
                onToggle={() => setIsOpenOwn(!isOpenOwn)}
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
                              کاربر: {log.user.username} ({log.user.first_name}{" "}
                              {log.user.last_name})
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

            {notApprovedOtherLogs.length > 0 && (
              <Accordian
                title="ورود و خروج زیرمجموعه‌ها"
                isOpen={isOpenOther}
                onToggle={() => setIsOpenOther(!isOpenOther)}
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
                              کاربر: {log.user.username} ({log.user.first_name}{" "}
                              {log.user.last_name})
                            </p>
                            {log.isOwnLog ? (
                              <p className="text-gray-600 text-sm">
                                زمان کاربر:{" "}
                                {moment(log.time_user).format(
                                  "jYYYY/jMM/jDD - HH:mm"
                                )}
                              </p>
                            ) : (
                              <p className="text-gray-600 text-sm">
                                زمان والد:{" "}
                                {moment(log.time_parent).format(
                                  "jYYYY/jMM/jDD - HH:mm"
                                )}
                              </p>
                            )}
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
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TimeflowVerify;
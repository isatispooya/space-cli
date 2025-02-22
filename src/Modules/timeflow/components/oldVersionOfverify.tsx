import { motion, AnimatePresence } from "framer-motion";
import "moment/locale/fa";
import moment from "moment-jalaali"; // For Jalali calendar
import { useState, useEffect } from "react";
import { useTimeflow } from "../hooks";
import { Accordian } from "../../../components";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Button } from "@mui/material";
import dayjs from "dayjs";
// Define the user type
type User = {
  username: string;
  first_name: string;
  last_name: string;
};
// Define a type for the log entries
type OwnLog = {
  id: number;
  status_self: string;
  time_user: string;
  user: User; // Add user property
  // Add other relevant properties
  type: string;
  isOwnLog: boolean;
};
type OtherLog = {
  id: number;
  status_parent: string;
  time_parent: string;
  time_user: string;
  user: User; // Add user property
  // Add other relevant properties
  type: string;
  isOwnLog: boolean;
};
const TimeflowVerify = () => {
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
    (log) => log.status_self !== "approved"
  );

  const notApprovedOtherLogs = otherLogs.filter(
    (log) => log.status_parent !== "approved"
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
    const selectedTime = selectedOwnTimes[logId];
    if (!selectedTime) {
      alert("لطفاً یک زمان انتخاب کنید.");
      return;
    }

    const formattedTime = selectedTime.toISOString();
    const patchData = { time_user: formattedTime };

    console.log("Calling updateUser with ID:", logId, "Data:", patchData);

    updateUser(
      { id: logId, data: patchData }, // Single object with id and data
      {
        onSuccess: () => {
          console.log("updateUser succeeded for ID:", logId);
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
          alert("زمان با موفقیت به‌روزرسانی شد.");
        },
        onError: (error) => {
          console.error("updateUser failed for ID:", logId, "Error:", error);
          alert("خطا در به‌روزرسانی زمان.");
        },
      }
    );
  };

  const handleUpdateOtherTime = (logId: number, logType: string) => {
    const selectedTime = selectedOtherTimes[logId];
    if (!selectedTime) {
      alert("لطفاً یک زمان انتخاب کنید.");
      return;
    }

    const formattedTime = selectedTime.toISOString();
    const patchData = { time_parent: formattedTime };

    const updateMutation =
      logType === "logout" ? updateLogoutParent : updateParent;

    console.log(
      "Calling update mutation - ID:",
      logId,
      "Type:",
      logType,
      "Data:",
      patchData
    );

    updateMutation(
      { id: logId, data: patchData }, // Single object with id and data
      {
        onSuccess: () => {
          console.log(
            `${
              logType === "logout" ? "updateLogoutParent" : "updateParent"
            } succeeded for ID:`,
            logId
          );
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
          alert("زمان زیرمجموعه با موفقیت به‌روزرسانی شد.");
        },
        onError: (error) => {
          console.error(
            `${
              logType === "logout" ? "updateLogoutParent" : "updateParent"
            } failed for ID:`,
            logId,
            "Error:",
            error
          );
          alert("خطا در به‌روزرسانی زمان زیرمجموعه.");
        },
      }
    );
  };

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
            {/* Own Logs Accordion */}
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
                  {notApprovedOwnLogs.length > 0 ? (
                    notApprovedOwnLogs.map((log) => (
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
                            <p
                              className={`text-sm font-medium ${
                                log.status_self === "pending"
                                  ? "text-yellow-600"
                                  : "text-red-600"
                              }`}
                            >
                              وضعیت:{" "}
                              {log.status_self === "pending"
                                ? "در انتظار"
                                : "رد شده"}
                            </p>
                          </div>
                          {log.status_self === "pending" && (
                            <div className="flex flex-col gap-2">
                              <TimePicker
                                label="انتخاب زمان"
                                value={
                                  selectedOwnTimes[log.id]
                                    ? dayjs(selectedOwnTimes[log.id]) // Convert Date to Dayjs
                                    : log.time_user
                                    ? dayjs(log.time_user)
                                    : null // Convert Date to Dayjs
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
                          )}
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-gray-500 text-center"
                    >
                      هیچ مورد تأیید نشده‌ای وجود ندارد.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </Accordian>

            {/* Other Logs Accordion */}
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
                  {notApprovedOtherLogs.length > 0 ? (
                    notApprovedOtherLogs.map((log) => (
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
                            <p
                              className={`text-sm font-medium ${
                                log.status_parent === "pending"
                                  ? "text-yellow-600"
                                  : "text-red-600"
                              }`}
                            >
                              وضعیت والد:{" "}
                              {log.status_parent === "pending"
                                ? "در انتظار"
                                : "رد شده"}
                            </p>
                          </div>
                          {log.status_parent === "pending" && (
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
                          )}
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-gray-500 text-center"
                    >
                      هیچ مورد تأیید نشده‌ای برای زیرمجموعه‌ها وجود ندارد.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </Accordian>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TimeflowVerify;

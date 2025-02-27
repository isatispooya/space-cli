import { motion, AnimatePresence } from "framer-motion";
import "moment/locale/fa";
import moment from "moment-jalaali";
import { useState, useEffect } from "react";
import { useTimeflow } from "../hooks";
import { Accordian } from "../../../components";
import { Button } from "@mui/material";
import { toast } from "react-hot-toast";
import { IoClose } from "react-icons/io5";

const AbsenseConfirm = ({ onClose }: { onClose: () => void }) => {
  const { data: userLogins } = useTimeflow.useGetUsersLogin();
  const { mutate: postAbsence } = useTimeflow.usePostAbsence();
  const [ownAbsences, setOwnAbsences] = useState<any[]>([]);
  const [isOpenOwn, setIsOpenOwn] = useState(true);

  const abssenceType = {
    absence: "absence",
    leave: "leave",
    mission: "mission",
  };

  useEffect(() => {
    if (userLogins?.own_absence) {
      setOwnAbsences(userLogins.own_absence || []);
    }
  }, [userLogins]);

  const handleAbsenceUpdate = (
    absenceId: number,
    status: "absence" | "leave" | "mission"
  ) => {
    const absence = ownAbsences[absenceId];

    const payload = {
      type: abssenceType[status],
      time_user_start: `${absence.date}T${absence.time_start}`,
      time_user_end: `${absence.date}T${absence.time_end}`,

    };

    postAbsence(payload, {
      onSuccess: () => {
        toast.success(
          `وضعیت به ${
            status === "absence"
              ? "غیبت"
              : status === "leave"
              ? "مرخصی"
              : "ماموریت"
          } تغییر کرد`
        );
      },
    });
  };

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
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="absolute top-4 right-4 p-1 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300 transition-colors"
            >
              <IoClose size={24} />
            </motion.button>

            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              تأیید غیبت‌ها
            </h1>

            <Accordian
              title="غیبت‌های ثبت شده"
              isOpen={isOpenOwn}
              onToggle={() => setIsOpenOwn(!isOpenOwn)}
            >
              <div className="space-y-4">
                <AnimatePresence>
                  {ownAbsences.map((absence, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-gray-800 font-semibold">
                              کاربر: {absence.user_detail.first_name}{" "}
                              {absence.user_detail.last_name}
                            </p>
                            <p className="text-gray-600 text-sm">
                              تاریخ:{" "}
                              {moment(absence.date).format("jYYYY/jMM/jDD")}
                            </p>
                            <p className="text-gray-600 text-sm">
                              از ساعت: {absence.time_start} تا ساعت:{" "}
                              {absence.time_end}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() =>
                                handleAbsenceUpdate(index, "absence")
                              }
                            >
                              غیبت
                            </Button>
                            <Button
                              variant="contained"
                              color="warning"
                              onClick={() =>
                                handleAbsenceUpdate(index, "leave")
                              }
                            >
                              مرخصی
                            </Button>
                            <Button
                              variant="contained"
                              color="info"
                              onClick={() =>
                                handleAbsenceUpdate(index, "mission")
                              }
                            >
                              ماموریت
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </Accordian>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AbsenseConfirm;

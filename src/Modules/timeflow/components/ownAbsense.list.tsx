/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion, AnimatePresence } from "framer-motion";
import "moment/locale/fa";
import moment from "moment-jalaali";
import { useTimeflow } from "../hooks";
import { Accordian } from "../../../components";
import { Button } from "@mui/material";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setOpenAbsense } from "../store/verifySlice";
import { RootState } from "../../../store/store";

const OwnAbsense = ({ logs }: { logs: any[] }) => {
  const dispatch = useDispatch();
  const { isOpenAbsense } = useSelector((state: RootState) => state.verify);
  const { mutate: postAbsence } = useTimeflow.usePostAbsence();

  const abssenceType = {
    absence: "absence",
    leave: "leave",
    mission: "mission",
  };

  const handleAbsenceUpdate = (
    absence: any,
    status: "absence" | "leave" | "mission"
  ) => {
    const payload = {
      type: abssenceType[status],
      time_user_start: `${absence.date}T${absence.time_start}`,
      time_user_end: `${absence.date}T${absence.time_end}`,
    };

    postAbsence(payload as any, {
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
    <Accordian
      title="غیبت‌ها"
      isOpen={isOpenAbsense}
      onToggle={() => dispatch(setOpenAbsense(!isOpenAbsense))}
    >
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-red-400 rounded-full"></span>
          غیبت‌های ثبت شده
        </h2>
        <AnimatePresence>
          {logs.map((absence, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center flex-wrap gap-4">
                <div>
                  <p className="text-gray-800 font-semibold">
                    کاربر: {absence.user_detail.first_name}{" "}
                    {absence.user_detail.last_name}
                  </p>
                  <p className="text-gray-600 text-sm">
                    تاریخ: {moment(absence.date).format("jYYYY/jMM/jDD")}
                  </p>
                  <p className="text-gray-600 text-sm">
                    از ساعت: {absence.time_start} تا ساعت: {absence.time_end}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleAbsenceUpdate(absence, "absence")}
                  >
                    غیبت
                  </Button>
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => handleAbsenceUpdate(absence, "leave")}
                  >
                    مرخصی
                  </Button>
                  <Button
                    variant="contained"
                    color="info"
                    onClick={() => handleAbsenceUpdate(absence, "mission")}
                  >
                    ماموریت
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

export default OwnAbsense;

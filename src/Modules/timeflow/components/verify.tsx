import { motion, AnimatePresence } from "framer-motion";
import "moment/locale/fa";
import { useEffect } from "react";
import { useTimeflow } from "../hooks";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setOwnLogs, setOtherLogs } from "../store/verifySlice";
import { RootState } from "../../../store/store";
import { OwnVerify, OtherVerify } from ".";
import OwnAbsense from "./ownAbsense.list";

interface TimeflowVerifyProps {
  onClose: () => void;
}

const TimeflowVerify = ({ onClose }: TimeflowVerifyProps) => {
  const dispatch = useDispatch();
  const { ownLogs, otherLogs } = useSelector(
    (state: RootState) => state.verify
  );

  const navigate = useNavigate();
  const { data: userLogins, isLoading } = useTimeflow.useGetUsersLogin();
  const notApprovedOwnLogs = ownLogs.filter(
    (log) => log.status_self === "pending"
  );
  const notApprovedOtherLogs = otherLogs.filter(
    (log) => log.status_parent === "pending"
  );

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

  useEffect(() => {
    if (!isLoading) {
      const hasOwnLogs =
        notApprovedOwnLogs.filter((log) => log.type !== "logout").length > 0;
      const hasOtherLogs = notApprovedOtherLogs.length > 0;
      const hasAbsenceLogs =
        userLogins?.own_absence && userLogins.own_absence.length > 0;

      if (!hasOwnLogs && !hasOtherLogs && !hasAbsenceLogs) {
        onClose();
      }
    }
  }, [
    notApprovedOwnLogs,
    notApprovedOtherLogs,
    userLogins,
    onClose,
    isLoading,
  ]);

  const handleClose = () => {
    onClose();
    navigate("/login");
  };

  if (!isLoading) {
    const hasOwnLogs =
      notApprovedOwnLogs.filter((log) => log.type !== "logout").length > 0;
    const hasOtherLogs = notApprovedOtherLogs.length > 0;
    const hasAbsenceLogs =
      userLogins?.own_absence && userLogins.own_absence.length > 0;

    if (!hasOwnLogs && !hasOtherLogs && !hasAbsenceLogs) {
      return null;
    }
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
               تردد 
            </h1>

            {isLoading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {notApprovedOwnLogs.length > 0 && (
                  <OwnVerify logs={notApprovedOwnLogs} />
                )}

                {notApprovedOtherLogs.length > 0 && (
                  <OtherVerify logs={notApprovedOtherLogs} />
                )}

                {userLogins?.own_absence &&
                  userLogins.own_absence.length > 0 && (
                    <OwnAbsense logs={userLogins.own_absence} />
                  )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TimeflowVerify;

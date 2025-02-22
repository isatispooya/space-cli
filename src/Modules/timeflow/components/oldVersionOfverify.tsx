import { motion, AnimatePresence } from "framer-motion";
import moment from "moment-jalaali";
import "moment/locale/fa";
import { useState, useEffect } from "react";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useTimeflow } from "../hooks";
import { Accordian } from "../../../components";

moment.loadPersian({ dialect: "persian-modern" });

type User = { first_name: string; last_name: string };
type Status =
  | "pending"
  | "approved"
  | "rejected"
  | "mission"
  | "leave"
  | "shift_end";

interface TimeEntry {
  id: number;
  user: User;
  type: "login" | "logout";
  time: string;
  status: Status;
  rejectReason?: string;
}

const TimeflowVerify = () => {
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenTeam, setIsOpenTeam] = useState(false);

  const { mutate: updateUser } = useTimeflow.useUserTimeflowAccept();
  const { mutate: updateParent } = useTimeflow.useUpdateUsersLoginByParent();
  const { mutate: updateLogout } = useTimeflow.useUsersLogoutAccept();

  const { mutate: updateLogoutParent } =
    useTimeflow.useUsersLogoutAcceptParent();
  const { data: userLogins } = useTimeflow.useGetUsersLogin();

  // Map userLogins data to TimeEntry format when it loads
  useEffect(() => {
    if (userLogins) {
      const mappedEntries: TimeEntry[] = [
        ...(userLogins.own_logs || []).map((log: any) => ({
          id: log.id,
          user: {
            first_name: log.user.first_name,
            last_name: log.user.last_name || "",
          },
          type: log.type,
          time: log.time_user,
          status: log.status_self as Status,
        })),
        ...(userLogins.other_logs || []).map((log: any) => ({
          id: log.id,
          user: {
            first_name: log.user.first_name,
            last_name: log.user.last_name || "",
          },
          type: log.type,
          time: log.time_user,
          status: log.status_parent as Status,
        })),
      ];
      setEntries(mappedEntries);
    }
  }, [userLogins]);

  // Check if there are pending entries to control visibility
  useEffect(() => {
    const hasPending = entries.some((entry) => entry.status === "pending");
    setIsVisible(hasPending);
  }, [entries]);

  const updateEntryStatus = (id: number, status: Status, reason?: string) => {
    const entry = entries.find((e) => e.id === id);
    if (!entry) return;

    const isUserEntry = userLogins?.own_logs.some((log: any) => log.id === id);
    const payload = {
      id,
      ...(isUserEntry
        ? { time_user: new Date().toISOString() } // Replace with "2023-02-22T16:02:25.379063Z" if static
        : { time_parent: new Date().toISOString() }), // Replace with "2028-02-22T18:02:25.379063Z" if static
      status,
      ...(reason && { rejectReason: reason }),
    };

    if (isUserEntry) {
      if (entry.type === "login") {
        updateUser(payload, {
          onSuccess: () => {
            setEntries((prev) =>
              prev.map((e) =>
                e.id === id
                  ? {
                      ...e,
                      status,
                      rejectReason: reason,
                      time: payload.time_user!,
                    }
                  : e
              )
            );
          },
        });
      } else if (entry.type === "logout") {
        updateLogout(payload, {
          onSuccess: () => {
            setEntries((prev) =>
              prev.map((e) =>
                e.id === id
                  ? {
                      ...e,
                      status,
                      rejectReason: reason,
                      time: payload.time_user!,
                    }
                  : e
              )
            );
          },
        });
      }
    } else {
      if (entry.type === "login") {
        updateParent(payload, {
          onSuccess: () => {
            setEntries((prev) =>
              prev.map((e) =>
                e.id === id
                  ? {
                      ...e,
                      status,
                      rejectReason: reason,
                      time: payload.time_parent!,
                    }
                  : e
              )
            );
          },
        });
      } else if (entry.type === "logout") {
        updateLogoutParent(payload, {
          onSuccess: () => {
            setEntries((prev) =>
              prev.map((e) =>
                e.id === id
                  ? {
                      ...e,
                      status,
                      rejectReason: reason,
                      time: payload.time_parent!,
                    }
                  : e
              )
            );
          },
        });
      }
    }
  };

  const handleTimeChange = (id: number, value: any) => {
    if (value) {
      const isoString = value.toDate
        ? value.toDate().toISOString()
        : new Date(value).toISOString();
      setEntries((prev) =>
        prev.map((entry) =>
          entry.id === id ? { ...entry, time: isoString } : entry
        )
      );
    }
  };

  if (!isVisible) return null;

  // Filter current user's pending entries (both login and logout)
  const currentUserEntries = entries.filter(
    (e) =>
      userLogins?.own_logs.some((log: any) => log.id === e.id) &&
      e.status === "pending"
  );
  const teamEntries = entries.filter(
    (e) =>
      userLogins?.other_logs.some((log: any) => log.id === e.id) &&
      e.status === "pending"
  );

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
          <Accordian title="ورود و خروج من" isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)}>
            {currentUserEntries.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  ورود و خروج من
                </h2>
                <AnimatePresence>
                  {currentUserEntries.map((entry) => (
                    <EntryCard
                      key={entry.id}
                      entry={entry}
                      onApprove={() => updateEntryStatus(entry.id, "approved")}
                      onReject={(reason) =>
                        updateEntryStatus(entry.id, "rejected", reason)
                      }
                      onTimeChange={handleTimeChange}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </Accordian>

          <Accordian title="ورود و خروج زیرمجموعه‌ها" isOpen={isOpenTeam} onToggle={() => setIsOpenTeam(!isOpenTeam)}>
            {teamEntries.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                ورود و خروج زیرمجموعه‌ها
              </h2>
              <AnimatePresence>
                {teamEntries.map((entry) => (
                  <EntryCard
                    key={entry.id}
                    entry={entry}
                    onApprove={() => updateEntryStatus(entry.id, "approved")}
                    onReject={(reason) =>
                      updateEntryStatus(entry.id, "rejected", reason)
                    }
                    onMission={() => updateEntryStatus(entry.id, "mission")}
                    onLeave={() => updateEntryStatus(entry.id, "leave")}
                    onShiftEnd={() => updateEntryStatus(entry.id, "shift_end")}
                    onTimeChange={handleTimeChange}
                  />
                ))}
              </AnimatePresence>
              </div>
            )}
          </Accordian>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const EntryCard = ({
  entry,
  onApprove,
  onReject,
  onTimeChange,
}: {
  entry: TimeEntry;
  onApprove: () => void;
  onReject: (reason: string) => void;
  onMission?: () => void;
  onLeave?: () => void;
  onShiftEnd?: () => void;
  onTimeChange: (id: number, value: any) => void;
}) => {
  const [showRejectInput, setShowRejectInput] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="p-4 mb-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-lg transition-all"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col space-y-1">
          <h3 className="text-sm text-gray-700">
            {entry.user.first_name + " " + entry.user.last_name}
          </h3>
          <span className="text-xs text-gray-500">
            {entry.type === "login" ? "زمان ورود" : "زمان خروج"}
          </span>
          <DatePicker
            value={entry.time === "نامعتبر" ? null : new Date(entry.time)}
            onChange={(value) => onTimeChange(entry.id, value)}
            format="HH:mm - YYYY/MM/DD"
            plugins={[<TimePicker position="bottom" />]}
            calendar={persian}
            locale={persian_fa}
            calendarPosition="bottom-right"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            className="px-4 py-2 text-sm bg-green-50 text-green-600 rounded-lg hover:bg-green-100 flex items-center gap-2"
            onClick={onApprove}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            تأیید
          </button>
          <button
            className="px-4 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 flex items-center gap-2"
            onClick={() => setShowRejectInput(!showRejectInput)}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            رد
          </button>
        </div>
      </div>
      <AnimatePresence>
        {showRejectInput && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4"
          >
            <textarea
              className="w-full p-2 border rounded-lg resize-none"
              placeholder="دلیل رد درخواست (اختیاری)"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
            <button
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              onClick={() => {
                onReject(rejectReason);
                setShowRejectInput(false);
                setRejectReason("");
              }}
            >
              ثبت رد
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TimeflowVerify;

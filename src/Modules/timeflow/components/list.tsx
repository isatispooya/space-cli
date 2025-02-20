import React, { useState } from "react";
import { DateSelector } from "../../../components";
import { DateObject } from "react-multi-date-picker";
import toast from "react-hot-toast";
import moment from "moment-jalaali";
import { Chip } from "@mui/material";

interface Log {
  id: number;
  user: {
    first_name: string;
    last_name: string;
  };
  time_parent: DateObject;
  type: "login" | "logout";
  status_parent: "pending" | "approved" | "rejected";
}

interface LogListProps {
  logs: Log[];
  onAccept: (logId: number, selectedTime: DateObject) => void;
}

const LogList: React.FC<LogListProps> = ({ logs, onAccept }) => {
  const [selectedTimes, setSelectedTimes] = useState<{
    [key: number]: DateObject | null;
  }>(() => {
    const initialTimes: { [key: number]: DateObject | null } = {};
    logs.forEach((log) => {
      initialTimes[log.id] = log.time_parent;
    });
    return initialTimes;
  });

  const handleTimeChange = (id: number, newTime: DateObject | null) => {
    setSelectedTimes((prev) => ({ ...prev, [id]: newTime }));
  };

  const handleAccept = (logId: number) => {
    const selectedTime = selectedTimes[logId];
    if (!selectedTime) {
      toast.error("لطفاً زمان معتبری انتخاب کنید.");
      return;
    }
    onAccept(logId, selectedTime);
  };

  return (
    <div className="space-y-4">
      {logs.map((log) => (
        <div
          key={log.id}
          className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
        >
          <div className="space-y-2">
            <div className="mb-2">
              <span className="font-medium text-gray-700 ml-2">نام:</span>
              <span className="text-gray-600">
                {log.user.first_name} {log.user.last_name}
              </span>
            </div>
            <div className="space-y-2">
              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  {log.type === "login" ? "زمان ورود" : "زمان خروج"}
                  <span className="text-gray-400 ml-2">
                    {moment(log.time_parent.toDate()).format(
                      "jYYYY/MM/DD HH:mm"
                    )}
                  </span>
                </label>
              </div>
              <DateSelector
                value={selectedTimes[log.id] || null}
                onChange={(newTime) => {
                  const singleTime = Array.isArray(newTime)
                    ? newTime[0]
                    : newTime;
                  handleTimeChange(log.id, singleTime);
                }}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            {log.status_parent === "pending" && (
              <Chip
                onClick={() => handleAccept(log.id)}
                label="تایید"
                style={{
                  backgroundColor: "blue",
                  color: "white",
                }}
              />
            )}
            <Chip
              label={
                log.status_parent === "pending" ? "در حال بررسی" : "تایید شده"
              }
              style={{
                backgroundColor:
                  log.status_parent === "pending" ? undefined : "green",
                color: log.status_parent === "pending" ? undefined : "white",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LogList;

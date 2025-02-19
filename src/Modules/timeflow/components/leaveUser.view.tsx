import moment from "moment-jalaali";
import { useMemo, useState } from "react";
import { Accordian } from "../../../components";
import { Chip } from "@mui/material";
import { LeaveType } from "../types";

const UserLeaveView = ({
  leaveData,
  refetch,
}: {
  leaveData: LeaveType;
  refetch: () => void;
}) => {
  const [open, setOpen] = useState(false);

  const groupedOwnData = useMemo(() => {
    if (!leaveData?.own_logs) return [];

    const sortedData = [...leaveData.own_logs].sort(
      (a, b) => moment(b.time_user).valueOf() - moment(a.time_user).valueOf()
    );

    const groups = [];
    for (let i = 0; i < sortedData.length; i += 2) {
      const startItem = sortedData[i];
      const endItem = sortedData[i + 1];
      if (startItem) {
        groups.push({ startItem, endItem });
      }
    }
    return groups;
  }, [leaveData?.own_logs]);

  console.log(refetch);
  return (
    <>
      <Accordian
        title="مرخصی ها ثبت شده"
        isOpen={open}
        onToggle={() => setOpen(!open)}
      >
        <div>
          {groupedOwnData.length > 0 ? (
            <div className="space-y-4">
              {groupedOwnData.map(({ startItem, endItem }) => (
                <div
                  key={startItem.id}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                >
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium text-gray-700 ml-2">
                        ساعت و تاریخ ورود:
                      </span>
                      <span className="text-gray-600">
                        {moment(startItem.time_user).format(
                          "jYYYY/jMM/jDD HH:mm"
                        )}
                      </span>
                    </div>
                    {endItem && (
                      <div>
                        <span className="font-medium text-gray-700 ml-2">
                          ساعت و تاریخ خروج:
                        </span>
                        <span className="text-gray-600">
                          {moment(endItem.time_user).format(
                            "jYYYY/jMM/jDD HH:mm"
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                  <Chip
                    label={
                      startItem.status_parent === "pending"
                        ? "در حال بررسی"
                        : "تایید شده"
                    }
                    style={{
                      backgroundColor:
                        startItem.status_parent === "pending"
                          ? undefined
                          : "green",
                      color:
                        startItem.status_parent === "pending"
                          ? undefined
                          : "white",
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">
              هیچ مرخصی ثبت نشده است
            </p>
          )}
        </div>
      </Accordian>
    </>
  );
};

export default UserLeaveView;

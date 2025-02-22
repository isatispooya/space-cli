import moment from "moment-jalaali";
import { useMissionStore } from "../store";
import { useMemo, useState } from "react";
import { useTimeflow } from "../hooks";
import { Accordian, DateSelector, Toast } from "../../../components";
import { Chip } from "@mui/material";
import { MissionType } from "../types";
import toast, { ErrorIcon } from "react-hot-toast";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../../types";

const ParentMissionForm = ({
  dataMissionTimeFlow,
  refetch,
}: {
  dataMissionTimeFlow: MissionType;
  refetch: () => void;
}) => {
  const { approvedItems, setApprovedItems, setStartTime } = useMissionStore();
  const { mutate: updateMissionTimeFlow } = useTimeflow.useUpdateMission();
  const [isOpen, setIsOpen] = useState(false);
  const [modifiedDates, setModifiedDates] = useState<
    Record<number, Date | null>
  >({});

  const groupedOtherData = useMemo(() => {
    if (!dataMissionTimeFlow?.other_logs) return [];

    const sortedData = [...dataMissionTimeFlow.other_logs].sort(
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
  }, [dataMissionTimeFlow?.other_logs]);

  return (
    <>
      <Accordian
        title="ماموریت همکاران"
        isOpen={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
      >
        {groupedOtherData.length > 0 && (
          <div className="space-y-4 w-full max-w-4xl mx-auto px-2 sm:px-4">
            {groupedOtherData.map(({ startItem, endItem }) => (
              <div
                key={startItem.id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 sm:p-4 bg-gray-50 rounded-lg w-full"
              >
                <div className="w-full sm:w-auto space-y-3">
                  <div className="mb-2 flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="font-medium text-gray-700 whitespace-nowrap">
                      نام:
                    </span>
                    <span className="text-gray-600 break-words">
                      {startItem.user.first_name} {startItem.user.last_name}
                    </span>
                  </div>
                  <div className="space-y-3 w-full">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 block">
                        ساعت و تاریخ ورود
                      </label>
                      {startItem && (
                        <div className="w-full">
                          <DateSelector
                            value={
                              modifiedDates[startItem.id] ||
                              (startItem.time_user
                                ? moment(startItem.time_user).toDate()
                                : null)
                            }
                            onChange={(value) => {
                              const dateValue = Array.isArray(value)
                                ? value[0]?.toDate()
                                : value instanceof Date
                                ? value
                                : value?.toDate();

                              setModifiedDates((prev) => ({
                                ...prev,
                                [startItem.id]: dateValue || null,
                              }));

                              setStartTime(dateValue || null);
                            }}
                            className="w-full"
                          />
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 block">
                        ساعت و تاریخ خروج
                      </label>
                      {endItem && (
                        <div className="w-full">
                          <DateSelector
                            value={
                              modifiedDates[endItem.id] ||
                              (endItem.time_user
                                ? moment(endItem.time_user).toDate()
                                : null)
                            }
                            onChange={(value) => {
                              const dateValue = Array.isArray(value)
                                ? value[0]?.toDate()
                                : value instanceof Date
                                ? value
                                : value?.toDate();

                              setModifiedDates((prev) => ({
                                ...prev,
                                [endItem.id]: dateValue || null,
                              }));

                              setStartTime(dateValue || null);
                            }}
                            className="w-full"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-4 sm:mt-0 w-full sm:w-auto justify-start sm:justify-end">
                  {startItem.status_parent === "pending" &&
                  !approvedItems.includes(startItem.id) ? (
                    <button
                      onClick={() => {
                        updateMissionTimeFlow(
                          {
                            id: startItem.id,
                            data: {
                              time_parent_start: startItem.time_user,
                              time_parent_end:
                                modifiedDates[endItem?.id] ||
                                endItem?.time_user ||
                                "",
                            },
                          },
                          {
                            onSuccess: () => {
                              setApprovedItems([
                                ...approvedItems,
                                startItem.id,
                              ]);
                              refetch();
                              toast.success("ماموریت با موفقیت تایید شد");
                            },
                            onError: (error: AxiosError<unknown>) => {
                              const errorMessage = (
                                error.response?.data as ErrorResponse
                              )?.error;
                              Toast(
                                errorMessage || "خطایی رخ داده است",
                                <ErrorIcon />,
                                "bg-red-500"
                              );
                            },
                          }
                        );
                      }}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors w-full sm:w-auto text-sm whitespace-nowrap"
                    >
                      تایید
                    </button>
                  ) : (
                    <Chip
                      label="تایید شده"
                      style={{
                        backgroundColor: "#77e3aa",
                        color: "white",
                      }}
                      className="px-3 py-1 text-sm w-full sm:w-auto flex justify-center"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Accordian>
    </>
  );
};

export default ParentMissionForm;

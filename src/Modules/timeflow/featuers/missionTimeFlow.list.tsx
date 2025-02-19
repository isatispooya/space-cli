/* eslint-disable @typescript-eslint/no-unused-vars */
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useState, useMemo } from "react";
import moment from "moment-jalaali";
import { Chip } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import {
  useMissionTimeFlowCreate,
  useMissionTimeFlowUpdate,
  useMissionTimeFlow,
} from "../hooks/usemissionTimeFlow";

import DateObject from "react-date-object";

const MissionTimeFlowList = () => {
  const { mutate: createMissionTimeFlow } = useMissionTimeFlowCreate();
  const { data: dataMissionTimeFlow, refetch } = useMissionTimeFlow();
  const [startTime, setStartTime] = useState<DateObject | null>(null);
  const [endTime, setEndTime] = useState<DateObject | null>(null);
  const { mutate: updateMissionTimeFlow } = useMissionTimeFlowUpdate();
  const [approvedItems, setApprovedItems] = useState<number[]>([]);

  const handleSubmit = () => {
    const data = {
      time_user_end: endTime ? moment(endTime).toISOString() : null,
      time_user_start: startTime ? moment(startTime).toISOString() : null,
    };
    createMissionTimeFlow(data, {
      onSuccess: () => {
        refetch();
        setStartTime(null);
        setEndTime(null);
      },
    });
  };

  const groupedOwnData = useMemo(() => {
    if (!dataMissionTimeFlow?.own_logs) return [];

    const sortedData = [...dataMissionTimeFlow.own_logs].sort(
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
  }, [dataMissionTimeFlow?.own_logs]);

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
      <div className="w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] mx-auto shadow-lg bg-white rounded-3xl relative p-4 sm:p-6 md:p-8 flex flex-col mb-[100px] border border-gray-300 hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 text-center">
          ثبت ماموریت
        </h2>

        <div className="flex flex-col space-y-6 p-4 sm:p-6 shadow-lg border border-gray-300 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1fr,1fr,auto] gap-6">
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700">
                ساعت و تاریخ خروج
              </label>
              <DatePicker
                format="DD/MM/YYYY HH:mm"
                plugins={[<TimePicker position="bottom" />]}
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-right"
                value={startTime}
                style={{
                  width: "100%",
                  height: "42px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "0.5rem",
                  padding: "0.5rem",
                  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                }}
                onChange={(date: DateObject | null) => setStartTime(date)}
                className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700">
                ساعت و تاریخ ورود
              </label>
              <DatePicker
                format="DD/MM/YYYY HH:mm"
                plugins={[<TimePicker position="bottom" />]}
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-right"
                value={endTime}
                style={{
                  width: "100%",
                  height: "42px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "0.5rem",
                  padding: "0.5rem",
                  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                }}
                onChange={(date: DateObject | null) => setEndTime(date)}
                className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Submit Button */}
            <div className="flex items-end">
              <button
                onClick={handleSubmit}
                className="w-full xl:w-auto bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-[1.02] active:scale-[0.98] h-[42px] font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ثبت ماموریت
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <Accordion defaultExpanded={false}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography
                component="span"
                className="text-xl font-bold text-gray-800"
              >
                ماموریت‌های من
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
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
                  هیچ مرخصی شخصی ثبت نشده است.
                </p>
              )}
            </AccordionDetails>
          </Accordion>

          {groupedOtherData.length > 0 && (
            <Accordion className="mt-4" defaultExpanded={false}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography
                  component="span"
                  className="text-xl font-bold text-gray-800"
                >
                  ماموریت‌های زیرمجموعه
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="space-y-4">
                  {groupedOtherData.map(({ startItem, endItem }) => (
                    <div
                      key={startItem.id}
                      className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="space-y-2">
                        <div className="mb-2">
                          <span className="font-medium text-gray-700 ml-2">
                            نام:
                          </span>
                          <span className="text-gray-600">
                            {startItem.user.first_name}{" "}
                            {startItem.user.last_name}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <label className="text-sm font-medium text-gray-700 flex items-center">
                              ساعت و تاریخ خروج
                            </label>
                            <DatePicker
                              format="DD/MM/YYYY HH:mm"
                              plugins={[<TimePicker position="bottom" />]}
                              calendar={persian}
                              locale={persian_fa}
                              calendarPosition="bottom-right"
                              value={moment(startItem.time_user).format(
                                "jYYYY/jMM/jDD HH:mm"
                              )}
                              style={{
                                width: "100%",
                                minWidth: "250px",
                                border: "1px solid #ccc",
                                borderRadius: "8px",
                                padding: "20px",
                              }}
                              onChange={(date: DateObject | null) => {
                                setStartTime(date);
                              }}
                            />
                          </div>
                          {endItem && (
                            <div>
                              <label className="text-sm font-medium text-gray-700 flex items-center">
                                ساعت و تاریخ خروج
                              </label>
                              <DatePicker
                                format="DD/MM/YYYY HH:mm"
                                plugins={[<TimePicker position="bottom" />]}
                                calendar={persian}
                                locale={persian_fa}
                                calendarPosition="bottom-right"
                                value={moment(endItem.time_user).format(
                                  "jYYYY/jMM/jDD HH:mm"
                                )}
                                style={{
                                  width: "100%",
                                  minWidth: "250px",
                                  border: "1px solid #ccc",
                                  borderRadius: "8px",
                                  padding: "20px",
                                }}
                                onChange={(date: DateObject | null) => {
                                  setStartTime(date);
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {startItem.status_parent === "pending" &&
                        !approvedItems.includes(startItem.id) ? (
                          <>
                            <button
                              onClick={() => {
                                updateMissionTimeFlow(
                                  {
                                    id: startItem.id,
                                    data: {
                                      time_parent_start: startItem.time_user,
                                      time_parent_end:
                                        endItem?.time_user || null,
                                    },
                                  },
                                  {
                                    onSuccess: () => {
                                      setApprovedItems((prev) => [
                                        ...prev,
                                        startItem.id,
                                      ]);
                                      refetch();
                                    },
                                  }
                                );
                              }}
                              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                            >
                              تایید
                            </button>
                          </>
                        ) : (
                          <Chip
                            label="تایید شده"
                            style={{
                              backgroundColor: "#77e3aa",
                              color: "white",
                            }}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionDetails>
            </Accordion>
          )}
        </div>
      </div>
    </>
  );
};

export default MissionTimeFlowList;

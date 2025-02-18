import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {
  useLeaveTimeFlow,
  useLeaveTimeFlowCreate,
  useLeaveTimeFlowUpdate,
} from "../hooks/useleavetimeflow";
import { useState, useMemo } from "react";
import moment from "moment";
import { Chip } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";

const LeaveTimeFlow = () => {
  const { mutate: createLeaveTimeFlow } = useLeaveTimeFlowCreate();
  const { data: dataLeaveTimeFlow, refetch } = useLeaveTimeFlow();
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const { mutate: updateLeaveTimeFlow } = useLeaveTimeFlowUpdate();
  const [approvedItems, setApprovedItems] = useState<number[]>([]);

  console.log(dataLeaveTimeFlow);

  const handleSubmit = () => {
    const data = {
      time_user_end: endTime ? moment(endTime).toISOString() : null,
      time_user_start: startTime ? moment(startTime).toISOString() : null,
    };
    createLeaveTimeFlow(data, {
      onSuccess: () => {
        refetch();
        setStartTime(null);
        setEndTime(null);
      },
    });
  };

  const groupedOwnData = useMemo(() => {
    if (!dataLeaveTimeFlow?.own_logs) return [];

    const sortedData = [...dataLeaveTimeFlow.own_logs].sort(
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
  }, [dataLeaveTimeFlow?.own_logs]);

  const groupedOtherData = useMemo(() => {
    if (!dataLeaveTimeFlow?.other_logs) return [];

    const sortedData = [...dataLeaveTimeFlow.other_logs].sort(
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
  }, [dataLeaveTimeFlow?.other_logs]);

  return (
    <>
      <div className="w-[80%] mx-auto shadow-lg bg-white rounded-3xl relative p-8 flex flex-col mb-[100px] border border-gray-300 hover:shadow-xl transition-shadow duration-300">
        <div className="flex flex-row gap-6 items-center justify-center mr-10">
          <label className="text-sm font-medium text-gray-700 flex items-center">
            ساعت خروج
          </label>
          <DatePicker
            format="DD/MM/YYYY HH:mm"
            plugins={[<TimePicker position="bottom" />]}
            calendar={persian}
            locale={persian_fa}
            calendarPosition="bottom-right"
            style={{
              width: "100%",
              minWidth: "250px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "20px",
            }}
            onChange={(date) => setStartTime(date)}
          />
          <label className="text-sm font-medium text-gray-700 flex items-center">
            ساعت ورود
          </label>
          <DatePicker
            format="DD/MM/YYYY HH:mm"
            plugins={[<TimePicker position="bottom" />]}
            calendar={persian}
            locale={persian_fa}
            calendarPosition="bottom-right"
            style={{
              width: "100%",
              minWidth: "250px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "20px",
            }}
            onChange={(date) => setEndTime(date)}
          />
          <div className="flex-grow" />
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-8 py-2 rounded-md"
          >
            ثبت
          </button>
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
                مرخصی‌های من
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {groupedOwnData.length > 0 ? (
                <div className="space-y-4">
                  {groupedOwnData.map(({ startItem, endItem }, index) => (
                    <div
                      key={startItem.id}
                      className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="space-y-2">
                        <div>
                          <span className="font-medium text-gray-700 ml-2">
                            ساعت ورود:
                          </span>
                          <span className="text-gray-600">
                            {moment(startItem.time_user).format(
                              "DD/MM/YYYY HH:mm"
                            )}
                          </span>
                        </div>
                        {endItem && (
                          <div>
                            <span className="font-medium text-gray-700 ml-2">
                              ساعت خروج:
                            </span>
                            <span className="text-gray-600">
                              {moment(endItem.time_user).format(
                                "DD/MM/YYYY HH:mm"
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
                  مرخصی‌های زیرمجموعه
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
                              ساعت خروج
                            </label>
                            <DatePicker
                              format="DD/MM/YYYY HH:mm"
                              plugins={[<TimePicker position="bottom" />]}
                              calendar={persian}
                              locale={persian_fa}
                              calendarPosition="bottom-right"
                              style={{
                                width: "100%",
                                minWidth: "250px",
                                border: "1px solid #ccc",
                                borderRadius: "8px",
                                padding: "20px",
                              }}
                              onChange={(date) => setStartTime(date)}
                              value={moment(startItem.time_user).format(
                                "DD/MM/YYYY HH:mm"
                              )}
                            />
                          </div>
                          {endItem && (
                            <div>
                              <label className="text-sm font-medium text-gray-700 flex items-center">
                                ساعت ورود
                              </label>
                              <DatePicker
                                format="DD/MM/YYYY HH:mm"
                                plugins={[<TimePicker position="bottom" />]}
                                calendar={persian}
                                locale={persian_fa}
                                calendarPosition="bottom-right"
                                style={{
                                  width: "100%",
                                  minWidth: "250px",
                                  border: "1px solid #ccc",
                                  borderRadius: "8px",
                                  padding: "20px",
                                }}
                                onChange={(date) => setStartTime(date)}
                                value={moment(endItem.time_user).format(
                                  "DD/MM/YYYY HH:mm"
                                )}
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
                                updateLeaveTimeFlow(
                                  {
                                    id: startItem.id,
                                    data: {
                                      time_user_start: startItem.time_user,
                                      time_user_end: endItem?.time_user || null,
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
                              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                            >
                              تایید
                            </button>
                          </>
                        ) : (
                          <Chip
                            label="تایید شده"
                            style={{
                              backgroundColor: "green",
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

export default LeaveTimeFlow;

import moment from "moment-jalaali";
import { DateSelector, Toast } from "../../../components";
import { useTimeflow } from "../hooks";
import { useLeaveStore } from "../store";
import toast, { ErrorIcon } from "react-hot-toast";
import { ErrorResponse } from "../../../types";
import { AxiosError } from "axios";
import { LeavePostType } from "../types";

const LeaveCreate = ({ refetch }: { refetch: () => void }) => {
  const { startTime, endTime, setStartTime, setEndTime } = useLeaveStore();
  const { mutate: createLeaveTimeFlow } = useTimeflow.useCreateLeave();

  const handleSubmit = () => {
    const payload: LeavePostType = {
      time_user_start: startTime ? moment(startTime).toISOString() : null,
      time_user_end: endTime ? moment(endTime).toISOString() : null,
    };

    createLeaveTimeFlow(payload, {
      onSuccess: () => {
        refetch();
        setStartTime(null);
        setEndTime(null);
        toast.success("مرخصی با موفقیت ثبت شد");
      },
      onError: (error: AxiosError<unknown>) => {
        const errorMessage = (error.response?.data as ErrorResponse)?.error;
        Toast(errorMessage || "خطایی رخ داده است", <ErrorIcon />, "bg-red-500");
      },
    });
  };

  return (
    <>
      <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 text-center">
        ثبت مرخصی
      </h2>

      <div className="flex flex-col space-y-6 p-4 sm:p-6 shadow-lg border border-gray-300 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1fr,1fr,auto] gap-6">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">
              ساعت و تاریخ خروج
            </label>
            <DateSelector
              value={startTime ? moment(startTime).toDate() : null}
              onChange={(value) => {
                console.log("Selected Start Time:", value);
                setStartTime(
                  Array.isArray(value)
                    ? null
                    : value instanceof Date
                    ? value
                    : value
                    ? value.toDate()
                    : null
                );
              }}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">
              ساعت و تاریخ ورود
            </label>
            <DateSelector
              value={endTime ? moment(endTime).toDate() : null}
              onChange={(value) => {
                console.log("Selected End Time:", value);
                setEndTime(
                  Array.isArray(value)
                    ? null
                    : value instanceof Date
                    ? value
                    : value
                    ? value.toDate()
                    : null
                );
              }}
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={handleSubmit}
              className="w-full xl:w-auto bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-[1.02] active:scale-[0.98] h-[42px] font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ثبت مرخصی
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeaveCreate;

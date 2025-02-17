import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import useVerify from "../hooks/useVerify";
import "moment/locale/fa";
import { VerifyType } from "../types/verify.type";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import DatePicker from "react-multi-date-picker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Dayjs } from "dayjs";
import { Chip, Stack } from "@mui/material";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";

const TimeflowVerify = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [approvedIds, setApprovedIds] = useState<number[]>([]);
  const [entryTime, setEntryTime] = useState<Dayjs | null>(null);
  const [date, setDate] = useState<string>("");
  const [selectedChip, setSelectedChip] = useState<string>("ورود");
  const { mutate: verify } = useVerify.usePostVerify();
  const { data: verifyData, refetch, isError } = useVerify.useGetVerify();


  useEffect(() => {
    return () => {
      setApprovedIds([]);
    };
  }, []);

  useEffect(() => {
    if (verifyData) {
      const hasUnapprovedLogin = verifyData.login?.some(
        (item: VerifyType) =>
          item.self_status !== "approved" && item.self_status !== "rejected"
      );

      const hasUnapprovedLogout = verifyData.logout?.some(
        (item: VerifyType) =>
          item.self_status !== "approved" && item.self_status !== "rejected"
      );

      setIsVisible(hasUnapprovedLogin || hasUnapprovedLogout);
    }
  }, [verifyData]);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        refetch();
      }, 5 * 60 * 1000);

      return () => clearInterval(interval);
    }
  }, [isVisible, refetch]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isVisible) return;
      if (e.key === "Enter") {
        const firstPendingItem =
          verifyData?.login?.find(
            (item: VerifyType) => !approvedIds.includes(item.id)
          ) ||
          verifyData?.logout?.find(
            (item: VerifyType) => !approvedIds.includes(item.id)
          );
        if (firstPendingItem) handleVerify(firstPendingItem.id);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isVisible, verifyData, approvedIds]);

  if (isError) {
    return (
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-white p-4 rounded-lg text-red-600">
          خطا در دریافت اطلاعات. لطفا صفحه را رفرش کنید.
        </div>
      </div>
    );
  }

  const handleVerify = (id: number) => {
    if (id) {
      verify(
        { id, data: { self_status: "approved" } },
        {
          onSuccess: (response) => {
            setApprovedIds((prev) => [...prev, id]);
            const remainingLogins = verifyData?.login?.filter(
              (item: VerifyType) => item.id !== id
            );
            const remainingLogouts = verifyData?.logout?.filter(
              (item: VerifyType) => item.id !== id
            );

            if (!remainingLogins?.length && !remainingLogouts?.length) {
              setIsVisible(false);
            }
            toast.success(response.message);
            refetch();
          },
          onError: () => {
            toast.error("خطایی در تایید رخ داده است");
            refetch();
          },
          onSettled: () => {},
        }
      );
    }
  };

  const handleSubmit = () => {
    setEntryTime(null);
    setDate("");
  };

  return (
    <div className="min-h-screen relative ">
      <div className="container mx-auto px-4 py-8 relative">
        <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl p-6 mb-8">
          <p className="text-lg text-center text-gray-800 mb-6">
            لطفا ورود و خروج را ثبت کنید
          </p>

          <div className="mb-6 p-6 border border-gray-300 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-6 justify-between">
              <Stack direction="row" spacing={2}>
                <Chip
                  label="ورود"
                  variant={selectedChip === "ورود" ? "filled" : "outlined"}
                  onClick={() => setSelectedChip("ورود")}
                  className={
                    selectedChip === "ورود"
                      ? "bg-green-500 text-white hover:bg-green-600 shadow-md transform transition-all duration-200 hover:scale-105"
                      : "text-green-500 border-green-500 hover:bg-green-50 shadow-sm transform transition-all duration-200 hover:scale-105"
                  }
                  style={{ padding: "12px 20px", fontSize: "16px" }} // افزایش سایز چیپ
                />
                <Chip
                  label="خروج"
                  variant={selectedChip === "خروج" ? "filled" : "outlined"}
                  onClick={() => setSelectedChip("خروج")}
                  className={
                    selectedChip === "خروج"
                      ? "bg-red-500 text-white hover:bg-red-600 shadow-md transform transition-all duration-200 hover:scale-105"
                      : "text-red-500 border-red-500 hover:bg-red-50 shadow-sm transform transition-all duration-200 hover:scale-105"
                  }
                  style={{ padding: "12px 20px", fontSize: "16px" }}
                />
              </Stack>

              <div className="flex items-center ">
                <DatePicker
                  placeholder="تاریخ"
                  value={date}
                  onChange={(date) => setDate(date?.toString() || "")}
                  calendar={persian}
                  locale={persian_fa}
                  calendarPosition="bottom-right"
                  className="border-2 border-gray-300 w-96 text-center bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
                  inputClass="text-lg p-2 rounded-lg "
                  containerClassName="w-full border border-gray-400 "
                />
              </div>

              <div className="flex items-center gap-4">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="ساعت "
                    value={entryTime}
                    onChange={setEntryTime}
                    className="w-48 bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
                    viewRenderers={{
                      hours: renderTimeViewClock,
                      minutes: renderTimeViewClock,
                      seconds: renderTimeViewClock,
                    }}
                  />
                </LocalizationProvider>
              </div>
              <button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                ثبت
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeflowVerify;
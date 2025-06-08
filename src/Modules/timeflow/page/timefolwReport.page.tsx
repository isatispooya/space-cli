import { mali } from "@/assets";
import { useTimeflow } from "../hooks";
import moment from "moment-jalaali";
import "../styles/timesheet.css";
import {
  UsersTimeflowType,
  UserDetailType,
  PersonalInfoItemType,
  WorkSummaryType,
  TimeflowRecordType,
} from "../types";
import { LoaderLg } from "@/components";

const getTableSizeClass = (recordCount: number): string => {
  if (recordCount < 10) return "record-size-xs";
  if (recordCount < 20) return "record-size-sm";
  if (recordCount < 40) return "record-size-md";
  if (recordCount < 60) return "record-size-lg";
  return "record-size-xl";
};

const formatTimeflowData = (
  timeflowData: UsersTimeflowType[]
): TimeflowRecordType[] => {
  return timeflowData.map((item) => ({
    id: item.id,
    date: moment(item.date.time_parent).format("jYYYY/jMM/jDD"),
    timeIn: moment(item.time_start, "HH:mm:ss").format("HH:mm"),
    timeOut: moment(item.time_end, "HH:mm:ss").format("HH:mm"),
    type: item.type === "no_shift" ? "غیبت" : "حضور",
    notes: "",
  }));
};

const getPersonalInfo = (
  userDetail: UserDetailType | undefined
): PersonalInfoItemType[] => {
  if (!userDetail) return [];

  return [
    { label: "نام", value: userDetail.first_name },
    { label: "نام خانوادگی", value: userDetail.last_name },
    { label: "کد ملی", value: userDetail.uniqueIdentifier },
  ];
};

const getWorkSummary = (): WorkSummaryType => ({
  month: moment().format("MMMM YYYY"),
  dutyHours: "0 ساعت",
  workedHours: "0 ساعت",
  missionHours: "0 ساعت",
  leaveHours: "0 ساعت",
  absenceHours: "0 ساعت",
});

const Timesheet = () => {
  const {
    data: timeflowData,
    isLoading,
    refetch,
  } = useTimeflow.useGetTimeflow();

  const { data: timeflowReportData } = useTimeflow.useGetTimeFlowReport();

  console.log(timeflowReportData, "1223343435");

  const userDetail = timeflowData?.[0]?.user_detail;
  const personalInfo = getPersonalInfo(userDetail);
  const workSummary = getWorkSummary();
  const formattedTimeflowData = formatTimeflowData(timeflowData || []);
  const tableSizeClass = getTableSizeClass(formattedTimeflowData.length);

  if (isLoading) {
    return <LoaderLg />;
  }

  return (
    <div className="container mx-auto p-4 font-sans print:bg-white print:p-0">
      <div className="print-container bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <img
          src={mali}
          alt="لوگوی شرکت"
          className="hidden print:block watermark-logo"
        />

        <div className="flex flex-col md:flex-row gap-6 print-columns">
          <div className="w-full md:w-3/5 print:w-3/5 order-2 print:order-1">
            <h1 className="text-2xl font-bold mb-4 text-[#02205F] print:text-xs print:mb-1 print:text-black">
              تایم‌شیت کارمندان
            </h1>
            <div className="shadow-lg rounded-lg bg-white overflow-hidden print:shadow-none print:rounded-none">
              <table
                className={`w-full text-sm text-right print:text-[6px] print:border print:border-gray-500 print:table-fixed ${tableSizeClass}`}
              >
                <thead className="bg-[#02205F] text-white font-medium print:bg-gray-200 print:text-black">
                  <tr>
                    <th className="px-4 py-3 print:px-0.5 print:py-0.5">
                      ردیف
                    </th>
                    <th className="px-4 py-3 print:px-0.5 print:py-0.5">
                      تاریخ
                    </th>
                    <th className="px-4 py-3 print:px-0.5 print:py-0.5">
                      ورود
                    </th>
                    <th className="px-4 py-3 print:px-0.5 print:py-0.5">
                      خروج
                    </th>
                    <th className="px-4 py-3 print:px-0.5 print:py-0.5">نوع</th>
                    <th className="px-4 py-3 print:px-0.5 print:py-0.5 hidden print:table-cell">
                      توضیحات
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {formattedTimeflowData.length > 0 ? (
                    formattedTimeflowData.map((row, rowIndex) => (
                      <tr
                        key={row.id}
                        className={`border-b border-gray-200 print:border-gray-200 print:h-[6px] ${
                          rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
                        }`}
                      >
                        <td className="px-4 py-3 print:px-0.5 print:py-0.2">
                          {rowIndex + 1}
                        </td>
                        <td className="px-4 py-3 print:px-0.5 print:py-0.2">
                          {row.date}
                        </td>
                        <td className="px-4 py-3 print:px-0.5 print:py-0.2">
                          {row.timeIn}
                        </td>
                        <td className="px-4 py-3 print:px-0.5 print:py-0.2">
                          {row.timeOut}
                        </td>
                        <td className="px-4 py-3 print:px-0.5 print:py-0.2 print:text-center">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              row.type === "حضور"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-red-100 text-red-800"
                            } print:bg-transparent print:p-0`}
                          >
                            {row.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 print:px-0.5 print:py-0.2 hidden print:table-cell">
                          <div className="bg-white border border-gray-200 rounded-sm h-6 w-full print:h-2"></div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="border-b border-gray-200 print:border-gray-200 print:h-[6px]">
                      <td
                        colSpan={6}
                        className="px-4 py-3 print:px-0.5 print:py-0.2 text-center"
                      >
                        داده‌ای برای نمایش وجود ندارد
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="w-full md:w-2/5 flex flex-col gap-4 print:gap-3 print:w-2/5 order-1 print:order-2">
            <div className="mb-4 flex justify-center print:mb-2 avatar-container">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#02205F] shadow-md print:border-gray-500 print:rounded-lg avatar">
                <img
                  src={mali}
                  alt="پروفایل"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-md border-l-4 border-[#02205F] print:p-0 print:border-gray-500 print:rounded-lg profile-box">
              <h2 className="text-lg font-bold mb-3 text-[#02205F] border-b pb-2 print:text-xs print:font-semibold print:text-black print:mb-0">
                اطلاعات شخص
              </h2>
              <ul className="space-y-2 text-sm print:space-y-0 print:text-xs print:text-black w-full">
                {personalInfo.map((field, index) => (
                  <li
                    key={index}
                    className="flex justify-between border-b border-gray-100 pb-2 print:border-b print:border-gray-300 print:pb-0.5"
                  >
                    <span className="text-gray-600">{field.label}</span>
                    <span className="font-medium text-gray-800">
                      {field.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-md border-l-4 border-[#02205F] print:p-0 print:border-gray-500 print:rounded-lg summary-box">
              <h3 className="text-lg font-bold mb-3 text-[#02205F] border-b pb-2 print:text-xs print:font-semibold print:text-black print:mb-0">
                مجموع کارکرد
              </h3>
              <ul className="space-y-2 text-sm print:space-y-0 print:text-xs print:text-black">
                {Object.entries(workSummary).map(([key, value]) => (
                  <li
                    key={key}
                    className="flex justify-between border-b border-gray-100 pb-2 print:border-b print:border-gray-300 print:pb-0.5"
                  >
                    <span className="text-gray-600">
                      {key === "month"
                        ? "ماه"
                        : key === "dutyHours"
                        ? "موظفی"
                        : key === "workedHours"
                        ? "کارکرد"
                        : key === "missionHours"
                        ? "ماموریت"
                        : key === "leaveHours"
                        ? "مرخصی"
                        : "غیبت"}
                    </span>
                    <span className="font-medium text-gray-800">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-md border-l-4 border-[#02205F] hidden print:block print:p-0 print:border-gray-500 print:rounded-lg signature-box">
              <h3 className="text-lg font-bold mb-3 text-[#02205F] border-b pb-2 print:text-xs print:font-semibold print:text-black print:mb-0">
                امضا
              </h3>
              <div className="space-y-3 text-sm print:space-y-0.5 print:text-xs print:text-black">
                {["امضای کارمند", "امزای مدیر", "تنظیم‌کننده"].map((label) => (
                  <div
                    key={label}
                    className="flex justify-between items-center border-b border-gray-100 pb-2 print:pb-0.5 print:border-b-0"
                  >
                    <span className="text-gray-600">{label}:</span>
                  </div>
                ))}
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">تاریخ:</span>
                  <span className="font-medium text-gray-800">
                    {new Date().toLocaleDateString("fa-IR")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timesheet;

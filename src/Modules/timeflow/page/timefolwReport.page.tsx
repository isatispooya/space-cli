/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import waterMark from "../../../../public/Artboard 1 copy 17.png";
import { useTimeflow } from "../hooks";
import moment from "moment-jalaali";
import "../styles/timesheet.css";
import { server } from "@/api";

interface TimeflowDetail {
  user_id: number;
  limit_time: number;
  working: number;
  mission: number;
  leave: number;
  absence: number;
  user_detail: {
    id: number;
    first_name: string;
    last_name: string;
    uniqueIdentifier: string;
    mobile?: string;
    profile_image?: string;
  };
}

const Timesheet = () => {
  const { id } = useParams<{ id: string }>();

  const { data: userData } = useTimeflow.useGetTimeflow();
  const { data: timeflowDetails } = useTimeflow.useGetTimeflowDetails(2025, 3);

  const userDetail = timeflowDetails?.find(
    (item: any) => (item as TimeflowDetail).user_id.toString() === id
  ) as TimeflowDetail | undefined;

  const userTimeflowData =
    userData?.filter((item) => item.user_id.toString() === id) || [];

  const formattedTimeflowData = userTimeflowData.map((item, index) => ({
    id: index + 1,
    date: moment(item.date).format("jYYYY/jMM/jDD"),
    timeIn: moment(item.time_start, "HH:mm:ss").format("HH:mm"),
    timeOut: moment(item.time_end, "HH:mm:ss").format("HH:mm"),
    type: item.type === "working" ? "حضور" : "غیبت",
    notes: "",
    rawData: item,
  }));

  const personalInfo = userDetail
    ? [
        { label: "نام", value: userDetail.user_detail.first_name },
        { label: "نام خانوادگی", value: userDetail.user_detail.last_name },
        { label: "کد ملی", value: userDetail.user_detail.uniqueIdentifier },

        { label: "شماره تماس", value: userDetail.user_detail.mobile },
      ]
    : [];

  // اطلاعات مجموع کارکرد
  const workSummary = userDetail
    ? {
        month: "اسفند 1403",
        dutyHours: `${userDetail.limit_time} ساعت`,
        workedHours: `${userDetail.working} ساعت`,
        missionHours: `${userDetail.mission} ساعت`,
        leaveHours: `${userDetail.leave} ساعت`,
        absenceHours: `${userDetail.absence} ساعت`,
      }
    : {
        month: "",
        dutyHours: "",
        workedHours: "",
        missionHours: "",
        leaveHours: "",
        absenceHours: "",
      };

  const getTableSizeClass = (recordCount: number): string => {
    if (recordCount < 10) {
      return "record-size-xs";
    } else if (recordCount < 20) {
      return "record-size-sm";
    } else if (recordCount < 40) {
      return "record-size-md";
    } else if (recordCount < 60) {
      return "record-size-lg";
    } else {
      return "record-size-xl";
    }
  };

  const tableSizeClass = getTableSizeClass(formattedTimeflowData.length);

  return (
    <div className="container mx-auto p-1 font-sans bg-gradient-to-br from-[#5677BC]/10 to-[#7DE7DC]/10 print:bg-white print:p-0">
      <style type="text/css" media="print">
        {`
          /* تنظیمات پایه برای تمام مرورگرها */
          @page {
            size: A4;
            margin: 0 !important;
          }
          
          /* تنظیمات فایرفاکس */
          @-moz-document url-prefix() {
            @page {
              margin: 0 !important;
            }
            
            @page :first {
              margin-top: 0 !important;
            }
            
            @page :left {
              margin-left: 0 !important;
              margin-right: 0 !important;
            }
            
            @page :right {
              margin-left: 0 !important;
              margin-right: 0 !important;
            }
          }
          
          /* حذف هدر و فوتر در تمام مرورگرها */
          html, body {
            width: 210mm;
            height: 297mm;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden;
          }
          
          /* حذف هدر و فوتر در فایرفاکس */
          body::before, body::after {
            content: none !important;
          }
          
          /* حذف خودکار URL */
          html {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          
          /* حذف URL و شماره صفحه در مرورگرها */
          @page :left {
            margin-left: 0;
          }
          @page :right {
            margin-right: 0;
          }
          @page :first {
            margin-top: 0;
          }
          
          /* پنهان کردن هدر و فوتر در فایرفاکس */
          #header, #footer, .header, .footer, header, footer {
            display: none !important;
          }
          
          /* تنظیم کادر اصلی برای پوشش کل صفحه بدون حاشیه */
          .print-container {
            position: absolute;
            top: 10mm;
            left: 10mm;
            right: 10mm;
            bottom: 10mm;
            border: 1px solid #333333 !important;
            border-radius: 15mm;
            padding: 10mm;
            margin: 0;
            background-color: white !important;
            box-sizing: border-box;
          }
          
          /* حذف کامل همه رنگ‌های گرادیان و پس‌زمینه */
          .profile-box, .summary-box, .signature-box {
            background: none !important;
            background-color: white !important;
            background-image: none !important;
            border: 1px solid #333333 !important;
            border-radius: 8mm !important;
            box-shadow: none !important;
            margin-bottom: 5mm !important;
          }
          
          /* تنظیم هدر باکس‌ها به حالت خنثی */
          .profile-box h2, .summary-box h3, .signature-box h3 {
            background: none !important;
            background-color: #f0f0f0 !important;
            background-image: none !important;
            color: black !important;
            border-bottom: 1px solid #333333 !important;
          }
          
          /* همه متن‌ها سیاه باشند */
          .profile-box *, .summary-box *, .signature-box *, table * {
            color: black !important;
            background-image: none !important;
          }
          
          /* اطمینان از اینکه گرادیان‌ها کار نمی‌کنند */
          [class*="bg-gradient"], [class*="from-"], [class*="to-"], [class*="via-"] {
            background: none !important;
            background-color: white !important;
            background-image: none !important;
          }
          
          /* تنظیم جدول */
          table {
            border: 1px solid #333333 !important;
          }
          
          th {
            background: none !important;
            background-color: #f0f0f0 !important;
            color: black !important;
            border: 1px solid #cccccc !important;
          }
          
          td {
            background: none !important;
            background-color: white !important;
            border: 1px solid #cccccc !important;
            color: black !important;
          }
          
          tr:nth-child(even) {
            background-color: #f5f5f5 !important;
          }
          
          /* تنظیم عکس پروفایل */
          .avatar {
            border: 1px solid #333333 !important;
            box-shadow: none !important;
          }
          
          /* اعمال سایه خنثی به همه عناصر */
          * {
            box-shadow: none !important;
          }
        `}
      </style>

      <div className="print-container">
        {/* واترمارک لوگو */}
        <img
          src={waterMark}
          alt="لوگوی شرکت"
          className="hidden print:block watermark-logo"
        />

        <div className="flex flex-row gap-0 print-columns">
          {/* بخش جدول تایم‌شیت */}
          <div className="w-full md:w-3/5 print:w-3/5">
            <h1 className="text-sm font-semibold mb-1 text-gray-800 print:text-xs print:mb-1 print:text-black">
              تایم‌شیت کارمندان
            </h1>
            <div className="shadow-sm rounded-lg bg-white print:shadow-none print:rounded-none">
              <table
                className={`w-full text-[7px] text-right print:text-[6px] print:border print:border-gray-500 print:table-fixed ${tableSizeClass}`}
              >
                <thead className="bg-gradient-to-r from-[#5677BC]/50 to-[#7DE7DC]/50 text-white font-medium print:bg-gray-200 print:text-black">
                  <tr>
                    <th className="px-0.2 py-0.2 print:px-0.5 print:py-0.5">
                      ردیف
                    </th>
                    <th className="px-0.2 py-0.2 print:px-0.5 print:py-0.5">
                      تاریخ
                    </th>
                    <th className="px-0.2 py-0.2 print:px-0.5 print:py-0.5">
                      ورود
                    </th>
                    <th className="px-0.2 py-0.2 print:px-0.5 print:py-0.5">
                      خروج
                    </th>
                    <th className="px-0.2 py-0.2 print:px-0.5 print:py-0.5">
                      نوع
                    </th>
                    <th className="px-0.2 py-0.2 print:px-0.5 print:py-0.5">
                      توضیحات
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {formattedTimeflowData.length > 0 ? (
                    formattedTimeflowData.map((row, rowIndex) => (
                      <tr
                        key={row.id}
                        className="border-b border-gray-200 print:border-gray-200 print:h-[6px]"
                      >
                        <td className="px-0.2 py-0.1 print:px-0.5 print:py-0.2">
                          {rowIndex + 1}
                        </td>
                        <td className="px-0.2 py-0.1 print:px-0.5 print:py-0.2">
                          {row.date}
                        </td>
                        <td className="px-0.2 py-0.1 print:px-0.5 print:py-0.2">
                          {row.timeIn}
                        </td>
                        <td className="px-0.2 py-0.1 print:px-0.5 print:py-0.2">
                          {row.timeOut}
                        </td>
                        <td className="px-0.2 py-0.1 print:px-0.5 print:py-0.2">
                          {row.type}
                        </td>
                        <td className="px-0.2 py-0.1 print:px-0.5 print:py-0.2">
                          <div className="bg-white border border-gray-200 rounded-sm h-3 w-full print:h-2"></div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="border-b border-gray-200 print:border-gray-200 print:h-[6px]">
                      <td
                        colSpan={6}
                        className="px-0.2 py-0.1 print:px-0.5 print:py-0.2 text-center"
                      >
                        داده‌ای برای نمایش وجود ندارد
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* بخش اطلاعات کاربر */}
          <div className="w-full md:w-2/5 flex flex-col gap-0.5 print:gap-3 print:w-2/5">
            {/* عکس پروفایل */}
            <div className="mb-0.5 flex justify-center print:mb-2 avatar-container">
              <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-200 print:border-gray-500 avatar">
                <img
                  src={server + userDetail?.user_detail?.profile_image}
                  alt="پروفایل"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* باکس پروفایل کاربر */}
            <div className="p-0.5 bg-gradient-to-br from-[#5677BC] to-[#7DE7DC] rounded-lg shadow-sm border border-gray-200 print:p-0 print:border-gray-500 print:rounded-lg profile-box">
              <h2 className="text-xs font-semibold mb-0.5 text-white print:text-xs print:font-semibold print:text-black print:mb-0">
                اطلاعات شخص
              </h2>
              <ul className="space-y-0.5 text-xs print:space-y-0 print:text-xs print:text-black w-full">
                {personalInfo.map((field, index) => (
                  <li
                    key={index}
                    className="flex justify-between border-b border-white/50 pb-0.5 print:border-b print:border-gray-300 print:pb-0.5"
                  >
                    <span>{field.label}</span>
                    <span className="font-medium">{field.value}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* باکس مجموع کارکرد - تغییر رنگ‌ها به حالت خنثی */}
            <div className="p-0.5 bg-gradient-to-br from-[#5677BC] to-[#7DE7DC] rounded-lg shadow-sm border border-gray-200 print:p-0 print:border-gray-500 print:rounded-lg summary-box">
              <h3 className="text-xs font-semibold mb-0.5 text-white print:text-xs print:font-semibold print:text-black print:mb-0">
                مجموع کارکرد
              </h3>
              <ul className="space-y-0.5 text-xs print:space-y-0 print:text-xs print:text-black">
                <li className="flex justify-between border-b border-white/50 pb-0.5 print:border-b print:border-gray-300 print:pb-0.5">
                  <span>ماه</span>
                  <span className="font-medium">{workSummary.month}</span>
                </li>
                <li className="flex justify-between border-b border-white/50 pb-0.5 print:border-b print:border-gray-300 print:pb-0.5">
                  <span>موظفی</span>
                  <span className="font-medium">{workSummary.dutyHours}</span>
                </li>
                <li className="flex justify-between border-b border-white/50 pb-0.5 print:border-b print:border-gray-300 print:pb-0.5">
                  <span>کارکرد</span>
                  <span className="font-medium">{workSummary.workedHours}</span>
                </li>
                <li className="flex justify-between border-b border-white/50 pb-0.5 print:border-b print:border-gray-300 print:pb-0.5">
                  <span>ماموریت</span>
                  <span className="font-medium">
                    {workSummary.missionHours}
                  </span>
                </li>
                <li className="flex justify-between border-b border-white/50 pb-0.5 print:border-b print:border-gray-300 print:pb-0.5">
                  <span>مرخصی</span>
                  <span className="font-medium">{workSummary.leaveHours}</span>
                </li>
                <li className="flex justify-between border-b border-white/50 pb-0.5 print:border-b print:border-gray-300 print:pb-0.5">
                  <span>غیبت</span>
                  <span className="font-medium">
                    {workSummary.absenceHours}
                  </span>
                </li>
              </ul>
            </div>

            {/* باکس امضا - تغییر رنگ‌ها به حالت خنثی */}
            <div className="p-0.5 bg-gradient-to-br from-[#5677BC] to-[#7DE7DC] rounded-lg shadow-sm border border-gray-200 print:p-0 print:border-gray-500 print:rounded-lg signature-box">
              <h3 className="text-xs font-semibold mb-0.5 text-white print:text-xs print:font-semibold print:text-black print:mb-0">
                امضا
              </h3>
              <div className="space-y-0.5 text-xs print:space-y-2 print:text-xs print:text-black">
                <div className="flex justify-between items-center">
                  <span>امضای کارمند:</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>امزای مدیر:</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>تنظیم‌کننده:</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>تاریخ:</span>
                  <span className="font-medium">
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

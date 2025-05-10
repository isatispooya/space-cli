/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { mali } from "@/assets"; 
import { useTimeflow } from "../hooks";
import moment from "moment-jalaali";
import "../styles/timesheet.css";
import { server } from "@/api";

interface TimeflowDetailType {
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
    (item: any) => (item as TimeflowDetailType).user_id.toString() === id
  ) as TimeflowDetailType | undefined;

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
    <div className="container mx-auto p-4 font-sans  print:bg-white print:p-0">
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
          
          /* تغییر ساختار به حالت افقی در چاپ و ایجاد فاصله بین ستون‌ها */
          .print-columns {
            display: flex !important;
            flex-direction: row !important;
            gap: 5mm !important;
            justify-content: space-between !important;
          }
          
          /* تنظیم عرض ستون‌های جدول */
          .print-columns > div:first-child {
            width: 62% !important;
          }
          
          .print-columns > div:last-child {
            width: 35% !important;
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
            padding: 0 !important;
          }
          
          /* تنظیم هدر باکس‌ها به حالت خنثی */
          .profile-box h2, .summary-box h3, .signature-box h3 {
            background: none !important;
            background-color: #f0f0f0 !important;
            background-image: none !important;
            color: black !important;
            border-bottom: 1px solid #333333 !important;
            font-size: 0.75rem !important;
            margin-bottom: 0 !important;
            padding: 2px !important;
          }
          
          /* همه متن‌ها سیاه باشند */
          .profile-box *, .summary-box *, .signature-box *, table * {
            color: black !important;
            background-image: none !important;
            font-size: 0.65rem !important;
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
            font-size: 0.5rem !important;
            table-layout: fixed !important;
            width: 100% !important;
          }
          
          /* تنظیم عرض ستون‌های جدول */
          th:first-child, td:first-child {
            width: 5% !important;
          }
          
          th:nth-child(2), td:nth-child(2) {
            width: 20% !important;
          }
          
          th:nth-child(3), td:nth-child(3),
          th:nth-child(4), td:nth-child(4) {
            width: 15% !important;
          }
          
          th:nth-child(5), td:nth-child(5) {
            width: 15% !important;
          }
          
          th:nth-child(6), td:nth-child(6) {
            width: 30% !important;
          }
          
          th {
            background: none !important;
            background-color: #f0f0f0 !important;
            color: black !important;
            border: 1px solid #cccccc !important;
            padding: 1px !important;
            font-size: 0.5rem !important;
          }
          
          td {
            background: none !important;
            background-color: white !important;
            border: 1px solid #cccccc !important;
            color: black !important;
            padding: 1px !important;
            font-size: 0.5rem !important;
          }
          
          tr:nth-child(even) {
            background-color: #f5f5f5 !important;
          }
          
          /* تنظیم عکس پروفایل */
          .avatar-container {
            margin-bottom: 5mm !important;
          }
          
          .avatar {
            width: 5rem !important;
            height: 5rem !important;
            border: 1px solid #333333 !important;
            box-shadow: none !important;
            border-radius: 0.5rem !important;
            overflow: hidden !important;
          }
          
          /* تنظیم عنوان صفحه */
          h1 {
            font-size: 0.75rem !important;
            margin-bottom: 2mm !important;
            color: black !important;
          }
          
          /* اعمال سایه خنثی به همه عناصر */
          * {
            box-shadow: none !important;
          }
          
          /* تنظیم فاصله بین آیتم‌ها */
          .space-y-2, .space-y-3 {
            margin-top: 0 !important;
            margin-bottom: 0 !important;
          }
          
          li {
            padding-bottom: 1px !important;
            border-bottom-width: 1px !important;
          }
          
          /* تنظیم بخش امضا */
          .signature-box div > div {
            margin-bottom: 2mm !important;
          }
          
          /* نمایش فقط متن در بخش امضا و حذف کادرهای خط‌چین */
          .signature-box div > div {
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            padding: 1mm 2mm !important;
          }
          
          /* پنهان کردن کادرهای خط‌چین در بخش امضا */
          .signature-box div > div > div {
            display: none !important;
          }
          
          /* تنظیم بخش توضیحات در جدول */
          td:last-child > div {
            height: 2mm !important;
            min-height: 2mm !important;
            border: none !important;
            background: transparent !important;
          }
        `}
      </style>

      <div className="print-container bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        {/* واترمارک لوگو */}
        <img
          src={mali}
          alt="لوگوی شرکت"
          className="hidden print:block watermark-logo"
        />

        <div className="flex flex-col md:flex-row gap-6 print-columns">
          {/* بخش جدول تایم‌شیت - تغییر ترتیب برای چاپ */}
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

          {/* بخش اطلاعات کاربر */}
          <div className="w-full md:w-2/5 flex flex-col gap-4 print:gap-3 print:w-2/5 order-1 print:order-2">
            {/* عکس پروفایل */}
            <div className="mb-4 flex justify-center print:mb-2 avatar-container">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#02205F] shadow-md print:border-gray-500 print:rounded-lg avatar">
                <img
                  src={server + userDetail?.user_detail?.profile_image}
                  alt="پروفایل"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* باکس پروفایل کاربر */}
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

            {/* باکس مجموع کارکرد */}
            <div className="p-4 bg-white rounded-lg shadow-md border-l-4 border-[#02205F] print:p-0 print:border-gray-500 print:rounded-lg summary-box">
              <h3 className="text-lg font-bold mb-3 text-[#02205F] border-b pb-2 print:text-xs print:font-semibold print:text-black print:mb-0">
                مجموع کارکرد
              </h3>
              <ul className="space-y-2 text-sm print:space-y-0 print:text-xs print:text-black">
                <li className="flex justify-between border-b border-gray-100 pb-2 print:border-b print:border-gray-300 print:pb-0.5">
                  <span className="text-gray-600">ماه</span>
                  <span className="font-medium text-gray-800">
                    {workSummary.month}
                  </span>
                </li>
                <li className="flex justify-between border-b border-gray-100 pb-2 print:border-b print:border-gray-300 print:pb-0.5">
                  <span className="text-gray-600">موظفی</span>
                  <span className="font-medium text-gray-800">
                    {workSummary.dutyHours}
                  </span>
                </li>
                <li className="flex justify-between border-b border-gray-100 pb-2 print:border-b print:border-gray-300 print:pb-0.5">
                  <span className="text-gray-600">کارکرد</span>
                  <span className="font-medium text-gray-800">
                    {workSummary.workedHours}
                  </span>
                </li>
                <li className="flex justify-between border-b border-gray-100 pb-2 print:border-b print:border-gray-300 print:pb-0.5">
                  <span className="text-gray-600">ماموریت</span>
                  <span className="font-medium text-gray-800">
                    {workSummary.missionHours}
                  </span>
                </li>
                <li className="flex justify-between border-b border-gray-100 pb-2 print:border-b print:border-gray-300 print:pb-0.5">
                  <span className="text-gray-600">مرخصی</span>
                  <span className="font-medium text-gray-800">
                    {workSummary.leaveHours}
                  </span>
                </li>
                <li className="flex justify-between border-b border-gray-100 pb-2 print:border-b print:border-gray-300 print:pb-0.5">
                  <span className="text-gray-600">غیبت</span>
                  <span className="font-medium text-gray-800">
                    {workSummary.absenceHours}
                  </span>
                </li>
              </ul>
            </div>

            {/* باکس امضا - فقط در چاپ نمایش داده شود */}
            <div className="p-4 bg-white rounded-lg shadow-md border-l-4 border-[#02205F] hidden print:block print:p-0 print:border-gray-500 print:rounded-lg signature-box">
              <h3 className="text-lg font-bold mb-3 text-[#02205F] border-b pb-2 print:text-xs print:font-semibold print:text-black print:mb-0">
                امضا
              </h3>
              <div className="space-y-3 text-sm print:space-y-0.5 print:text-xs print:text-black">
                <div className="flex justify-between items-center border-b border-gray-100 pb-2 print:pb-0.5 print:border-b-0">
                  <span className="text-gray-600">امضای کارمند:</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-2 print:pb-0.5 print:border-b-0">
                  <span className="text-gray-600">امزای مدیر:</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-2 print:pb-0.5 print:border-b-0">
                  <span className="text-gray-600">تنظیم‌کننده:</span>
                </div>
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

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTimeflow } from "../hooks";
import { LoaderLg, TabulatorTable } from "../../../components";
import { ColumnDefinition } from "tabulator-tables";
import moment from "moment-jalaali";
import { ExelData } from "../data";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import { useState } from "react";
import { DateObject } from "react-multi-date-picker";
import { useNavigate } from "react-router-dom";

// تعریف تایپ برای سلول جدول
type CellComponent = {
  getRow: () => { getData: () => any };
  getElement: () => HTMLElement;
};

const TimeflowDetails = () => {
  const [selectedDate, setSelectedDate] = useState(
    new DateObject({ calendar: persian, locale: persian_fa })
  );

  const { data, isLoading } = useTimeflow.useGetTimeflowDetails(
    selectedDate.year,
    selectedDate.month.number
  );

  const navigate = useNavigate();

  const handleDateChange = (date: DateObject | null) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const mappedData = data?.map((item: any) => ({
    ...item,
    date: moment(item.date).format("jYYYY/jMM/jDD"),
    time_start: `${moment(item.date).format("jYYYY/jMM/jDD")} ${moment(
      item.time_start,
      "HH:mm:ss"
    ).format("HH:mm")}`,
    time_end: `${moment(item.date).format("jYYYY/jMM/jDD")} ${moment(
      item.time_end,
      "HH:mm:ss"
    ).format("HH:mm")}`,
    type: item.type === "working" ? "زمان حضور" : " غیبت",
    user_id: item.user_id,
    first_name: item.user_detail.first_name,
    last_name: item.user_detail.last_name,
    uniqueIdentifier: item.user_detail.uniqueIdentifier,
  }));

  if (isLoading) {
    return <LoaderLg />;
  }

  // تابع بستن تمام منوهای باز
  const closeAllMenus = () => {
    const menus = document.querySelectorAll(".popup-menu");
    menus.forEach((menu) => menu.remove());
  };

  const columns = (): ColumnDefinition[] => [
    {
      title: "نام",
      field: "first_name",
      headerFilter: true,
    },
    {
      title: "نام خانوادگی",
      field: "last_name",
      headerFilter: true,
    },
    {
      title: "کد ملی",
      field: "uniqueIdentifier",
      headerFilter: true,
    },
    {
      title: "غیبت",
      field: "absence",
      headerFilter: true,
    },
    {
      title: "مرخصی",
      field: "leave",
      headerFilter: true,
    },
    {
      title: "موظفی",
      field: "limit_time",
      headerFilter: true,
    },
    {
      title: "ماموریت",
      field: "mission",
      headerFilter: true,
    },
    {
      title: "کاری",
      field: "working",
      headerFilter: true,
    },
    {
      title: "عملیات",
      formatter: () => {
        return '<button class="action-btn">⋮</button>';
      },
      hozAlign: "center",
      headerSort: false,
      width: 60,
      cellClick: function (e: Event, cell: CellComponent) {
        e.stopPropagation();

        // دریافت داده‌های سطر
        const rowData = cell.getRow().getData();

        // بستن منوهای باز
        closeAllMenus();

        // ایجاد منو
        const menu = document.createElement("div");
        menu.className = "popup-menu";
        menu.style.position = "absolute";
        menu.style.backgroundColor = "white";
        menu.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
        menu.style.borderRadius = "4px";
        menu.style.padding = "8px 0";
        menu.style.zIndex = "1000";

        // ایجاد دکمه پرینت
        const printButton = document.createElement("button");
        printButton.className = "menu-item";
        printButton.style.display = "flex";
        printButton.style.alignItems = "center";
        printButton.style.padding = "8px 16px";
        printButton.style.width = "100%";
        printButton.style.textAlign = "right";
        printButton.style.border = "none";
        printButton.style.background = "none";
        printButton.style.cursor = "pointer";
        printButton.innerHTML = `<i class="fas fa-print" style="color: #02205f; margin-left: 8px;"></i> پرینت`;

        // اضافه کردن رویداد کلیک به دکمه
        printButton.onclick = () => {
          navigate(`/timeflow-report/${rowData.user_id}`);
          closeAllMenus();
        };

        // اضافه کردن دکمه به منو
        menu.appendChild(printButton);

        // تنظیم موقعیت منو
        const rect = cell.getElement().getBoundingClientRect();
        menu.style.left = `${rect.left + window.scrollX}px`;
        menu.style.top = `${rect.bottom + window.scrollY}px`;

        // اضافه کردن منو به صفحه
        document.body.appendChild(menu);

        // بستن منو با اسکرول
        const handleScroll = () => {
          closeAllMenus();
          window.removeEventListener("scroll", handleScroll);
        };
        window.addEventListener("scroll", handleScroll);

        // بستن منو با کلیک خارج از منو
        setTimeout(() => {
          const closeMenu = (e: MouseEvent) => {
            if (!menu.contains(e.target as Node)) {
              closeAllMenus();
              document.removeEventListener("click", closeMenu);
              window.removeEventListener("scroll", handleScroll);
            }
          };
          document.addEventListener("click", closeMenu);
        }, 0);
      },
    },
  ];

  return (
    <>
      <div className="w-full bg-white shadow-xl rounded-3xl relative p-8 flex flex-col items-center mb-[100px]">
        <DatePicker
          onlyMonthPicker
          format="MMMM YYYY"
          calendar={persian}
          locale={persian_fa}
          calendarPosition="bottom-right"
          value={selectedDate}
          onChange={handleDateChange}
          style={{
            marginBottom: "1rem",
            border: "1px solid gray",
            borderRadius: "0.5rem",
            padding: "1.3rem",
            textAlign: "center",
            fontSize: "1.5rem",
            backgroundColor: "#f9fafb",
          }}
        />
        <div className="overflow-x-auto w-full">
          <TabulatorTable
            data={mappedData || []}
            columns={columns()}
            title="اطلاعات کاربران"
            showActions={true}
            formatExportData={ExelData}
          />
        </div>
      </div>
    </>
  );
};

export default TimeflowDetails;

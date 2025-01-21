import { useUserPro } from "../hooks";
import { TabulatorFull as Tabulator, ColumnDefinition } from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator.min.css";

import { TableStyles } from "../../../components/tabulator/tabularStyle";
import { useEffect, useRef } from "react";
import { LoaderLg } from "../../../components";
import { userProType } from "../types";


const UserProTable: React.FC = () => {
  const { data, isPending } = useUserPro();
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tableRef.current || !data) return;
    const table = new Tabulator(tableRef.current, {
      data: data.map((item: userProType) => ({
        first_name: item.first_name,
        last_name: item.last_name,
        national_code: item.uniqueIdentifier,
        phone_number: item.mobile,
        email: item.email,
        registration_number: item.refrence_number,
        gender: item.gender,
        birth_date: item.birth_date,
        place_of_birth: item.place_of_birth,
        age: item.age,
        city: item.address?.city,
        point_1: item.points.point_1,
        points_2: item.points.point_2,
      })),
      rowHeight: 40,
      layout: window.innerWidth <= 768 ? "fitDataTable" : "fitColumns",
      responsiveLayout: false,
      columns: columns(),
      pagination: true,
      paginationSize: 10,
      paginationSizeSelector: [10, 20, 100, 1000],
      paginationButtonCount: 5,
      paginationAddRow: "page",
      paginationMode: "local",
      selectable: 1,
      headerVisible: true,
      movableColumns: true,
      printAsHtml: true,
      printStyled: true,
      downloadConfig: {
        columnHeaders: true,
        columnGroups: false,
        rowGroups: false,
        columnCalcs: false,
        dataTree: false,
      },
      rowFormatter: (row) => {
        row.getElement().style.transition = "all 0.3s ease";
      },
    });

    table.on("tableBuilt", () => {
      console.log("Table fully built");
    });

    return () => {
      table.destroy();
    };
  }, [data]);

  if (isPending) return <LoaderLg />;

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
      field: "national_code",
      headerFilter: true,
    },
    {
      title: "شماره تماس",
      field: "phone_number",
      headerFilter: true,
    },
    {
      title: "سکه",
      field: "point_1",
      headerFilter: true,
      resizable: true,
    },
    {
      title: "بذر",
      field: "point_2",
      headerFilter: true,
      resizable: true,
    },
    {
      title: "ایمیل",
      field: "email",
      headerFilter: true,
    },
    {
      title: "شماره ثبت",
      field: "registration_number",
      headerFilter: true,
    },
    {
      title: "جنسیت",
      field: "gender",
      headerFilter: true,
      formatter: (cell) => (cell.getValue() === "M" ? "مرد" : "زن"),
    },
    {
      title: "تاریخ تولد",
      field: "birth_date",
      headerFilter: true,
    },
    {
      title: "محل تولد",
      field: "place_of_birth",
      headerFilter: true,
    },
    {
      title: "سن",
      field: "age",
      headerFilter: true,
    },
    {
      title: "شهر",
      field: "city",
      headerFilter: true,
    },
  ];

  return (
    <>
      <TableStyles />
      <div className="w-full bg-white shadow-xl rounded-3xl relative p-8 flex flex-col mb-[100px]">
        <div className="mb-8 flex items-center justify-between bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex gap-4">
            {/* <button
              onClick={handleDownloadExcel}
              disabled={isPending}
              className={`bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl text-sm font-medium flex items-center gap-3 transition-all duration-300 ${
                isUpdating
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:shadow-lg hover:scale-105 transform"
              }`}
            >
              <i className="fas fa-download"></i>
              دانلود اکسل
            </button> */}
          </div>
        </div>
        <div className="overflow-x-auto">
          <div
            ref={tableRef}
            className="flex-1 rounded-2xl overflow-hidden shadow-md border border-gray-100 [&_.tabulator-header]:!bg-gray-50 [&_.tabulator-header_.tabulator-col]:!border-gray-200 [&_.tabulator-row]:!border-gray-100 [&_.tabulator-row.tabulator-row-even]:!bg-gray-50/30 [&_.tabulator-row]:hover:!bg-blue-50/50 [&_.tabulator-footer]:!bg-gray-50 [&_.tabulator]:!border-gray-200 [&_.tabulator-footer]:!overflow-x-auto [&_.tabulator-paginator]:!min-w-[600px]"
          />
        </div>
      </div>
    </>
  );
};

export default UserProTable;

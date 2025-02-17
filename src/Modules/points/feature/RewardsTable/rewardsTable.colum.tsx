import moment from "moment-jalaali";
import { ColumnDefinition } from "tabulator-tables";

export const columns = (): ColumnDefinition[] => [
  {
    title: "نام",
    field: "name",
    hozAlign: "center",
    headerHozAlign: "center",
    headerFilter: true,
  },
  {
    title: "زمینه فعالیت",
    field: "feild_of_activity",
    hozAlign: "center",
    headerHozAlign: "center",
    headerFilter: true,
  },
  {
    title: "توضیحات",
    field: "description",
    hozAlign: "center",
    headerHozAlign: "center",
    headerFilter: true,
  },
  {
    title: "درصد تخفیف",
    field: "percent",
    hozAlign: "center",
    headerHozAlign: "center",
    headerFilter: true,
  },
  {
    title: "تعداد",
    field: "count",
    hozAlign: "center",
    headerHozAlign: "center",
    headerFilter: true,
  },
  {
    title: "وضعیت",
    field: "status",
    formatter: (cell) => (cell.getValue() ? "فعال" : "غیرفعال"),
    hozAlign: "center",
    headerHozAlign: "center",
    headerFilter: "input",
    headerFilterParams: {
      values: { true: "فعال", false: "غیرفعال" },
    },
  },
  {
    title: "تلفن",
    field: "telephone",
    hozAlign: "center",
    headerHozAlign: "center",
    headerFilter: true,
    formatter: (cell) =>
      `<div style="direction: ltr;">${cell.getValue()}</div>`,
  },
  {
    title: "آدرس",
    field: "address",
    hozAlign: "center",
    headerHozAlign: "center",
    headerFilter: true,
  },
  {
    title: "وب‌سایت",
    field: "website",
    formatter: (cell) =>
      `<a href="${cell.getValue()}" target="_blank" class="text-blue-600 hover:underline">${cell.getValue()}</a>`,
    hozAlign: "center",
    headerHozAlign: "center",
  },
  {
    title: "موقعیت",
    field: "location",
    formatter: (cell) =>
      `<a href="${cell.getValue()}" target="_blank" class="text-blue-600 hover:underline flex items-center gap-1 justify-center">
          <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </a>`,
    hozAlign: "center",
    headerHozAlign: "center",
  },
  {
    title: "تاریخ شروع",
    field: "start_date",
    formatter: (cell) => moment(cell.getValue()).format("jYYYY/jMM/jDD"),
    hozAlign: "center",
    headerHozAlign: "center",
  },
  {
    title: "تاریخ پایان",
    field: "end_date",
    formatter: (cell) => moment(cell.getValue()).format("jYYYY/jMM/jDD"),
    hozAlign: "center",
    headerHozAlign: "center",
  },
];

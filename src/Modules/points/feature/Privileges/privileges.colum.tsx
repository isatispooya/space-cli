import { ColumnDefinition } from "tabulator-tables";

export const columns = (): ColumnDefinition[] => [
  {
    title: "نام",
    field: "user_first_name",
    formatter: (cell) => {
      const firstName = cell.getValue() || "";
      return firstName || "-";
    },
    headerFilter: "input",
  },
  {
    title: "نام خانوادگی",
    field: "user_last_name",
    formatter: (cell) => {
      const lastName = cell.getValue() || "";
      return lastName || "-";
    },
    headerFilter: "input",
  },
  { title: "کد ملی", field: "user_phone", headerFilter: "input" },
  { title: "نوع", field: "type", headerFilter: "input" },
  { title: "توضیحات", field: "description", headerFilter: "input" },
  { title: "سکه", field: "point_1" },
  { title: "بذر", field: "point_2" },
  {
    title: "ثبت کننده",
    field: "by_user_first_name",
    formatter: (cell) => {
      const firstName = cell.getValue() || "";
      const lastName = cell.getData().by_user_last_name || "";
      return firstName && lastName ? `${firstName} ${lastName}` : "-";
    },
    headerFilter: "input",
  },
];

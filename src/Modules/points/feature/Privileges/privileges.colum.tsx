import { ColumnDefinition } from "tabulator-tables";

export const columns = (): ColumnDefinition[] => [
  {
    title: "نام و نام خانوادگی",
    field: "user_first_name",
    formatter: (cell) => {
      const firstName = cell.getValue() || "";
      const lastName = cell.getData().user_last_name || "";
      return firstName && lastName ? `${firstName} ${lastName}` : "-";
    },
  },
  { title: "کد ملی", field: "user_phone" },
  { title: "نوع", field: "type" },
  { title: "توضیحات", field: "description" },
  { title: "سکه", field: "point_1", formatter: "money" },
  { title: "بذر", field: "point_2", formatter: "money" },
  {
    title: "ثبت کننده",
    field: "by_user_first_name",
    formatter: (cell) => {
      const firstName = cell.getValue() || "";
      const lastName = cell.getData().by_user_last_name || "";
      return firstName && lastName ? `${firstName} ${lastName}` : "-";
    },
  },
];

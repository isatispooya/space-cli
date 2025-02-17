import { ColumnDefinition } from "tabulator-tables";
import moment from "moment-jalaali";

export const columns = (): ColumnDefinition[] => [
  { title: "نام", field: "user_first_name" },
  { title: "نام خانوادگی", field: "user_last_name" },
  { title: "شماره تماس", field: "user_phone" },
  { title: "ماموریت", field: "mission" },
  { title: "توضیحات", field: "description" },
  { title: "سکه", field: "point_1" },
  { title: "بذر", field: "point_2" },
  {
    title: "تاریخ ایجاد",
    field: "created_at",
    formatter: (cell) => moment(cell.getValue()).format("jYYYY/jMM/jDD"),
  },
];

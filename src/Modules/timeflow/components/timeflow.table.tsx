import { useTimeflow } from "../hooks";
import { LoaderLg, TabulatorTable } from "../../../components";
import { ColumnDefinition } from "tabulator-tables";
import moment from "moment-jalaali";
import { ExelData } from "../data";
import { useNavigate } from "react-router-dom";
import { TimeflowDataType } from "../types/timeflow.type";

// تابع تبدیل نوع تردد از انگلیسی به فارسی
const typeTranslator = (type: string): string => {
  switch (type) {
    case "login":
      return "ورود";
    case "logout":
      return "خروج";
    case "leave":
      return "مرخصی";
    case "leave-end":
      return "پایان مرخصی";
    case "mission-start":
      return "شروع ماموریت";
    case "mission-end":
      return "پایان ماموریت";
    default:
      return type;
  }
};


const TimeflowTable = () => {
  const { data, isLoading } = useTimeflow.useGetTimeflow();
  const navigate = useNavigate();

  const mappedData = data?.map((item) => ({
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
    typeRaw: item.type,
    type: typeTranslator(item.type),
    user_id: item.user_id,
    first_name: item.user_detail.first_name,
    last_name: item.user_detail.last_name,
    uniqueIdentifier: item.user_detail.uniqueIdentifier,
  }));

  if (isLoading) {
    return <LoaderLg />;
  }

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
      title: "تاریخ ",
      field: "date",
      headerFilter: true,
    },
    {
      title: "زمان شروع با تاریخ",
      field: "time_start",
      headerFilter: true,
    },
    {
      title: "زمان پایان با تاریخ",
      field: "time_end",
      headerFilter: true,
    },
    {
      title: "نوع",
      field: "type",
      headerFilter: true,
    },
    {
      title: "عملیات",
      field: "actions",
      headerSort: false,
      formatter: (cell) => {
        const element = document.createElement("div");
        element.className = "flex gap-2 justify-center";

        const editButton = document.createElement("button");
        editButton.innerHTML = `<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="text-blue-500 w-5 h-5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`;
        editButton.onclick = () => handleEdit(cell.getData() as TimeflowDataType);
        element.appendChild(editButton);
        return element;
      },
    },
  ];

  const handleEdit = (rowData: TimeflowDataType) => {
    console.log("Edit clicked for rowData:", rowData);
    console.log("Type:", rowData.type, "TypeRaw:", rowData.typeRaw);
    navigate(`/timeflow/update-timeflow/${rowData.id}`);
  };

  return (
    <>
      <div className="w-full bg-white shadow-xl rounded-3xl relative p-8 flex flex-col mb-[100px]">
        <div className="overflow-x-auto">
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

export default TimeflowTable;

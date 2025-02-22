import { useTimeflow } from "../hooks";
import { LoaderLg, TabulatorTable } from "../../../components";
import { ColumnDefinition } from "tabulator-tables";
import moment from "moment-jalaali";
import { ExelData } from "../data";

const TimeflowTable = () => {
  const { data, isLoading } = useTimeflow.useGetTimeflow();

  const mappedData = data?.map((item) => ({
    ...item,
    date: moment(item.date).format("jYYYY/jMM/jDD"),
    time_start: `${moment(item.date).format("jYYYY/jMM/jDD")} ${moment(item.time_start, "HH:mm:ss").format("HH:mm")}`,
    time_end: `${moment(item.date).format("jYYYY/jMM/jDD")} ${moment(item.time_end, "HH:mm:ss").format("HH:mm")}`,
    type: item.type === "working" ? "زمان حضور" : " غیبت",
    user_id: item.user_id,
  }));

  if (isLoading) {
    return <LoaderLg />;
  }



  const columns = (): ColumnDefinition[] => [
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
    
  ];

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

import { TabulatorTable } from "@/components";
import { ColumnDefinition } from "tabulator-tables";
import { useReceive } from "../../hooks/receive";
import { useParams } from "react-router-dom";

const WorkflowTable = () => {
  const { id } = useParams();
  const { data } = useReceive.useGetReceiveWorkflow(id as string);

  const columns = (): ColumnDefinition[] => [
    {
      field: "reference_details",
      title: "از",
      headerFilter: true,
      formatter: (cell) => {
        const data = cell.getValue();
        return `${data.user.first_name} ${data.user.last_name} - ${data.name}`;
      },
    },
    {
      field: "reference_details",
      title: "به",
      headerFilter: true,
      formatter: (cell) => {
        const data = cell.getValue();
        return `${data.user.first_name} ${data.user.last_name} - ${data.name}`;
      },
    },
    {
      field: "instruction_text",
      title: "دستور",
      headerFilter: true,
    },
    {
      field: "status_reference",
      title: "وضعیت",
      headerFilter: true,
      editor: "list",
      editorParams: {
        values: {
          doing: "در حال انجام",
          done: "انجام شده"
        }
      },
      formatter: (cell) => {
        const status = cell.getValue();
        if (status === "doing") return "در حال انجام";
        if (status === "done") return "انجام شده";
        return status;
      },
      cellEdited: (cell) => {
        console.log("Status changed:", cell.getValue());
      }
    },
  ];

  return (
    <>
      <div className="w-full bg-gray-100 shadow-md rounded-2xl relative overflow-hidden ">
        <div className="overflow-x-auto">
          <TabulatorTable
            data={data}
            columns={columns()}
            title="اطلاعات شرکت‌ها"
            showActions={true}
          />
        </div>
      </div>
    </>
  );
};

export default WorkflowTable;

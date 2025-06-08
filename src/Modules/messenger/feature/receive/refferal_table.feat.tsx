import { TabulatorTable } from "@/components";
import { ColumnDefinition } from "tabulator-tables";
import { useReceive } from "../../hooks/receive";
import { useParams, useNavigate } from "react-router-dom";
import usePosition from "@/Modules/positions/hooks/usePosition";

const RefferalTable = () => {
  const { id } = useParams();
  const { data } = useReceive.useGetReference(id as string);
  const { data: allPositions } = usePosition.useGetAll();
  const { mutate: patchReference } = useReceive.usePatchReference();
  const navigate = useNavigate();

  const onCreateLetter = () => {
    navigate(`/letter/receive-refferal/${id}`);
  };

  const columns = (): ColumnDefinition[] => [
    {
      field: "from_reference",
      title: "از",
      headerFilter: true,
      formatter: (cell) => {
        const positionId = cell.getValue();
        const position = allPositions?.find((pos) => pos.id === positionId);
        if (!position || !position.user || !position.company_detail) return "-";
        return ` ${position.user.first_name} ${position.user.last_name}-${position.name}-${position.company_detail.name}`;
      },
    },
    {
      field: "reference",
      title: "به",
      headerFilter: true,
      formatter: (cell) => {
        const positionId = cell.getValue();
        const position = allPositions?.find((pos) => pos.id === positionId);
        if (!position || !position.user || !position.company_detail) return "-";
        return ` ${position.user.first_name} ${position.user.last_name}-${position.name}-${position.company_detail.name}`;
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
      headerFilterParams: {
        values: {
          doing: "در حال انجام",
          done: "انجام شده",
        },
      },
      editor: "list",
      editorParams: {
        values: {
          doing: "در حال انجام",
          done: "انجام شده",
        },
      },
      formatter: (cell) => {
        const status = cell.getValue();
        if (status === "doing") return "در حال انجام";
        if (status === "done") return "انجام شده";
        return status;
      },
      cellEdited: (cell) => {
        patchReference({
          id: cell.getRow().getData().id,
          data: {
            status_reference: cell.getValue(),
          },
        });
      },
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
            showCreateLetter={true}
            onCreateLetter={onCreateLetter}
          />
        </div>
      </div>
    </>
  );
};

export default RefferalTable;

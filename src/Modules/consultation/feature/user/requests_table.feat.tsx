import { LoaderLg, TabulatorTable } from "@/components";
import { useConsultUser } from "../../hooks";
import { CellComponent } from "tabulator-tables";

const RequestsTable = () => {
  const { data, isLoading } = useConsultUser.useGetRequests();

  const MAPPED_DATA = data?.map((item) => ({
    id: item.id,
    status_of_turn: item.status_of_turn,
    created_at: item.created_at,
    updated_at: item.updated_at,
    counseling_requester: `${item.counseling_requester.first_name} ${item.counseling_requester.last_name}`,
    requester_id: item.counseling_requester.uniqueIdentifier,
    consultant_title: item.consultant.title,
    consultant_type: item.consultant.kind_of_consultant.join(", "),
    price: item.consultant.price,
    date: item.date || "تعیین نشده",
  }));

  if (isLoading) {
    return <LoaderLg />;
  }

  const COLUMNS = [
    {
      field: "id",
      title: "شناسه",
      headerFilter: true,
    },
    {
      field: "status_of_turn",
      title: "وضعیت نوبت",
      headerFilter: true,
      formatter: (cell: CellComponent) => {
        return cell.getValue() === "reserved" ? "درحال انتظار" : "انتظار بیشتر";
      },
    },
    {
      field: "counseling_requester",
      title: "درخواست کننده",
      headerFilter: true,
    },
    {
      field: "requester_id",
      title: "کد ملی",
      headerFilter: true,
    },
    {
      field: "consultant_title",
      title: "نوع مشاوره",
      headerFilter: true,
    },

    {
      field: "price",
      title: "هزینه (تومان)",
      headerFilter: true,
    },
    {
      field: "date",
      title: "تاریخ نوبت",
      headerFilter: true,
    },
  ];

  return <TabulatorTable data={MAPPED_DATA || []} columns={COLUMNS} />;
};

export default RequestsTable;

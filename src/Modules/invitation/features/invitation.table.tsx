import { useInvitation } from "../hooks";
import "moment/locale/fa";
import { LoaderLg, TabulatorTable } from "../../../components";
import { CellComponent, ColumnDefinition } from "tabulator-tables";
import moment from "moment-jalaali";

const InvitationTable = () => {
  const { data, isPending } = useInvitation.useGetCodes();
  
  const mappedData = Array.isArray(data)
    ? data.map((item) => ({
        code: `my.isatispooya.com/login?rf=${item.code}`,
        userFirstName: item.introducer_user_detail?.first_name,
        userLastName: item.introducer_user_detail.last_name,
        invited_users_count: item.invited_users_count,
      }))
    : [];

  const columns = (): ColumnDefinition[] => [
    {
      field: "code",
      title: "کد معرف",
      headerFilter: true,
    },
    {
      field: "description",
      title: "توضیحات",
      headerFilter: true,
    },
    {
      field: "userFirstName",
      title: "نام",
      headerFilter: true,
    },
    {
      field: "userLastName",
      title: "نام خانوادگی",
      headerFilter: true,
    },
    {
      field: "invited_users_count",
      title: "تعداد دعوت ها",
      headerFilter: true,
    },
    {
      field: "uniqueIdentifier",
      title: "کد ملی",
      headerFilter: true,
    },
    {
      field: "created_at",
      title: "تاریخ ایجاد",
      headerFilter: true,
      formatter: (params: CellComponent) => {
        const date = params.getValue();

        return moment(date).locale("fa").format("jYYYY/jMM/jDD");
      },
    },
  ];

  if (isPending) {
    return <LoaderLg />;
  }

  return (
    <div className="w-full bg-white shadow-xl rounded-3xl relative p-8 flex flex-col mb-[100px]">
      <div className="overflow-x-auto">
        <TabulatorTable
          data={mappedData || []}
          columns={columns()}
          title="کد دعوت"
          showActions={true}
        />
      </div>
    </div>
  );
};

export default InvitationTable;

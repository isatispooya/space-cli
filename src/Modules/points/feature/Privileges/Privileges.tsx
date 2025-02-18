import TabulatorTable from "../../../../components/table/table.com";
import "moment/locale/fa";
import { PrivilegesTypes } from "../../types/pivileges.type";
import usePoint from "../../hooks/usePoint";
import { columns } from "./privileges.colum";
import { ExelData } from "./privileges.exel";

const PrivilegesComponent = () => {
  const { data } = usePoint.useGetPoint();

  const mappedData = data?.map((item: PrivilegesTypes) => {

    return {
      point_1: (item?.mission_detail?.point_1 || 0) * (item.amount || 0),
      point_2: (item?.mission_detail?.point_2 || 0) * (item.amount || 0),
      created_at: item.created_at,
      description: item.description,
      id: item.id,
      mission: item.mission_detail.display_name,
      user_first_name: item.user_detail?.first_name,
      user_last_name: item.user_detail?.last_name,
      user_phone: item?.user_detail?.mobile,
    };
  });

  return (
    <div className="w-full bg-white rounded-3xl relative p-8 flex flex-col mb-[100px]">
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
  );
};
export default PrivilegesComponent;

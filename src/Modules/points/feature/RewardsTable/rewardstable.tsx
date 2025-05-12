import TabulatorTable from "../../../../components/table/table.com";
import "moment/locale/fa";
import { columns } from "./rewardsTable.colum";
import { ExelData } from "./rewardsTable.exel";
import { PrivilegesType } from "../../types/RewardsTable.type";

const RewardsTable = ({ data }: { data: PrivilegesType[] }) => {
  const mappedData = data?.map((item: PrivilegesType) => {
    return {
      id: item.id,
      name: item.name,
      feild_of_activity: item.feild_of_activity,
      description: item.description,
      percent: item.percent,
      count: item.count,
      status: item.status,
      telephone: item.telephone,
      address: item.address,
      website: item.website,
      location: item.location,
      start_date: item.start_date,
      end_date: item.end_date,
      created_at: item.created_at,
    };
  });

  return (
    <div className="w-full bg-white rounded-3xl relative flex flex-col">
      <div className="overflow-x-auto">
        <TabulatorTable
          data={mappedData || []}
          columns={columns()}
          title="رفاهی"
          showActions={true}
          formatExportData={ExelData}
        />
      </div>
    </div>
  );
};

export default RewardsTable;

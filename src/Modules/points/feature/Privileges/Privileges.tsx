import TabulatorTable from "../../../../components/table/table.com";
import "moment/locale/fa";
import { PrivilegesType } from "../../types/pivileges.type";
import usePoint from "../../hooks/usePoint";
import { columns } from "./privileges.colum";
import { ExelData } from "./privileges.exel";

const PrivilegesComponent = () => {
  const { data } = usePoint.useGetPoint();

  const mappedData = data?.map((item: PrivilegesType) => {
    return {
      point_1: item?.point_1 || 0,
      point_2: item?.point_2 || 0,
      type: item?.type,
      description: item?.description,
      id: item?.id,
      user_first_name: item?.user_detail?.first_name,
      user_last_name: item?.user_detail?.last_name,
      user_phone: item?.user_detail?.uniqueIdentifier,
      by_user_first_name: item?.by_user_detail?.first_name,
      by_user_last_name: item?.by_user_detail?.last_name,
    };
  });

  return (
    <div className="w-full bg-white rounded-3xl relative p-8 flex flex-col mb-[100px]">
      <div className="overflow-x-auto">
        {(data ?? []).length > 0 ? (
          <TabulatorTable
            data={mappedData || []}
            columns={columns()}
            title="اطلاعات کاربران"
            showActions={true}
            formatExportData={ExelData}
          />
        ) : (
          <div className="w-full flex flex-col justify-center items-center p-12 gap-4">
            <svg
              className="w-16 h-16 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <p className="text-gray-400 text-lg font-medium">
              اطلاعاتی موجود نیست
            </p>
            <p className="text-gray-300 text-sm">
              لطفاً بعداً دوباره تلاش کنید
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default PrivilegesComponent;

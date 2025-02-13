import { useUnderwriting } from "../../hooks";
import { formatNumber } from "../../../../utils";

const UnderwritingReports = () => {
  const { data } = useUnderwriting.useGetReports();

  return (
    <div className="p-4 bg-gray-100 rounded shadow">
      <h1 className="text-2xl font-bold">گزارش‌های تحت پوشش</h1>
      <p className="text-lg">
        تعداد گزارشات تایید شده:{" "}
        <span className="">{formatNumber(data?.approved ?? 0)}</span>
      </p>
      <p className="text-lg">
        تعداد گزارشات در حال انتظار:{" "}
        <span className="">{formatNumber(data?.pending ?? 0)}</span>
      </p>
      <p className="text-lg">
        تعداد گزارشات رد شده:{" "}
        <span className="">{formatNumber(data?.rejected ?? 0)}</span>
      </p>
      <p className="text-lg">
        تعداد گزارشات موفق:{" "}
        <span className="">{formatNumber(data?.success ?? 0)}</span>
      </p>
    </div>
  );
};

export default UnderwritingReports;

//underwritng-report

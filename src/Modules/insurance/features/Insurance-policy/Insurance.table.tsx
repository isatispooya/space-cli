import { TabulatorTable } from "@/components";
import useInsurance from "../../hooks/useInsurance";
import moment from "moment-jalaali";
import "moment/locale/fa";
import { InsuranceType } from "../../types";
import { CellComponent } from "tabulator-tables";

const InsurancePolicyTable = () => {
  const { data: fields } = useInsurance.useGetFields();

  const columns = () => [
    { title: "بیمه نامه", field: "parent_name" },
    {
      title: "تاریخ ایجاد",
      field: "created_at",
      formatter: (cell: CellComponent) =>
        moment(cell.getValue()).format("jYYYY/jMM/jDD"),
    },
    {
      title: "تاریخ بروزرسانی",
      field: "updated_at",
      formatter: (cell: CellComponent) =>
        moment(cell.getValue()).format("jYYYY/jMM/jDD"),
    },
  ];

  const processedData =
    fields?.flatMap(
      (field: InsuranceType) =>
        field.fields?.map((subField) => ({
          id: subField.id,
          name: subField.name,
          created_at: subField.created_at,
          updated_at: subField.updated_at,
          parent_name: field.name,
        })) || []
    ) || [];

  return (
    <div className="w-full bg-white rounded-3xl relative p-8 flex flex-col mb-[100px]">
      <div className="overflow-x-auto">
        <TabulatorTable
          data={processedData}
          columns={[...columns()]}
          title="اطلاعات بیمه"
          showActions={true}
        />
      </div>
    </div>
  );
};

export default InsurancePolicyTable;

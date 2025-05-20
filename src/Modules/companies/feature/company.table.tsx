import { TabulatorTable } from "@/components";
import useCompany from "../hooks/useCompany";
import Spinner from "../../../components/loaders/spinner";
import { ColumnDefinition } from "tabulator-tables";
import { companyFieldsTypes } from "../data/companyFileds";

const CompanyTable = () => {
  const { data, isPending } = useCompany.useGet();

  const mappedData = data?.map((item) => ({
    ...item,
    company_type:
      companyFieldsTypes.find((type) => type.value === item.company_type)
        ?.label || item.company_type,
  }));

  const columns = (): ColumnDefinition[] => [
    {
      field: "name",
      title: "نام شرکت",
      headerFilter: true,
    },
    {
      field: "company_type",
      title: "نوع شرکت",
      headerFilter: true,
    },
    {
      field: "year_of_establishment",
      title: "سال تاسیس",
      headerFilter: true,
    },
    {
      field: "phone",
      title: "تلفن",
      headerFilter: true,
    },
    {
      field: "postal_code",
      title: "کد پستی",
      headerFilter: true,
    },
    {
      field: "national_id",
      title: "کد شناسه",
      headerFilter: true,
    },
    {
      field: "description",
      title: "توضیحات",
      headerFilter: true,
    },
    {
      field: "registered_capital",
      title: "سرمایه ثبتی",

      headerFilter: true,
    },
    {
      field: "registration_number",
      title: "تعداد سرمایه ثبتی",
      headerFilter: true,
    },
    {
      field: "type_of_activity",
      title: "نوع فعالیت",
      headerFilter: true,
    },
    {
      field: "website",
      title: "وبسایت",
      headerFilter: true,
    },
  ];

  if (isPending) {
    return <Spinner />;
  }

  return (
    <>
      <div className="w-full bg-gray-100 shadow-md rounded-2xl relative overflow-hidden ">
        <div className="overflow-x-auto">
          <TabulatorTable
            data={mappedData || []}
            columns={columns()}
            title="اطلاعات شرکت‌ها"
            showActions={true}
     
          />
        </div>
      </div>
    </>
  );
};

export default CompanyTable;

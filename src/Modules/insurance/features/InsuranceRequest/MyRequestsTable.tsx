import { CellComponent } from "tabulator-tables";
import TabulatorTable from "../../../../components/table/table.com";
import { useInsurance } from "../../hooks";
import { InsuranceRequest } from "../../types";
import { useUserPermissions } from "../../../permissions";
import getStatusTranslations from "../../data/insurance_status";
import { server } from "../../../../api";

const MyRequestsTable = () => {
  const { data: requests } = useInsurance.useGetRequests();
  const { data: permissions } = useUserPermissions();

  const hasPermission =
    Array.isArray(permissions) &&
    permissions.some((perm) => perm.codename === "add_insurancename");

  const statusTranslations = getStatusTranslations(hasPermission);

  const draftFileFormatter = (cell: CellComponent) => {
    const file = cell.getValue();
    return file
      ? `
      <div class="flex justify-center items-center">
        <button 
          onclick="window.open('${server + file}', '_blank')" 
          class="px-2 py-1 text-sm bg-gray-100 text-gray-800 rounded hover:bg-gray-200 w-32 transition duration-200">
          دریافت فایل
        </button>
      </div>`
      : "-";
  };

  const columns = () => [
    {
      title: "نام بیمه",
      field: "insurance_name",
      formatter: (cell: CellComponent) => cell.getValue()?.name || "-",
      hozAlign: "center",
      headerHozAlign: "center",
    },
    {
      title: "نام و نام خانوادگی",
      field: "user_detail",
      formatter: (cell: CellComponent) => {
        const user = cell.getValue();
        return user ? `${user.first_name} ${user.last_name}` : "-";
      },
      hozAlign: "center",
      headerHozAlign: "center",
    },
    {
      title: "قیمت",
      field: "price",
      formatter: (cell: CellComponent) => cell.getValue() || "نامشخص",
      hozAlign: "center",
      headerHozAlign: "center",
    },
    {
      title: "وضعیت",
      field: "insurance_status",
      formatter: (cell: CellComponent) => {
        const value = cell.getValue();
        const status =
          statusTranslations[value as keyof typeof statusTranslations];
        return `
          <div class="flex items-center justify-around gap-2">
            <span>${status?.text || value}</span>
            ${
              status?.button && hasPermission
                ? `<button 
              onclick="window.open('${status.url}/${
                    cell.getRow().getData().id
                  }')" 
              class="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-400 w-32">
              ${status?.button}
            </button>
            `
                : ""
            }
          </div>
        `;
      },
      hozAlign: "center",
      headerHozAlign: "center",
    },

    {
      title: "پیش نویس بیمه نامه",
      field: "insurance_name_draft_file",
      formatter: draftFileFormatter,
      hozAlign: "center",
      headerHozAlign: "center",
    },
  ];

  const data =
    requests
      ?.filter(
        (request: InsuranceRequest) =>
          request.insurance_name_file && request.insurance_status === "finished"
      )
      .map((request: InsuranceRequest) => ({
        id: request.id,
        insurance_name: request.insurance_name_detail,
        user_detail: request.user_detail,
        price: request.price,
        insurance_status: request.insurance_status,
        insurance_name_draft_file: request.insurance_name_draft_file,
      })) || [];

  return (
    <div className="w-full bg-white rounded-3xl relative p-8 flex flex-col mb-[100px]">
      <div className="overflow-x-auto">
        <TabulatorTable
          data={data}
          columns={[...columns()]}
          title="اطلاعات بیمه نامه ها"
          showActions={true}
        />
      </div>
    </div>
  );
};

export default MyRequestsTable;

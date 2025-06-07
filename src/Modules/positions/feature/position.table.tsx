import { TabulatorTable } from "@/components";
import { usePosition } from "../hooks";
import toast from "react-hot-toast";
import { CellComponent } from "tabulator-tables";
import { deletePosition } from "../services";
import { useUserPermissions } from "../../permissions";
import { LoaderLg } from "../../../components";
import moment from "moment-jalaali";
import { useNavigate } from "react-router-dom";
import { PositionType } from "../types/postions.type";
import { createRoot } from "react-dom/client";
import { ActionMenu } from "@/components/table/tableaction";

const typeOfEmploymentTranslations: Record<string, string> = {
  full_time: "تمام وقت",
  part_time: "پاره وقت",
  contract: "قراردادی",
  freelance: "فریلنسر",
  internship: "کارآموزی",
};

const PositionsTable = () => {
  const { data: positions, isPending, refetch } = usePosition.useGet();
  const { checkPermission } = useUserPermissions();
  const navigate = useNavigate();

  const mappedData = positions?.map((position) => ({
    id: position.id,
    name: position.name,
    company: position.company_detail?.name || "نامشخص",
    executive_position: position.executive_position,
    type_of_employment: position.type_of_employment
      ? typeOfEmploymentTranslations[position.type_of_employment]
      : "",
    description: position.description,
    user: position.user,
    signature_holder: position.signature_holder,
    created_at: moment(position.created_at, "YYYY-MM-DD").format(
      "jYYYY/jMM/jDD"
    ),
    start_date: moment(position.start_date, "YYYY-MM-DD").format(
      "jYYYY/jMM/jDD"
    ),
    end_date: moment(position.end_date, "YYYY-MM-DD").format("jYYYY/jMM/jDD"),
  }));

  const hasPermission = (permissions: string[]) => {
    return checkPermission ? checkPermission(permissions) : false;
  };

  const canEdit = hasPermission(["change_position"]);
  const canDelete = hasPermission(["delete_position"]);

  const handleEdit = (row: PositionType) => {
    navigate(`/positions/update/${row.id}`);
  };

  const handleDelete = async (row: PositionType) => {
    try {
      await deletePosition(row.id);
      toast.success("نقش با موفقیت حذف شد");
      refetch();
    } catch (error) {
      console.log(error);
      toast.error("خطا در حذف نقش");
    }
  };

  const columns = () => [
    {
      field: "name",
      title: "نام نقش",
    },
    {
      field: "company",
      title: "نام شرکت",
    },
    {
      field: "executive_position",
      title: "مقام اجرایی",
      formatter: (executive_position: CellComponent) =>
        executive_position ? "هست" : "نیست",
    },
    {
      field: "type_of_employment",
      title: "نوع استخدام",
    },
    {
      field: "signature_holder",
      title: "امضا",
      formatter: (signature: CellComponent) => (signature ? "ندارد" : "دارد"),
    },
    {
      field: "description",
      title: "توضیحات",
    },
    {
      field: "user",
      title: "کاربر",
      formatter: (cell: CellComponent) => {
        const userData = cell.getValue() as {
          first_name: string;
          last_name: string;
        } | null;
        return (
          <span>
            {userData?.first_name && userData?.last_name
              ? `${userData.first_name} ${userData.last_name}`
              : "نامشخص"}
          </span>
        );
      },
    },
    {
      field: "created_at",
      title: "تاریخ ایجاد",
    },
    {
      field: "start_date",
      title: "تاریخ شروع",
    },
    {
      field: "end_date",
      title: "تاریخ پایان",
    },
    {
      title: "عملیات",
      field: "actions",
      headerSort: false,
      headerFilter: false,
      width: 100,
      hozAlign: "center" as const,
      headerHozAlign: "center" as const,
      formatter: () => `<button class="action-btn">⋮</button>`,
      cellClick: function (e: MouseEvent, cell: CellComponent) {
        e.stopPropagation();
        const target = e.target as HTMLElement;
        if (target.classList.contains("action-btn")) {
          const existingMenu = document.querySelector(".popup-menu");
          if (existingMenu) {
            existingMenu.remove();
            return;
          }

          const rect = target.getBoundingClientRect();
          const rowData = cell.getRow().getData();
          const menuItems = [
            ...(canEdit
              ? [
                  {
                    icon: "fas fa-edit",
                    label: "ویرایش",
                    onClick: () => {
                      handleEdit(rowData as PositionType);
                    },
                    color: "#2563EB",
                  },
                ]
              : []),
            ...(canDelete
              ? [
                  {
                    icon: "fas fa-trash",
                    label: "حذف",
                    onClick: () => {
                      handleDelete(rowData as PositionType);
                    },
                    color: "#DC2626",
                  },
                ]
              : []),
          ];

          const menuPosition = { x: rect.left, y: rect.bottom };
          const menuContainer = document.createElement("div");
          menuContainer.className = "popup-menu";
          document.body.appendChild(menuContainer);

          const root = createRoot(menuContainer);
          root.render(
            <ActionMenu
              items={menuItems}
              position={menuPosition}
              onClose={() => {
                root.unmount();
                menuContainer.remove();
              }}
            />
          );
        }
      },
    },
  ];

  const exportData = (data: PositionType[]) => {
    if (!data || !Array.isArray(data)) return [];
    return data.map((item) => ({
      "نام نقش": item.name,
      "نام شرکت": item.company,
      "مقام اجرایی": item.executive_position ? "هست" : "نیست",
      "نوع استخدام": item.type_of_employment,
      امضا: item.signature_holder ? "دارد" : "ندارد",
      توضیحات: item.description,
      "نام کاربر": item.user
        ? `${item.user.first_name} ${item.user.last_name}`
        : "نامشخص",
      "تاریخ ایجاد": item.created_at,
      "تاریخ شروع": item.start_date,
      "تاریخ پایان": item.end_date,
    }));
  };

  console.log("mappedData:", mappedData);

  if (isPending) {
    return <LoaderLg />;
  }

  return (
    <>
      <TabulatorTable
        data={mappedData || []}
        columns={columns()}
        title="گزارش تایم فلو"
        showActions={true}
        formatExportData={exportData}
      />
    </>
  );
};

export default PositionsTable;

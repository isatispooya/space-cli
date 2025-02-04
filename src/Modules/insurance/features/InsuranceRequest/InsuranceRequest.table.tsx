import { CellComponent } from "tabulator-tables";
import TabulatorTable from "../../../../components/table/table.com";
import { useInsurance } from "../../hooks";
import { InsuranceRequest, StatusTranslation } from "../../types";
import { useUserPermissions } from "../../../permissions";
import { server } from "../../../../api";

const InsuranceRequestTable = () => {
  const { data: requests } = useInsurance.useGetRequests();
  const { data: permissions } = useUserPermissions();

  const hasPermission =
    Array.isArray(permissions) &&
    permissions.some((perm) => perm.codename === "add_insurancename");

  const statusTranslations: Record<string, StatusTranslation> = {
    pending_review: {
      text: "در انتظار بررسی",
      button: hasPermission ? "ادامه فرآیند" : "",
      url: hasPermission ? "/requestinsurance/prosses" : "",

    },
    missing_document: {
      text: "نقص مدارک",
      button: "ادامه فرآیند",
      url: "/requestinsurance/prosses",
    },

    pending_payment: {
      text: "در انتظار پرداخت",
      button: "ادامه فرآیند",
      url: "/requestinsurance/prosses",
    },
    rejected: {
      text: "رد شده",
    },
    pending_issue: {
      text: "در انتظار بررسی مستندات",
      button: hasPermission ? "بارگزاری بیمه نامه" : "",
      url: hasPermission ? "/requestinsurance/prosses" : "",
    },
  };

  const columns = () => {
    const baseColumns = [
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
        title: "فایل های ضمیمه",
        field: "insurance_name_file",
        formatter: (cell: CellComponent) => {
          const file = cell.getValue();
          return file
            ? `
          <div class="flex items-center">
            <a href="${
              server + file
            }" target="_blank" class="text-blue-500 underline hover:text-blue-700 transition duration-200">${file}</a>
            <button class="px-2 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-400 w-32 ml-2 transition duration-200">
              مشاهده
            </button>
          </div>
                `
            : "-";
        },
        hozAlign: "center",
        headerHozAlign: "center",
      },
    ];

    return baseColumns;
  };

  const data =
    requests?.map((request: InsuranceRequest) => ({
      id: request.id,
      insurance_name: request.insurance_name_detail,
      user_detail: request.user_detail,
      price: request.price,
      insurance_status: request.insurance_status,
      insurance_name_file: request.insurance_name_file,
    })) || [];

  const renderActionColumn = () => ({
    title: "عملیات",
    field: "actions",
    headerSort: false,
    headerFilter: false,
    width: 100,
    hozAlign: "center",
    headerHozAlign: "center",
    formatter: () => `<button class="action-btn">⋮</button>`,
    cellClick: (e: MouseEvent, cell: CellComponent) => {
      e.stopPropagation();
      const existingMenu = document.querySelector(
        `.popup-menu[data-cell="${cell
          .getElement()
          .getAttribute("tabulator-field")}"]`
      );
      if (existingMenu) {
        closeAllMenus();
        return;
      }
      closeAllMenus();

      const menu = document.createElement("div");
      menu.className = "popup-menu";
      menu.setAttribute(
        "data-cell",
        cell.getElement().getAttribute("tabulator-field") || ""
      );

      const menuItems = [
        {
          label: "چاپ",
          icon: "🖨️",
          onClick: () => {
            window.open(
              `/insurance/print/${cell.getRow().getData().id}`,
              "_blank"
            );
          },
        },
        {
          label: "ویرایش",
          icon: "✏️",
          onClick: () => {
            window.open(
              `/requestinsurance/prosses/${cell.getRow().getData().id}`
            );
          },
        },
        {
          label: "حذف",
          icon: "🗑️",
          onClick: () => {
            window.open(
              `/insurance/delete/${cell.getRow().getData().id}`,
              "_blank"
            );
          },
        },
      ];

      menuItems.forEach((item) => {
        const menuItem = document.createElement("button");
        menuItem.className = "menu-item";
        menuItem.innerHTML = `${item.icon} ${item.label}`;
        menuItem.onclick = () => {
          item.onClick();
          closeAllMenus();
        };
        menu.appendChild(menuItem);
      });

      const rect = cell.getElement().getBoundingClientRect();
      menu.style.left = `${rect.left + window.scrollX}px`;
      menu.style.top = `${rect.bottom + window.scrollY}px`;

      document.body.appendChild(menu);

      const handleScroll = () => {
        closeAllMenus();
        window.removeEventListener("scroll", handleScroll);
      };
      window.addEventListener("scroll", handleScroll);

      setTimeout(() => {
        const closeMenu = (e: MouseEvent) => {
          if (!menu.contains(e.target as Node)) {
            closeAllMenus();
            document.removeEventListener("click", closeMenu);
            window.removeEventListener("scroll", handleScroll);
          }
        };
        document.addEventListener("click", closeMenu);
      }, 0);
    },
  });

  const closeAllMenus = () => {
    const existingMenus = document.querySelectorAll(".popup-menu");
    existingMenus.forEach((menu) => {
      document.body.removeChild(menu);
    });
  };

  return (
    <div className="w-full bg-white rounded-3xl relative p-8 flex flex-col mb-[100px]">
      <div className="overflow-x-auto">
        <TabulatorTable
          data={data}
          columns={[...columns(), renderActionColumn()]}
          title="اطلاعات بیمه نامه ها"
          showActions={true}
        />
      </div>
    </div>
  );
};

export default InsuranceRequestTable;

import { CellComponent } from "tabulator-tables";
import TabulatorTable from "../../../../components/table/table.com";
import { useInsurance } from "../../hooks";
import { insuranceStatus } from "../../data/insurance_status";
import { InsuranceRequest } from "../../types";

const InsuranceRequestTable = () => {
  const { data: requests } = useInsurance.useGetRequests();

  console.log(requests);
  console.log(requests?.[0]?.insurance_status);

  const columns = () => [
    {
      title: "نام بیمه",
      field: "insurance_name",
      formatter: (cell: CellComponent) => cell.getValue()?.name || "-",
    },
    {
      title: "نام و نام خانوادگی",
      field: "user_detail",
      formatter: (cell: CellComponent) => {
        const user = cell.getValue();
        return user ? `${user.first_name} ${user.last_name}` : "-";
      },
    },
    {
      title: "قیمت",
      field: "price",
      formatter: (cell: CellComponent) => cell.getValue() || "نامشخص",
    },

    {
      title: "وضعیت",
      field: "insurance_status",
      formatter: (cell: CellComponent) => {
        const status = insuranceStatus.find(
          (item) => item.value === cell.getValue()
        );
        return status ? status.label : "-";
      },
    },
  ];

  const data =
    requests?.map((request: InsuranceRequest) => ({
      insurance_name: request.insurance_name_detail,
      user_detail: request.user_detail,
      price: request.price,
      insurance_status: request.insurance_status,
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
              `/insurance/update/${cell.getRow().getData().id}`,
              "_blank"
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

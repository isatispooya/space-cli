import TabulatorTable from "../../../../components/table/table.com";

const InsuranceapplicationTable = () => {
  const columns = () => [
    { title: "نام بیمه", field: "insurance_name" },
    { title: "نوع بیمه", field: "insurance_type" },
    { title: "قیمت", field: "price" },
    { title: "تاریخ خرید", field: "purchase_date" },
    { title: "وضعیت", field: "status" },
  ];

  const data = [
    {
      insurance_name: "بیمه عمر",
      insurance_type: "طولانی مدت",
      price: 1000000,
      purchase_date: "1402/01/01",
      status: "درحال انتظار",
    },
    {
      insurance_name: "بیمه خودرو",
      insurance_type: "سالانه",
      price: 500000,
      purchase_date: "1402/02/01",
      status: "درحال انتظار",
    },
    {
      insurance_name: "بیمه خودرو",
      insurance_type: "سالانه",
      price: 500000,
      purchase_date: "1402/02/01",
      status: "درحال انتظار",
    },
  ];

  const renderActionColumn = () => ({
    title: "عملیات",
    field: "actions",
    headerSort: false,
    headerFilter: false,
    width: 100,
    hozAlign: "center",
    headerHozAlign: "center",
    formatter: () => `<button class="action-btn">⋮</button>`,
    cellClick: (e: any, cell: any) => {
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
              `/insurance/edit/${cell.getRow().getData().id}`,
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
          title="اطلاعات بیمه"
          showActions={true}
        />
      </div>
    </div>
  );
};

export default InsuranceapplicationTable;

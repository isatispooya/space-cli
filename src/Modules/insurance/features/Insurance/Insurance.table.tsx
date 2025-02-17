import TabulatorTable from "../../../../components/table/table.com";
import useInsurance from "../../hooks/useInsurance";
import moment from "moment-jalaali";
import "moment/locale/fa";
import { InsuranceTypes } from "../../types";
import { CellComponent } from "tabulator-tables";

const InsuranceTable = () => {
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
      (field: InsuranceTypes) =>
        field.fields?.map((subField) => ({
          id: subField.id,
          name: subField.name,
          created_at: subField.created_at,
          updated_at: subField.updated_at,
          parent_name: field.name,
        })) || []
    ) || [];

  // const renderActionColumn = () => ({
  //   title: "عملیات",
  //   field: "actions",
  //   headerSort: false,
  //   headerFilter: false,
  //   width: 100,
  //   hozAlign: "center",
  //   headerHozAlign: "center",
  //   formatter: () => `<button class="action-btn">⋮</button>`,
  //   cellClick: (e: MouseEvent, cell: CellComponent) => {
  //     e.stopPropagation();
  //     const existingMenu = document.querySelector(
  //       `.popup-menu[data-cell="${cell
  //         .getElement()
  //         .getAttribute("tabulator-field")}"]`
  //     );
  //     if (existingMenu) {
  //       closeAllMenus();
  //       return;
  //     }
  //     closeAllMenus();

  //     const menu = document.createElement("div");
  //     menu.className = "popup-menu";
  //     menu.setAttribute(
  //       "data-cell",
  //       cell.getElement().getAttribute("tabulator-field") || ""
  //     );

  //     const menuItems = [
  //       {
  //         label: "چاپ",
  //         icon: "🖨️",
  //         onClick: () => {
  //           window.open(
  //             `/insurance/print/${cell.getRow().getData().id}`,
  //             "_blank"
  //           );
  //         },
  //       },
  //     ];

  //     menuItems.forEach((item) => {
  //       const menuItem = document.createElement("button");
  //       menuItem.className = "menu-item";
  //       menuItem.innerHTML = `${item.icon} ${item.label}`;
  //       menuItem.onclick = () => {
  //         item.onClick();
  //         closeAllMenus();
  //       };
  //       menu.appendChild(menuItem);
  //     });

  //     const rect = cell.getElement().getBoundingClientRect();
  //     menu.style.left = `${rect.left + window.scrollX}px`;
  //     menu.style.top = `${rect.bottom + window.scrollY}px`;

  //     document.body.appendChild(menu);

  //     const handleScroll = () => {
  //       closeAllMenus();
  //       window.removeEventListener("scroll", handleScroll);
  //     };
  //     window.addEventListener("scroll", handleScroll);

  //     setTimeout(() => {
  //       const closeMenu = (e: MouseEvent) => {
  //         if (!menu.contains(e.target as Node)) {
  //           closeAllMenus();
  //           document.removeEventListener("click", closeMenu);
  //           window.removeEventListener("scroll", handleScroll);
  //         }
  //       };
  //       document.addEventListener("click", closeMenu);
  //     }, 0);
  //   },
  // });

  // const closeAllMenus = () => {
  //   const existingMenus = document.querySelectorAll(".popup-menu");
  //   existingMenus.forEach((menu) => {
  //     document.body.removeChild(menu);
  //   });
  // };

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

export default InsuranceTable;

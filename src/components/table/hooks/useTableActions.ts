
import { CellComponent } from "tabulator-tables";
import { MenuItemType, createActionMenu } from "../actionMenus";

interface UseTableActionsPropsType {
  getItems: (rowData: any) => MenuItemType[];
}

export const useTableActions = ({ getItems }: UseTableActionsPropsType) => {
  const handleCellClick = (e: any, cell: CellComponent) => {
    e.stopPropagation();

    if (e.target.classList.contains("action-btn")) {
      const rowData = cell.getRow().getData();
      const rect = e.target.getBoundingClientRect();

      createActionMenu({
        items: getItems(rowData),
        position: { x: rect.left, y: rect.bottom },
      });
    }
  };

  const renderActionColumn = () => ({
    title: "عملیات",
    field: "actions",
    headerSort: false,
    headerFilter: false as any,
    width: 100,
    hozAlign: "center" as const,
    headerHozAlign: "center" as const,
    formatter: () => `<button class="action-btn">⋮</button>`,
    cellClick: handleCellClick,
  });

  return { renderActionColumn };
};

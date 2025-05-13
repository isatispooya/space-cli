import { CellComponent } from "tabulator-tables";
import { MenuItemType, createActionMenu } from "../actionMenus";

interface RowDataType {
  [key: string]: unknown;
}

interface UseTableActionsPropsType {
  getItems: (rowData: RowDataType) => MenuItemType[];
}

export const useTableActions = ({ getItems }: UseTableActionsPropsType) => {
  const handleCellClick = (e: MouseEvent, cell: CellComponent) => {
    e.stopPropagation();

    const target = e.target as HTMLElement;
    if (target.classList.contains("action-btn")) {
      const rowData = cell.getRow().getData();
      const rect = target.getBoundingClientRect();

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
    headerFilter: false as const,
    width: 100,
    hozAlign: "center" as const,
    headerHozAlign: "center" as const,
    formatter: () => `<button class="action-btn">⋮</button>`,
    cellClick: handleCellClick,
  });

  return { renderActionColumn };
};

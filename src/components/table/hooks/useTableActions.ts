import { CellComponent } from "tabulator-tables";
import { MenuItemType, createActionMenu } from "../actionMenus";

interface RowDataType {
  id?: number | string;
  [key: string]: unknown;
}

interface UseTableActionsPropsType {
  getItems: (rowData: RowDataType) => MenuItemType[];
}

export const useTableActions = ({ getItems }: UseTableActionsPropsType) => {
  const handleCellClick = (e: MouseEvent, cell: CellComponent) => {
    e.stopPropagation();

    if ((e.target as HTMLElement).classList.contains("action-btn")) {
      const rowData = cell.getRow().getData();
      const rect = (e.target as HTMLElement).getBoundingClientRect();

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
    headerFilter: false,
    width: 100,
    hozAlign: "center" as const,
    headerHozAlign: "center" as const,
    formatter: () => `<button class="action-btn">⋮</button>`,
    cellClick: handleCellClick,
  });

  return { renderActionColumn };
};

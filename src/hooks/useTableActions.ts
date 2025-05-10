import { ColumnDefinition } from "tabulator-tables";
import { MenuItemType } from "../components/table/actionMenus";

interface RowDataType {
  id?: number | string;
  [key: string]: unknown;
}

interface UseTableActionsPropsType {
  getItems: (rowData: RowDataType) => MenuItemType[];
}

export const useTableActions = ({ getItems }: UseTableActionsPropsType) => {
  const renderActionColumn = (): ColumnDefinition => ({
    title: "عملیات",
    field: "actions",
    headerSort: false,
    headerFilter: undefined,
    width: 100,
    hozAlign: "center" as const,
    headerHozAlign: "center" as const,
    formatter: function (cell) {
      // Create DOM element for the button
      const button = document.createElement("button");
      button.innerHTML = "⋮";
      button.className = "action-btn";

      // Get row data when button is created
      const rowData = cell.getRow().getData();

      // Add click handler directly to the button
      button.onclick = (e) => {
        e.stopPropagation();
        const rect = button.getBoundingClientRect();
        const items = getItems(rowData);

        // Remove any existing menus
        const existingMenus = document.querySelectorAll(".popup-menu");
        existingMenus.forEach((menu) => menu.remove());

        // Create and show menu
        const menuElement = document.createElement("div");
        menuElement.className = "popup-menu";
        menuElement.style.position = "fixed";
        menuElement.style.left = `${rect.left}px`;
        menuElement.style.top = `${rect.bottom + 5}px`;
        menuElement.style.zIndex = "9999";
        menuElement.style.background = "white";
        menuElement.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
        menuElement.style.borderRadius = "4px";
        menuElement.style.minWidth = "150px";

        items.forEach((item) => {
          const menuItem = document.createElement("button");
          menuItem.className = "menu-item";
          menuItem.innerHTML = `
            <i class="${item.icon}" style="color: ${item.color}; margin-left: 8px;"></i>
            <span>${item.label}</span>
          `;
          menuItem.style.cssText = `
            width: 100%;
            padding: 8px 16px;
            text-align: right;
            background: none;
            border: none;
            display: flex;
            align-items: center;
            cursor: pointer;
          `;
          menuItem.onclick = () => {
            item.onClick();
            menuElement.remove();
          };
          menuItem.onmouseover = () => {
            menuItem.style.backgroundColor = "#f3f4f6";
          };
          menuItem.onmouseout = () => {
            menuItem.style.backgroundColor = "transparent";
          };
          menuElement.appendChild(menuItem);
        });

        document.body.appendChild(menuElement);

        // Close menu when clicking outside
        const closeMenu = (event: MouseEvent) => {
          if (!menuElement.contains(event.target as Node)) {
            menuElement.remove();
            document.removeEventListener("click", closeMenu);
          }
        };

        // Delay adding click listener to prevent immediate closure
        setTimeout(() => {
          document.addEventListener("click", closeMenu);
        }, 0);
      };

      return button;
    },
    cellClick: (e) => {
      e.stopPropagation();
    },
  });

  return { renderActionColumn };
};

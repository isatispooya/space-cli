import { createRoot } from "react-dom/client";
import React, { useEffect, useRef } from "react";

export interface MenuItemType {
  icon: string;
  label: string;
  onClick: () => void;
  color?: string;
  disabled?: boolean;
  hidden?: boolean;
}

interface ActionMenuPropsType {
  items: MenuItemType[];
  position: {
    x: number;
    y: number;
  };
  onClose: () => void;
  className?: string;
}

const ActionMenu: React.FC<ActionMenuPropsType> = ({
  items,
  position,
  onClose,
  className = "",
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      const adjustedStyle = { ...position };

      if (rect.right > window.innerWidth) {
        adjustedStyle.x = window.innerWidth - rect.width - 10;
      }
      if (rect.bottom > window.innerHeight) {
        adjustedStyle.y = window.innerHeight - rect.height - 10;
      }

      menuRef.current.style.left = `${adjustedStyle.x}px`;
      menuRef.current.style.top = `${adjustedStyle.y}px`;
    }

    // Add scroll event listener
    const handleScroll = () => {
      onClose();
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [position, onClose]);

  return (
    <div
      ref={menuRef}
      className={`fixed z-[9999] bg-white rounded-lg shadow-lg py-2 min-w-[150px] ${className}`}
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      {items
        .filter((item) => !item.hidden)
        .map((item, index) => (
          <button
            key={index}
            onClick={() => {
              if (!item.disabled) {
                item.onClick();
                onClose();
              }
            }}
            disabled={item.disabled}
            className={`w-full px-4 py-2 text-right hover:bg-gray-100 flex items-center gap-2 rtl
              ${
                item.disabled
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }
            `}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
    </div>
  );
};

interface CreateActionMenuPropsType {
  items: MenuItemType[];
  position: { x: number; y: number };
  className?: string;
}

interface ReactRootType  {
  unmount: () => void;
}

interface MenuElementType extends HTMLElement {
  _reactRoot?: ReactRootType;
}

export const createActionMenu = ({
  items,
  position,
  className,
}: CreateActionMenuPropsType): (() => void) => {
  // Remove any existing menus
  const cleanup = () => {
    const existingMenus = document.querySelectorAll<MenuElementType>(
      ".popup-menu"
    );
    existingMenus.forEach((menu) => {
      const root = menu._reactRoot;
      if (root) {
        root.unmount();
      }
      menu.remove();
    });
  };

  // Clean up existing menus
  cleanup();

  // Create new menu container
  const menuContainer = document.createElement("div") as MenuElementType;
  menuContainer.className = "popup-menu";
  document.body.appendChild(menuContainer);

  // Create root
  const root = createRoot(menuContainer);
  menuContainer._reactRoot = root;

  // Handle click outside
  const handleClickOutside = (event: MouseEvent) => {
    if (!menuContainer.contains(event.target as Node)) {
      cleanup();
      document.removeEventListener("click", handleClickOutside);
    }
  };

  // Delay adding click listener
  requestAnimationFrame(() => {
    document.addEventListener("click", handleClickOutside);
  });

  // Render menu
  root.render(
    <ActionMenu
      items={items}
      position={position}
      onClose={cleanup}
      className={className}
    />
  );

  return cleanup;
};

export default ActionMenu;

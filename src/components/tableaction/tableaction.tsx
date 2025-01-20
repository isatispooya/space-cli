import React, { useEffect, useRef } from "react";

interface MenuItemProps {
  icon: string;
  label: string;
  onClick: () => void;
  color?: string;
}

interface ActionMenuProps {
  items: MenuItemProps[];
  position: { x: number; y: number };
  onClose: () => void;
}

export const ActionMenu: React.FC<ActionMenuProps> = ({
  items,
  position,
  onClose,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="popup-menu"
      style={{
        position: "fixed",
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      {items.map((item, index) => (
        <button
          key={index}
          className={`menu-item`}
          style={{ color: item.color }}
          onClick={item.onClick}
        >
          <i className={item.icon}></i>
          {item.label}
        </button>
      ))}
    </div>
  );
};

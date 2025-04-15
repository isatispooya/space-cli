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

    const handleScroll = () => {
      onClose();
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("scroll", handleScroll);
    };
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="popup-menu"
      style={{
        position: "fixed",
        left: `${position.x}px`,
        top: `${position.y}px`,
        background: "white",
        border: "1px solid #E2EDFA",
        borderRadius: "12px",
        boxShadow:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        minWidth: "150px",
        zIndex: 9999,
      }}
    >
      {items.map((item, index) => (
        <button
          key={index}
          className="menu-item"
          style={{
            color: item.color,
            display: "flex",
            alignItems: "center",
            gap: "12px",
            width: "100%",
            padding: "12px 16px",
            textAlign: "right",
            fontSize: "14px",
            transition: "all 0.3s",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            borderRadius:
              index === 0
                ? "12px 12px 0 0"
                : index === items.length - 1
                ? "0 0 12px 12px"
                : "0",
          }}
          onClick={item.onClick}
        >
          <i className={item.icon}></i>
          {item.label}
        </button>
      ))}
    </div>
  );
};

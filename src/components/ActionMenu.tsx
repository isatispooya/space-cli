import React, { useEffect, useRef } from "react";

interface ActionMenuItemType {
  icon: string;
  label: string;
  onClick: () => void;
  color?: string;
}

interface ActionMenuPropsType {
  items: ActionMenuItemType[];
  position: { x: number; y: number };
  onClose: () => void;
}

const ActionMenu: React.FC<ActionMenuPropsType> = ({
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

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="absolute bg-white shadow-lg rounded-md py-1 z-50"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      {items.map((item, index) => (
        <button
          key={index}
          className="w-full text-right px-4 py-2 hover:bg-gray-100 flex items-center"
          onClick={() => {
            item.onClick();
            onClose();
          }}
        >
          <i
            className={item.icon}
            style={{ color: item.color || "#4B5563", marginLeft: "8px" }}
          ></i>
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ActionMenu;

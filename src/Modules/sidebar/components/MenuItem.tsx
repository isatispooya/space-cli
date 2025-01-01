import { useState } from "react";
import { MenuItem as MenuItemType } from "../data/menuItems";
import { Link } from "react-router-dom";

interface MenuItemProps {
  item: MenuItemType;
}

const CustomMenuItem = ({ item }: MenuItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <div
        className="flex items-center gap-2 p-3 text-white hover:bg-blue-800 rounded-lg cursor-pointer transition-all duration-200"
        onClick={() => item.submenu && setIsOpen(!isOpen)}
      >
        {item.icon && <item.icon className="text-xl" />}
        <span>{item.title}</span>
      </div>

      {item.submenu && isOpen && (
        <div className="mr-4 mt-1">
          {item.submenu.map((subItem, index) => (
            <div key={index}>
              {subItem.path ? (
                <Link
                  to={subItem.path}
                  className="flex items-center p-2 text-white hover:bg-blue-800 rounded-lg transition-all duration-200"
                >
                  {subItem.title}
                </Link>
              ) : (
                <CustomMenuItem item={subItem} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomMenuItem; 
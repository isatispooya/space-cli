import { useEffect, useState, useMemo } from "react";
import { MenuItem as MenuItemType } from "../data/menuItems";
import { Link } from "react-router-dom";
import { useSearchStore } from "../store";
import { useUserPermissions } from "../../permissions";

interface MenuItemProps {
  item: MenuItemType;
}

const CustomMenuItem = ({ item }: MenuItemProps) => {
  const { search } = useSearchStore();
  const [isOpen, setIsOpen] = useState(false);
  const { checkPermission } = useUserPermissions();

  const filteredSubmenu = useMemo(() => {
    return item.submenu?.filter((subItem) => {
      if (subItem?.codename && checkPermission(subItem?.codename)) {
        return subItem?.title?.includes(search);
      }
      return false;
    });
  }, [item.submenu, checkPermission, search]);

  useEffect(() => {
    if (search && search.length > 0) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [search]);

  if (!filteredSubmenu || filteredSubmenu.length === 0) return null;

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
          {filteredSubmenu.map((subItem, index) => (
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

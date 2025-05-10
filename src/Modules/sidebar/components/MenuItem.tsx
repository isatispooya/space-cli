import { useEffect, useState, useMemo } from "react";
import { MenuItemType } from "../data/menuItems";
import { Link } from "react-router-dom";
import { useSearchStore, useSidebarStore } from "../store";
import { useUserPermissions } from "../../permissions";
import { MdKeyboardArrowDown } from "react-icons/md";
import { motion } from "framer-motion";

interface MenuItemPropsType {
  item: MenuItemType;
  className?: string;
}

const CustomMenuItem: React.FC<MenuItemPropsType> = ({ item }) => {
  const { search } = useSearchStore();
  const [isOpen, setIsOpen] = useState(false);
  const { checkPermission } = useUserPermissions();
  const { toggleSidebar } = useSidebarStore();

  const filteredSubmenu = useMemo(() => {
    return item.submenu?.filter((subItem) => {
      if (subItem?.codename && checkPermission(subItem?.codename as string[])) {
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

  if (
    item.submenu?.every(
      (subItem) => subItem.codename && !checkPermission(subItem.codename)
    )
  ) {
    return null;
  }

  if (!filteredSubmenu || filteredSubmenu.length === 0) {
    return (
      <div className="w-full">
        <Link
          to={item.path || "#"}
          className="flex items-center gap-2 p-3 text-white hover:bg-blue-800 rounded-lg cursor-pointer"
        >
          {item.icon && <item.icon className="text-xl" />}
          <span>{item.title}</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <motion.div
        className="flex items-center gap-2 p-3 text-white hover:bg-blue-800 rounded-lg cursor-pointer"
        onClick={() => item.submenu && setIsOpen(!isOpen)}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {item.icon && <item.icon className="text-xl" />}
        <span>{item.title}</span>
        {item.submenu && (
          <motion.span
            className="ml-auto"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <MdKeyboardArrowDown className="text-xl" />
          </motion.span>
        )}
      </motion.div>

      {item.submenu && isOpen && (
        <motion.div
          className="mr-4 mt-1"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {filteredSubmenu.map((subItem, index) => (
            <div key={index}>
              {subItem.path ? (
                <Link
                  to={subItem.path}
                  className="flex items-center p-2 text-white hover:bg-blue-800 rounded-lg transition-all duration-200"
                  onClick={toggleSidebar}
                >
                  {subItem.title}
                </Link>
              ) : (
                <CustomMenuItem item={subItem} />
              )}
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default CustomMenuItem;

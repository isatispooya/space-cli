import React from "react";
import { Menu, SubMenu, MenuItem } from "react-pro-sidebar";
import { MenuItem as MenuItemType } from "../data/menuItems";
import { useNavigate } from "react-router-dom";
import BothLogo from "../assets/bothLogo.svg";
import { useUserPermissions } from "../../permissions";

interface SideMenuProps {
  collapsed: boolean;
  activeSection: MenuItemType | null;
  onClose: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ collapsed, activeSection, onClose }) => {
  const navigate = useNavigate();
  const { checkPermission } = useUserPermissions();

  const filterMenuItems = (items: MenuItemType[]): MenuItemType[] => {
    return items.filter((item) => {
      if (item.codename && !checkPermission(item.codename)) {
        return false;
      }
      if (item.submenu) {
        const filteredSubmenu = filterMenuItems(item.submenu);
        if (filteredSubmenu.length === 0) {
          return false;
        }
        item.submenu = filteredSubmenu;
      }
      return true;
    });
  };

  const handleMenuClick = () => {
    onClose();
  };

  const renderMenuItem = (item: MenuItemType) => {
    if (item.submenu) {
      return (
        <SubMenu
          label={
            <div className="flex items-center gap-2">
              {item.icon && <item.icon />}
              <span>{item.title}</span>
            </div>
          }
          className="text-white"
          onClick={handleMenuClick}
        >
          {item.submenu.map((subItem, subIndex) => (
            <React.Fragment key={subIndex}>
              {subItem.submenu ? (
                renderMenuItem(subItem)
              ) : (
                <MenuItem
                  onClick={() => {
                    if (subItem.path) {
                      navigate(subItem.path);
                    }
                    handleMenuClick();
                  }}
                >
                  {subItem.title}
                </MenuItem>
              )}
            </React.Fragment>
          ))}
        </SubMenu>
      );
    }

    return (
      <MenuItem
        onClick={() => {
          if (item.path) {
            navigate(item.path);
          }
          handleMenuClick();
        }}
      >
        {item.title}
      </MenuItem>
    );
  };
  if (!activeSection || collapsed) {
    return null;
  }
  const filteredActiveSection = filterMenuItems([activeSection])[0];
  if (!filteredActiveSection) {
    return null;
  }

  return (
    <div className="fixed right-14 pr-1 h-full overflow-hidden transition-all duration-300 w-64">
      <div className="h-full w-64 bg-gradient-to-b from-[#5677BC] to-[#02205F] overflow-y-auto">
        <Menu
          className="pt-8 px-4 rounded-l-xl"
          menuItemStyles={{
            button: {
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            },
            subMenuContent: {
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          <div className="relative mb-4">
            <div className="flex justify-center ">
              <img src={BothLogo} alt="logo" className="w-[12rem]" />
            </div>
          </div>

          <div className="mb-8 mr-2">
            <input
              type="text"
              placeholder="جستجو..."
              className="bg-white/10 mr-2 text-white placeholder-white/60 focus:outline-[#5677BC] rounded-lg py-1 px-4 text-right"
            />
          </div>

          {renderMenuItem(filteredActiveSection)}
        </Menu>
      </div>
    </div>
  );
};

export default SideMenu;

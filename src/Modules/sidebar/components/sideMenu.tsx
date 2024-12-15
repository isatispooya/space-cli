import React from "react";
import { Menu, SubMenu, MenuItem } from "react-pro-sidebar";
import { menuItems, MenuItem as MenuItemType } from "../data/menuItems";
import { useNavigate } from "react-router-dom";
import BothLogo from "../assets/bothLogo.svg"

interface SideMenuProps {
  collapsed: boolean;
}

const renderMenuItem = (item: MenuItemType) => {
  const navigate = useNavigate();
  

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
      >
        {item.submenu.map((subItem, subIndex) => (
          subItem.submenu ? 
            renderMenuItem(subItem) : 
            <MenuItem 
              key={subIndex} 
              onClick={() => subItem.path && navigate(subItem.path)}
            >
              {subItem.title}
            </MenuItem>
        ))}
      </SubMenu>
    );
  }

  return (
    <MenuItem 
      onClick={() => item.path && navigate(item.path)}
    >
      {item.title}
    </MenuItem>
  );
};

const SideMenu = ({ collapsed }: SideMenuProps) => {
  
  return (
    <div
      className={`fixed right-14 pr-1 h-full overflow-hidden transition-all duration-300 ${
        collapsed ? "w-0" : "w-64"
      }`}
    >
      <div className="h-full w-64 bg-gradient-to-b from-[#7DE7DC] to-[#0F766E] rounded-l-3xl">
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
            }
          }}
        >
          <div className="flex items-start justify-start mr-4">
            <img src={BothLogo} alt="logo" className="w-[12rem] mb-4" />
          </div>
          <div className="mb-8 mr-2">
            <input
              type="text"
              placeholder="جستجو..."
              className="bg-white/10 mr-2 text-white placeholder-white/60 focus:outline-[#7DE7DC] rounded-lg py-1 px-4 text-right"
            />
          </div>

          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              {renderMenuItem(item)}
            </React.Fragment>
          ))}
        </Menu>
      </div>
    </div>
  );
};

export default SideMenu;

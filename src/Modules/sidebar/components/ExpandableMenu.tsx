import { Menu, SubMenu, MenuItem } from "react-pro-sidebar";
import { menuItems } from "../data/menuItems";
import { useNavigate } from "react-router-dom";

interface ExpandableMenuProps {
  collapsed: boolean;
}

const ExpandableMenu = ({ collapsed }: ExpandableMenuProps) => {
  const navigate = useNavigate();

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
          }}
        >
          <div className="mb-8 mr-2">
            <input
              type="text"
              placeholder="جستجو..."
              className="bg-white/10 text-white placeholder-white/60 focus:outline-[#7DE7DC] rounded-lg py-1 px-4 text-right"
            />
          </div>

          {menuItems.map((item, index) => (
            <SubMenu
              key={index}
              label={item.title}
              className="text-white"
              onClick={() => navigate(item.path)}
            >
              {item.submenu.map((subItem, subIndex) => (
                <MenuItem key={subIndex} onClick={() => navigate(subItem.path)}>
                  {subItem.title}
                </MenuItem>
              ))}
            </SubMenu>
          ))}
        </Menu>
      </div>
    </div>
  );
};

export default ExpandableMenu;

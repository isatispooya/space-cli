import homeIcon from "../assets/home.svg";
import positionIcon from "../assets/position.svg";
import searchIcon from "../assets/search.svg";
import profileIcon from "../assets/profile.svg";
import contactIcon from "../assets/contact.svg";
import { MenuItem, menuItems } from "../data/menuItems";
import { AiOutlineClose } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import { IconType } from "react-icons";

interface SidePanelProps {
  onToggleCollapse: () => void;
  onSectionChange: (section: MenuItem | null) => void;
  collapsed: boolean;
  onClose: () => void;
}

type IconItem = {
  src?: string;
  icon?: IconType;
  alt: string;
  onClick: () => void;
  isReactIcon: boolean;
};

const SidePanel = ({
  onToggleCollapse,
  onSectionChange,
  collapsed,
  onClose,
}: SidePanelProps) => {
  const handleIconClick = (menuItem: MenuItem | null) => {
    if (collapsed) {
      onToggleCollapse();
    }
    onSectionChange(menuItem);
  };

  const icons: IconItem[] = [
    {
      src: homeIcon,
      alt: "home",
      onClick: () =>
        handleIconClick({
          title: "منو اصلی",
          submenu: menuItems,
        }),
      isReactIcon: false,
    },
    {
      icon: MdDashboard,
      alt: "dashboard",
      onClick: () => handleIconClick(menuItems[0]),
      isReactIcon: true,
    },
    {
      src: positionIcon,
      alt: "shareholders",
      onClick: () => handleIconClick(menuItems[2]),
      isReactIcon: false,
    },
    {
      src: searchIcon,
      alt: "search",
      onClick: () => handleIconClick(menuItems[1]),
      isReactIcon: false,
    },
    {
      src: profileIcon,
      alt: "profile",
      onClick: () => handleIconClick(menuItems[4]),
      isReactIcon: false,
    },
    {
      src: contactIcon,
      alt: "contact",
      onClick: () => handleIconClick(menuItems[6]),
      isReactIcon: false,
    },
  ];

  return (
    <div className="fixed right-0 w-20 h-full bg-gradient-to-b from-[#5677BC] to-[#02205F] rounded-l-3xl shadow-2xl z-20">
      <div className="flex flex-col items-center py-8 gap-8">
        {icons.map((icon, index) =>
          icon.isReactIcon && icon.icon ? (
            <icon.icon
              key={index}
              className="sidebar-icon"
              onClick={icon.onClick}
            />
          ) : (
            <img
              key={index}
              src={icon.src}
              alt={icon.alt}
              className="sidebar-icon transition-transform hover:scale-110"
              onClick={icon.onClick}
            />
          )
        )}
        <div className="mt-auto">
          <AiOutlineClose className="sidebar-icon" onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default SidePanel;

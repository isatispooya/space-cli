import { AiOutlineMore } from "react-icons/ai";
import homeIcon from "./home.svg";
import positionIcon from "./position.svg";
import searchIcon from "./search.svg";
import profileIcon from "./profile.svg";
import contactIcon from "./contact.svg";

interface SidebarIconsProps {
  onToggleCollapse: () => void;
}

const SidebarIcons = ({ onToggleCollapse }: SidebarIconsProps) => {
  const icons = [
    { src: homeIcon, alt: "home", onClick: onToggleCollapse },
    { src: positionIcon, alt: "position" },
    { src: searchIcon, alt: "search" },
    { src: profileIcon, alt: "profile" },
    { src: contactIcon, alt: "contact" },
  ];

  return (
    <div className="fixed right-0 w-20 h-full bg-gradient-to-b from-[#2DD4BF] to-[#0F766E] rounded-l-3xl shadow-2xl z-20">
      <div className="flex flex-col items-center py-8 gap-8">
        {icons.map((icon, index) => (
          <img
            key={index}
            src={icon.src}
            alt={icon.alt}
            className="sidebar-icon transition-transform hover:scale-110"
            onClick={icon.onClick}
          />
        ))}
        <div className="mt-auto">
          <AiOutlineMore className="sidebar-icon" />
        </div>
      </div>
    </div>
  );
};

export default SidebarIcons; 
import { AiOutlineMore } from "react-icons/ai";
import homeIcon from "../assets/home.svg";
import positionIcon from "../assets/position.svg";
import searchIcon from "../assets/search.svg";
import profileIcon from "../assets/profile.svg";
import contactIcon from "../assets/contact.svg";

interface SidePanelProps {
  onToggleCollapse: () => void;
}

const SidePanel = ({ onToggleCollapse }: SidePanelProps) => {
  
  const icons = [
    { src: homeIcon, alt: "home", onClick: onToggleCollapse },
    { src: positionIcon, alt: "position" },
    { src: searchIcon, alt: "search" },
    { src: profileIcon, alt: "profile" },
    { src: contactIcon, alt: "contact" },
  ];

  return (
    <div className="fixed right-0 w-20 h-full bg-gradient-to-b from-[#5677BC] to-[#02205F] rounded-l-3xl shadow-2xl z-20">
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

export default SidePanel;

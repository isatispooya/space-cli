import React, { ReactNode } from "react";
import { IoIosArrowBack } from "react-icons/io";
import Card from "../../../components/cards/card";
import WaveEffect from "../../../ui/wave";
import "../../../ui/wave.css";
import { Button } from "@/components";

interface DashboardCardPropsType {
  title: string;
  icon: ReactNode;
  iconColor?: string;
  content: ReactNode;
  buttonText?: string;
  buttonLink?: string;
  onButtonClick?: () => void;
  waveColor?: "blue" | "green" | "red" | "purple" | "dark" | "orange";
  customColors?: {
    background: string;
    hoverBackground: string;
    text: string;
  };
  isExternalLink?: boolean;
  className?: string;
  headerButtons?: ReactNode;
}

const DashboardCard: React.FC<DashboardCardPropsType> = ({
  title,
  icon,
  iconColor,
  content,
  buttonText,
  buttonLink,
  onButtonClick,
  waveColor = "blue",
  customColors = {
    background: "#1e40af",
    hoverBackground: "#1d4ed8",
    text: "white",
  },
  isExternalLink = false,
  className = "",
  headerButtons,
}) => {
  const getTitleColor = () => {
    switch (waveColor) {
      case "green":
        return "#16a34a";
      case "blue":
        return "#1e40af";
      case "purple":
        return "#7e22ce";
      case "red":
        return "#dc2626";
      case "orange":
        return "#ea580c";
      case "dark":
        return "#1e293b";
      default:
        return customColors.background;
    }
  };
  
  const titleColor = getTitleColor();
  
  const renderContent = (
    <div
      className={`flex flex-col h-full w-full p-2 wave-content ${className}`}
    >
      <div className="flex-shrink-0">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center">
            <div
              className="w-6 h-6 flex items-center justify-center"
              style={{ color: iconColor }}
            >
              {icon}
            </div>
            <h3
              className={`text-xs font-bold font-iranSans mr-1.5`}
              style={{ color: titleColor }}
            >
              {title}
            </h3>
          </div>
          {headerButtons && <div className="ml-4 mb-2">{headerButtons}</div>}
        </div>
      </div>

      <div className="flex-grow flex flex-col min-h-[140px]">{content}</div>

      {buttonText && (
        <div className="w-full pt-1.5 relative z-10 mt-auto flex-shrink-0">
          {isExternalLink && buttonLink ? (
            <a
              href={buttonLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
              <Button
                variant="custom"
                customColors={customColors}
                fullWidth
                animationOnHover="scale"
                animationOnTap="scale"
                className="w-full py-1 px-2 rounded-md font-iranSans text-xs"
                rightIcon={<IoIosArrowBack className="w-3 h-3" />}
              >
                <span>{buttonText}</span>
              </Button>
            </a>
          ) : (
            <Button
              onClick={
                onButtonClick ||
                (buttonLink
                  ? () => (window.location.href = buttonLink)
                  : undefined)
              }
              variant="custom"
              customColors={customColors}
              fullWidth
              animationOnHover="scale"
              animationOnTap="scale"
              className="w-full py-1 px-2 rounded-md font-iranSans text-xs"
              rightIcon={<IoIosArrowBack className="w-3 h-3" />}
            >
              <span>{buttonText}</span>
            </Button>
          )}
        </div>
      )}
    </div>
  );

  return (
    <Card
      disableAnimation={true}
      className="tour-component relative bg-white rounded-xl shadow-md w-full h-full overflow-hidden transition-all duration-300 hover:shadow-xl wave-container"
      contentClassName="h-full p-0 flex flex-col"
      content={renderContent}
      customStyles={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 0,
        position: "relative",
      }}
      padding="0"
      footerSlot={<WaveEffect color={waveColor} />}
    />
  );
};

export default DashboardCard;

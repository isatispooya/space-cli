import React from "react";
import "./wave.css";

type WaveColorType = "green" | "blue" | "purple" | "red" | "orange" | "dark";

interface WaveEffectProps {
  color?: WaveColorType;
  className?: string;
}

const colorMap = {
  green: "#48bb78",
  blue: "#1e40af",
  purple: "#9f7aea",
  red: "#f56565",
  orange: "#ed8936",
  dark: "#4A5568",
};

const WaveEffect: React.FC<WaveEffectProps> = ({
  color = "green",
  className = "",
}) => {
  const fillColor = colorMap[color] || "#48bb78";

  return (
    <div
      className={`absolute bottom-0 left-0 w-full overflow-hidden ${className}`}
      style={{ height: "120px" }}
    >
      <svg
        className="absolute bottom-0 left-0 w-full"
        height="60"
        viewBox="0 0 100 18"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,15 C15,0 35,18 50,12 C65,6 85,20 100,6 L100,18 L0,18 Z"
          fill={fillColor}
          fillOpacity="0.7"
          className="transition-all duration-300"
        />
      </svg>

      <svg
        className="absolute bottom-0 left-0 w-full"
        height="40"
        viewBox="0 0 100 12"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,6 C20,12 40,3 60,9 C80,15 90,3 100,9 L100,12 L0,12 Z"
          fill={fillColor}
          fillOpacity="0.9"
          className="transition-all duration-300"
        />
      </svg>
    </div>
  );
};

export default WaveEffect;

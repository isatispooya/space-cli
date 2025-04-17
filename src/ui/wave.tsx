import React from "react";
import "./wave.css";

type WaveColorType = "green" | "blue" | "purple" | "red" | "orange" | "dark";

interface WaveEffectProps {
  color?: WaveColorType;
  pathData?: string;
  className?: string;
}

const defaultPathData =
  "M0,192L30,192C60,192,120,192,180,197.3C240,202.7,300,213.3,360,213.3C420,213.3,480,202.7,540,197.3C600,192,660,192,720,197.3C780,202.7,840,213.3,900,213.3C960,213.3,1020,202.7,1080,197.3C1140,192,1200,192,1260,197.3C1320,202.7,1380,213.3,1410,218.7L1440,224L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z";

const bluePath =
  "M0,224L48,213.3C96,203,192,181,288,192C384,203,480,245,576,245.3C672,245,768,203,864,186.7C960,171,1056,181,1152,186.7C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z";

// Color map for direct fill values
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
  pathData,
  className = "",
}) => {
  // Select path data based on color if not provided
  const svgPath = pathData || (color === "blue" ? bluePath : defaultPathData);
  const fillColor = colorMap[color] || "#48bb78";

  return (
    <svg
      className={`wave-svg ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
    >
      <path fill={fillColor} fillOpacity="0.3" d={svgPath}></path>
    </svg>
  );
};

export default WaveEffect;

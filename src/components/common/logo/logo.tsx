import { mali } from "@/assets";

interface LogoProps {
  positionSize: string;
}

const Logo = ({ positionSize }: LogoProps) => {
  return <img src={mali} className={positionSize} />;
};

export default Logo;

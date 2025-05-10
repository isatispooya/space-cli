import { mali } from "@/assets";

interface LogoPropsType {
  positionSize: string;
}

const Logo: React.FC<LogoPropsType> = ({ positionSize }) => {
  return <img src={mali} className={positionSize} />;
};

export default Logo;

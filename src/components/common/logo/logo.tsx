import LOGO from "../../../assets/logo.png";

interface LogoProps {
  positionSize: string;
}

const Logo = ({ positionSize }: LogoProps) => {
  return <img src={LOGO} className={positionSize} />;
};

export default Logo;

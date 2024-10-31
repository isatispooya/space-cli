import React from "react";
import LOGO from "./logo.png";

const Logo = ({ positionSize }) => {
  return <img src={LOGO} className={positionSize} />;
};

export default Logo;

import { ReactNode } from "react";

interface AuthLayoutPropsType {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutPropsType) => {
  return <div>{children}</div>;
};

export default AuthLayout;

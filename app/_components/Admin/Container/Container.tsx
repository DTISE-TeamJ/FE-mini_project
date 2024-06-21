import React, { ReactNode } from "react";
import { ContainerDashboard } from "./style";

interface MainProps {
  children: ReactNode;
}
const Container: React.FC<MainProps> = ({ children }) => {
  return <ContainerDashboard>{children}</ContainerDashboard>;
};

export default Container;

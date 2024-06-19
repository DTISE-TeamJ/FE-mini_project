import React, { ReactNode } from "react";
// import "./Container.css";
import { ContainerDashboard } from "./style";

interface MainProps {
  children: ReactNode;
}
const Container: React.FC<MainProps> = ({ children }) => {
  // return <div className="main">{children}</div>;
  return <ContainerDashboard>{children}</ContainerDashboard>;
};

export default Container;

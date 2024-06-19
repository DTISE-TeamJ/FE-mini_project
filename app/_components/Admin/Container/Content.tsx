import React, { ReactNode } from "react";
// import "./Container.css";
import { ContentDashboard } from "./style";

interface ContentProps {
  children: ReactNode;
}

const Content: React.FC<ContentProps> = ({ children }) => {
  // return <div className="content">{children}</div>;
  return <ContentDashboard>{children}</ContentDashboard>;
};

export default Content;

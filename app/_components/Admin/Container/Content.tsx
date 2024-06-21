import React, { ReactNode } from "react";
import { ContentDashboard } from "./style";

interface ContentProps {
  children: ReactNode;
}

const Content: React.FC<ContentProps> = ({ children }) => {
  return <ContentDashboard>{children}</ContentDashboard>;
};

export default Content;

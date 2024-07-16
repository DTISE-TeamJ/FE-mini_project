import ReduxProvider from "@/store/redux-provider";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <ReduxProvider>{children}</ReduxProvider>
    </div>
  );
};

export default layout;

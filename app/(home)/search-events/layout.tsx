import ReduxProvider from "@/store/redux-provider";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Find Events",
  description: "Find Events",
};

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

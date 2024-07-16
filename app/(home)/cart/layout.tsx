import React from "react";
// import ReduxProvider from "@/store/redux-provider";
import ReduxProvider from "store/redux-provider";
import type { Metadata } from "next";

interface LayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Cart",
  description: "Cart",
};

const layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <ReduxProvider>{children}</ReduxProvider>
    </div>
  );
};

export default layout;

import React from "react";
import { Metadata } from "next";
import ReduxProvider from "@/store/redux-provider";

export const metadata: Metadata = {
  title: "Create New Event",
  description: "Create New Event",
};

interface CreateEventLayoutProps {
  children: React.ReactNode;
}

const CreateEventLayout: React.FC<CreateEventLayoutProps> = ({ children }) => {
  return <ReduxProvider>{children}</ReduxProvider>;
};

export default CreateEventLayout;

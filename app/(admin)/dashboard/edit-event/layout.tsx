import React from "react";
import ReduxProvider from "@/store/redux-provider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events List",
  description: "Events List",
};

interface EditEventProps {
  children: React.ReactNode;
}

const EditEvent: React.FC<EditEventProps> = ({ children }) => {
  return <ReduxProvider>{children}</ReduxProvider>;
};

export default EditEvent;

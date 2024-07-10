import React from "react";
import ReduxProvider from "@/store/redux-provider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events List",
  description: "Events List",
};

interface EventsListLayoutProps {
  children: React.ReactNode;
}

const EventsListLayout: React.FC<EventsListLayoutProps> = ({ children }) => {
  return <ReduxProvider>{children}</ReduxProvider>;
};

export default EventsListLayout;

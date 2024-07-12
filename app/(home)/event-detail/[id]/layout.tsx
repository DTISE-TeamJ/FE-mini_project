import type { Metadata } from "next";
import ReduxProvider from "@/store/redux-provider";

export const metadata: Metadata = {
  title: "Event Detail",
  description: "Event Detail",
};

interface EventDetailLayoutProps {
  children: React.ReactNode;
}

const EventDetailLayout: React.FC<EventDetailLayoutProps> = ({ children }) => {
  return (
    <>
      <ReduxProvider>{children}</ReduxProvider>
    </>
  );
};

export default EventDetailLayout;

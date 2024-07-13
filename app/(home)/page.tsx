"use client";

import EventCategory from "../_components/Home/Events/ByCategory/EventCategory";
import EventLocation from "../_components/Home/Events/ByLocation/EventLocation";
import EventCta from "../_components/Home/Events/EventCta/EventCta";
import Hero from "../_components/Home/Hero/Hero";
import Organizer from "../_components/Home/Organizer/Organizer";
import PromoCta from "../_components/Home/PromoCta/PromoCta";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ReduxProvider from "@/store/redux-provider";
import { useEffect, useState } from "react";
import CustomModal from "../_components/(shared)/CustomModal";

const Home: React.FC = () => {
  // Check session IF user.role === "ADMIN",redirect to /dashboard
  const [showSessionExpiredModal, setShowSessionExpiredModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  if (session?.user?.role === "ADMIN") {
    router.push("/dashboard");
  }

  return (
    <ReduxProvider>
      <Hero
        // searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <EventCategory searchTerm={searchTerm} />
      <EventLocation />
      <EventCta />
      <Organizer />
      <PromoCta />
    </ReduxProvider>
  );
};

export default Home;

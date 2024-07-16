"use client";

import EventCategory from "../_components/Home/Events/ByCategory/EventCategory";
import EventLocation from "../_components/Home/Events/ByLocation/EventLocation";
import EventCta from "../_components/Home/Events/EventCta/EventCta";
import Hero from "../_components/Home/Hero/Hero";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
    <>
      <Hero setSearchTerm={setSearchTerm} />
      <EventCategory />
      <EventLocation />
      <EventCta />
    </>
  );
};

export default Home;

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
      <Hero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <EventCategory searchTerm={searchTerm} />
      <EventLocation />
      <EventCta />
      <Organizer />
      <PromoCta />
    </ReduxProvider>
  );
};

export default Home;

// useEffect(() => {
//   const handleRouteChange = (url: string) => {
//     if (url.includes("/event-detail")) {
//       if (!session) {
//         router.replace("/auth/signin");
//       }
//     }
//   };

//   const cleanup = () => {
//     router.off("routeChangeStart", handleRouteChange);
//   };

//   router.on("routeChangeStart", handleRouteChange);
//   return cleanup;
// }, [session, router]);

// // Check session on mount to display session expired modal if necessary
// useEffect(() => {
//   if (!session) {
//     setShowSessionExpiredModal(true);
//   }
// }, [session]);

// const handleCloseModal = () => {
//   setShowSessionExpiredModal(false);
// };

// const handleLoginAgain = () => {
//   console.log("Redirecting to login page...");
//   router.push("/auth/signin");
//   setShowSessionExpiredModal(false);
// };

{
  /* <CustomModal
        open={showSessionExpiredModal}
        onClose={handleCloseModal}
        title="Session Expired"
        content="Your session has expired. Please log in again."
        primaryActionText="Log In Again"
        onPrimaryAction={handleLoginAgain}
      /> */
}

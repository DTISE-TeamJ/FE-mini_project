import EventCategory from "../_components/Home/Events/ByCategory/EventCategory";
import EventLocation from "../_components/Home/Events/ByLocation/EventLocation";
import EventCta from "../_components/Home/Events/EventCta/EventCta";
import Hero from "../_components/Home/Hero/Hero";
import Organizer from "../_components/Home/Organizer/Organizer";
import PromoCta from "../_components/Home/PromoCta/PromoCta";
import TestLogout from "../_components/Home/Test/TestLogout";

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <TestLogout />
      <EventCategory />
      <EventLocation />
      <EventCta />
      <Organizer />
      <PromoCta />
    </>
  );
};

export default Home;

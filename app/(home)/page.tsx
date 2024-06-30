import EventCategory from "../_components/Home/Events/ByCategory/EventCategory";
import EventLocation from "../_components/Home/Events/ByLocation/EventLocation";
import EventCta from "../_components/Home/Events/EventCta/EventCta";
import Hero from "../_components/Home/Hero/Hero";
import Organizer from "../_components/Home/Organizer/Organizer";
import PromoCta from "../_components/Home/PromoCta/PromoCta";

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <EventCategory />
      <EventLocation />
      <EventCta />
      <Organizer />
      <PromoCta />
    </>
  );
};

export default Home;

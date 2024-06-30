import React from "react";
import LocationMenu from "./LocationMenu";
import Wrapper from "../Wrapper";
import Test from "../ByCategory/Test";
import EventCard from "../EventCard";

const locations = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"];

const EventLocation = () => {
  return (
    <>
      <Wrapper>
        <div className="py-2 text-3xl font-semibold">
          Discover your wave's sweet spot
        </div>
        <LocationMenu locations={locations} />

        {/* Should be EventShowcase instead of EventCard */}
        <EventCard />
        
      </Wrapper>
    </>
  );
};

export default EventLocation;

import React from "react";
import CategoryMenu from "./CategoryMenu";
import Wrapper from "../Wrapper";
import EventCard from "../EventCard";

const EventCategory = () => {
  return (
    <>
      <Wrapper>
        <div className="py-2 text-3xl font-semibold">
          Dive into the waves by category
        </div>
        <CategoryMenu />

        {/* Should be EventShowcase instead of EventCard */}
        <EventCard />
        
      </Wrapper>
    </>
  );
};

export default EventCategory;

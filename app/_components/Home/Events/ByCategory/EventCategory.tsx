// "use client";

import React, { useEffect } from "react";
import CategoryMenu from "./CategoryMenu";
import Wrapper from "../Wrapper";
import EventCard from "../EventCard";
import { RootState, useAppDispatch, useAppSelector } from "@/store";
import CardEventSkeleton from "@/app/_components/Skeleton/CardEventSkeleton";
import { selectActiveCategory } from "@/store/action/category-slice";
import { fetchEvents } from "@/store/action/event-slice";

interface EventCategoryProps {
  searchTerm: string;
}

const EventCategory: React.FC<EventCategoryProps> = ({ searchTerm }) => {
  const dispatch = useAppDispatch();
  const { result, loading, error } = useAppSelector(
    (state: RootState) => state.eventStore
  );

  // const data = result;
  const activeCategory = useAppSelector(selectActiveCategory);

  useEffect(() => {
    dispatch(fetchEvents());
  }, []);

  // console.log(data, "<===");

  if (loading) {
    return (
      <div className="mx-4 my-2">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[...Array(10)].map((_, index) => (
            <CardEventSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  const filteredEvents = Array.isArray(result)
    ? result.filter(
        (event) =>
          event.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (activeCategory === "All" ||
            event.eventCategory?.name === activeCategory)
      )
    : [];

  return (
    <Wrapper>
      <div className="py-2 text-3xl font-semibold">
        Dive into the waves by category
      </div>
      <CategoryMenu />

      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {filteredEvents.map((event: any) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="not found">
          <h1 className="text-center text-2xl font-semibold mt-10">
            Event not found
          </h1>
        </div>
      )}
    </Wrapper>
  );
};

export default EventCategory;

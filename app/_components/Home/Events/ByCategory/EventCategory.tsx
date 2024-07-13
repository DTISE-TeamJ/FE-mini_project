import React, { useEffect } from "react";
import CategoryMenu from "./CategoryMenu";
import Wrapper from "../Wrapper";
import EventCard from "../EventCard";
import { RootState, useAppDispatch, useAppSelector } from "@/store";
import { fetchEvents } from "@/store/action/event-slice";
import CardEventSkeleton from "@/app/_components/Skeleton/CardEventSkeleton";

interface EventCategoryProps {
  searchTerm: string;
}

const EventCategory: React.FC<EventCategoryProps> = ({ searchTerm }) => {
  const dispatch = useAppDispatch();
  const { events, loading, error } = useAppSelector(
    (state: RootState) => state.eventStore
  );

  useEffect(() => {
    dispatch(fetchEvents());
  }, []);

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

  const filteredEvents = events.filter(
    (event) =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.organization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log(filteredEvents, "<== filtered events");

  return (
    <Wrapper>
      <div className="py-2 text-3xl font-semibold">
        Dive into the waves by category
      </div>
      <CategoryMenu />

      {/* Should be EventShowcase instead of EventCard */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 cursor-pointer">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </Wrapper>
  );
};

export default EventCategory;

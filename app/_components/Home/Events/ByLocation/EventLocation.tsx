import React, { useState } from "react";
import LocationMenu from "./LocationMenu";
import Wrapper from "../Wrapper";
import EventCard from "../EventCard";
import { RootState, useAppSelector } from "@/store";
import CardEventSkeleton from "@/app/_components/Skeleton/CardEventSkeleton";

const EventLocation: React.FC = () => {
  const { result, loading, error } = useAppSelector(
    (state: RootState) => state.eventStore
  );

  const data = result;

  const [selectedLocation, setSelectedLocation] = useState<string>(
    "Select your location"
  );
  const [searchTerm, setSearchTerm] = useState<string>("");

  const setLocation: string[] = data?.map((event: any) => event.location) || [];
  const uniqueLocations = [...new Set(setLocation)];

  const filteredEvents =
    selectedLocation === "Select your location"
      ? data?.filter((event: any) =>
          event.name.toLowerCase().includes(searchTerm.toLowerCase())
        ) || []
      : data?.filter(
          (event: any) =>
            event.location === selectedLocation &&
            event.name.toLowerCase().includes(searchTerm.toLowerCase())
        ) || [];

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

  return (
    <Wrapper>
      <div className="py-2 text-3xl font-semibold">
        Discover your wave's sweet spot
      </div>
      <LocationMenu
        locations={uniqueLocations}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        setSearchTerm={setSearchTerm}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 cursor-pointer">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event: any) => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
          <div className="not-found">
            <h1 className="text-center text-2xl font-semibold mt-10">
              No events found
            </h1>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default EventLocation;

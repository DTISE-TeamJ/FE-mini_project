"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/store";
import { PaginatedResponse, searchEvents } from "@/store/action/eventSlice";
import { Event, SearchEventsParams } from "@/types/event";
import debounce from "lodash/debounce";
import EventCard from "@/app/_components/Home/Events/EventCard";
import LocationMenu from "./LocationMenu";
import CategoryMenu from "./CategoryMenu";
import SearchInput from "./SearchInput";
import SortMenu from "./SortMenu";

const EventDiscovery: React.FC = () => {
  const dispatch = useAppDispatch();
  const events = useAppSelector((state: RootState) => state.events.events);
  const totalElements = useAppSelector(
    (state: RootState) => state.events.totalElements
  );

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [size, setSize] = useState(16);
  const [allEventsLoaded, setAllEventsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const resetSearch = () => {
    setSize(16);
    setAllEventsLoaded(false);
  };

  const setKeywordAndReset = (value: string) => {
    setKeyword(value);
    resetSearch();
  };

  const setLocationAndReset = (value: string) => {
    setLocation(value);
    resetSearch();
  };

  const setCategoryAndReset = (value: string) => {
    setCategory(value);
    resetSearch();
  };

  const setSortAndReset = (value: string) => {
    setSort(value);
    resetSearch();
  };

  const observer = useRef<IntersectionObserver | null>(null);
  const lastEventElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (events.length < totalElements) {
            setSize((prevSize) => prevSize + 8);
          } else {
            setAllEventsLoaded(true);
          }
        }
      });
      if (node) observer.current.observe(node);
    },
    [events.length, totalElements]
  );

  const debouncedSearch = useCallback(
    debounce((searchParams) => {
      dispatch(searchEvents(searchParams));
    }, 1000),
    [dispatch]
  );

  useEffect(() => {
    const searchParams: SearchEventsParams = {
      keyword,
      location,
      categoryName: category,
      sort,
      page: 0,
      size,
    };
    setIsLoading(true);
    dispatch(searchEvents(searchParams))
      .unwrap()
      .then((result: PaginatedResponse) => {
        setIsLoading(false);
        if (result.content.length >= result.totalElements) {
          setAllEventsLoaded(true);
        } else {
          setAllEventsLoaded(false);
        }
      })
      .catch((error) => {
        console.error("Error searching events:", error);
        setIsLoading(false);
      });
  }, [keyword, location, category, sort, size, dispatch]);

  return (
    <div className="container mx-auto px-4 pb-8 pt-32">
      <h1 className="text-5xl text-gray-100 text-center font-bold mb-8">
        Event Discovery
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <SearchInput keyword={keyword} setKeyword={setKeywordAndReset} />
        <LocationMenu
          selectedLocation={location}
          setSelectedLocation={setLocationAndReset}
        />
        <CategoryMenu
          selectedCategory={category}
          setSelectedCategory={setCategoryAndReset}
        />
        <SortMenu selectedSort={sort} setSelectedSort={setSortAndReset} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {events.map((event: Event, index: number) => (
          <div
            key={event.id}
            className="h-full"
            ref={index === events.length - 1 ? lastEventElementRef : null}
          >
            <EventCard event={event} />
          </div>
        ))}
      </div>
      {!allEventsLoaded && isLoading && (
        <div className="text-center text-gray-400 py-4">
          Loading more events...
        </div>
      )}
      {allEventsLoaded && (
        <div className="text-center text-gray-400 py-4">
          You've reached the end of the events, nothing more to show
        </div>
      )}
    </div>
  );
};

export default EventDiscovery;

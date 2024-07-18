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
import CardEventSkeleton from "../Skeleton/CardEventSkeleton";

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
  const [initialLoad, setInitialLoad] = useState(true);

  const resetSearch = () => {
    setSize(16);
    setAllEventsLoaded(false);
    setInitialLoad(true);
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

  const performSearch = useCallback((searchParams: SearchEventsParams) => {
    setIsLoading(true);
    dispatch(searchEvents(searchParams))
      .unwrap()
      .then((result: PaginatedResponse) => {
        setIsLoading(false);
        setInitialLoad(false);
        if (result.content.length >= result.totalElements) {
          setAllEventsLoaded(true);
        } else {
          setAllEventsLoaded(false);
        }
      })
      .catch((error) => {
        console.error("Error searching events:", error);
        setIsLoading(false);
        setInitialLoad(false);
      });
  }, [dispatch]);

  const debouncedSearch = useCallback(
    debounce((searchParams: SearchEventsParams) => {
      performSearch(searchParams);
    }, 1200),
    [performSearch]
  );

  const observer = useRef<IntersectionObserver | null>(null);
  const lastEventElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !isLoading && !allEventsLoaded) {
          setSize((prevSize) => prevSize + 8);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, allEventsLoaded]
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
    debouncedSearch(searchParams);
  }, [keyword, location, category, sort, size, debouncedSearch]);

  const renderEventCards = () => {
    if (initialLoad) {
      return Array(16).fill(0).map((_, index) => (
        <CardEventSkeleton key={index} />
      ));
    }

    if (events.length === 0 && !isLoading) {
      return (
        <div className="col-span-full text-center text-gray-400 py-4">
          No events found. Try adjusting your search criteria.
        </div>
      );
    }

    return (
      <>
        {events.map((event: Event, index: number) => (
          <div
            key={event.id}
            className="h-full"
            ref={index === events.length - 1 ? lastEventElementRef : null}
          >
            <EventCard event={event} />
          </div>
        ))}
        {isLoading && !initialLoad && (
          <>
            {Array(8).fill(0).map((_, index) => (
              <CardEventSkeleton key={`loading-${index}`} />
            ))}
          </>
        )}
      </>
    );
  };

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
        {renderEventCards()}
      </div>
      {!initialLoad && !isLoading && !allEventsLoaded && events.length > 0 && (
        <div className="text-center text-gray-400 py-4">
          Scroll down to load more events...
        </div>
      )}
      {allEventsLoaded && events.length > 0 && (
        <div className="text-center text-gray-400 py-4">
          You've reached the end of the events, nothing more to show
        </div>
      )}
    </div>
  );
};

export default EventDiscovery;
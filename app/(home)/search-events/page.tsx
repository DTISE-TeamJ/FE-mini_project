"use client";

import { RootState, useAppDispatch, useAppSelector } from "@/store";
import { fetchEvents, searchEvents } from "@/store/action/event-slice";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import CardEventSkeleton from "@/app/_components/Skeleton/CardEventSkeleton";
import EventCard from "@/app/_components/Home/Events/EventCard";

const SearchEvents: React.FC = () => {
  const dispatch = useAppDispatch();

  const { result, loading, error } = useAppSelector(
    (state: RootState) => state.eventStore
  );

  // const data = useAppSelector((state: RootState) => state.eventStore.result);
  // console.log(data, "<==");

  // console.log(result?.content, "<== search result");

  const data = result;
  // console.log(data, "<== data result");

  useEffect(() => {
    dispatch(fetchEvents());
    // dispatch(searchEvents())
  }, []);

  return (
    <div className="pt-24 bg-custom-gradient overflow-x-hidden">
      <div className="block my-4 md:flex mx-4 py-4 px-16 gap-4">
        <input
          type="text"
          placeholder="Search..."
          // value={search}
          // onChange={handleSearch}
          className="p-2 border rounded"
        />
      </div>
      <div className="mx-4 flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 p-4 md:border-r">
          <h2 className="text-xl mb-4 text-[#fff]">Filters</h2>
          <h3 className="text-lg mb-2 text-[#fff]">Sort By</h3>
          <select
            // onChange={handleSort}
            className="p-2 border rounded w-full mb-4">
            <option value="">Select</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
          <h3 className="text-lg mb-2 text-[#fff]">Filter By Category</h3>
          <select
            // onChange={handleFilter}
            className="p-2 border rounded w-full mb-4">
            <option value="">Select</option>
            <option value="Category 1">Category 1</option>
            <option value="Category 2">Category 2</option>
          </select>
        </div>
        <div className="w-full md:w-3/4 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {loading
              ? [...Array(12)].map((_, index) => (
                  <CardEventSkeleton key={index} />
                ))
              : data?.map((event: any) => (
                  <EventCard key={event.id} event={event} />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchEvents;

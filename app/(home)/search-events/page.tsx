"use client";

import { RootState, useAppDispatch, useAppSelector } from "@/store";
import { fetchEvents } from "@/store/action/event-slice";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import CardEventSkeleton from "@/app/_components/Skeleton/CardEventSkeleton";
import EventCard from "@/app/_components/Home/Events/EventCard";

const SearchEvents: React.FC = () => {
  // const products = [
  //   { id: 1, name: "Product A", category: "Category 1", price: 30 },
  //   { id: 2, name: "Product B", category: "Category 2", price: 20 },
  //   { id: 3, name: "Product C", category: "Category 1", price: 50 },
  //   { id: 4, name: "Product D", category: "Category 2", price: 40 },
  // ];

  // const [search, setSearch] = useState("");
  // const [sort, setSort] = useState("");
  // const [filter, setFilter] = useState("");

  // const handleSearch = (e: any) => setSearch(e.target.value);
  // const handleSort = (e: any) => setSort(e.target.value);
  // const handleFilter = (e: any) => setFilter(e.target.value);

  // const filteredProducts = products
  //   .filter((product) =>
  //     product.name.toLowerCase().includes(search.toLowerCase())
  //   )
  //   .filter((product) => (filter ? product.category === filter : true))
  //   .sort((a, b) => {
  //     if (sort === "price-asc") return a.price - b.price;
  //     if (sort === "price-desc") return b.price - a.price;
  //     return 0;
  //   });

  const dispatch = useAppDispatch();

  const { events, loading, error } = useAppSelector(
    (state: RootState) => state.eventStore
  );

  useEffect(() => {
    dispatch(fetchEvents());
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
              : events.map((event: any) => (
                  <EventCard key={event.id} event={event} />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchEvents;

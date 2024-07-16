"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { searchEventsByCategory } from "@/store/action/categoryEventSlice";
import CategoryMenu from "./CategoryMenu";
import Wrapper from "../Wrapper";
import EventCard from "../EventCard";
import CardEventSkeleton from "@/app/_components/Skeleton/CardEventSkeleton";
import { Event } from "@/types/event";

const EventCategory: React.FC = () => {
  const dispatch = useAppDispatch();
  const { events, loading, error, currentPage, totalPages, pageSize } =
    useAppSelector((state) => state.categoryEvents);
  const activeCategory = useAppSelector((state) => state.events.activeCategory);

  useEffect(() => {
    dispatch(
      searchEventsByCategory({
        category: activeCategory,
        page: currentPage,
        size: pageSize,
      })
    );
  }, [dispatch, activeCategory, currentPage, pageSize]);

  const handleCategoryChange = (category: string) => {
    dispatch({ type: "events/setActiveCategory", payload: category });
    dispatch(searchEventsByCategory({ category, page: 0, size: pageSize }));
  };

  const handlePageChange = (newPage: number) => {
    dispatch(
      searchEventsByCategory({
        category: activeCategory,
        page: newPage,
        size: pageSize,
      })
    );
  };

  return (
    <Wrapper>
      <div className="py-2 text-3xl font-semibold">
        Dive into the waves by category
      </div>
      <CategoryMenu
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      {loading === "pending" ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[...Array(10)].map((_, index) => (
            <CardEventSkeleton key={index} />
          ))}
        </div>
      ) : events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {events.map((event: Event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="not found">
          <h1 className="text-center text-2xl font-semibold mt-10">
            No events within this category are available at the moment
          </h1>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
            className="mx-1 px-3 py-1 border rounded-full bg-white disabled:opacity-50"
          >
            -
          </button>
          <span className="mx-2 font-semibold">{currentPage + 1}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
            className="mx-1 px-3 py-1 border rounded-full bg-white disabled:opacity-50"
          >
            +
          </button>
        </div>
      )}
    </Wrapper>
  );
};

export default EventCategory;

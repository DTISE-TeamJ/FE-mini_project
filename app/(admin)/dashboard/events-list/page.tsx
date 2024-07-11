"use client";

import React, { useEffect } from "react";
import Sidebar from "../../../_components/Admin/Sidebar/Sidebar";
import Container from "../../../_components/Admin/Container/Container";
import Header from "../../../_components/Admin/Header/Header";
import Content from "../../../_components/Admin/Container/Content";
import CardEvent from "@/app/_components/Admin/Card/CardEvent";
import { useAppDispatch, useAppSelector, RootState } from "@/store/index";
import { fetchEvents } from "@/store/action/event-slice";
import CustomError from "@/app/_components/(shared)/CustomError";
import CardEventSkeleton from "@/app/_components/Skeleton/CardEventSkeleton";

const ListEvents: React.FC = () => {
  const dispatch = useAppDispatch();
  const { events, loading, error } = useAppSelector(
    (state: RootState) => state.eventStore
  );

  console.log(events, "<== events");

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchEvents());
  }, []);

  if (loading) {
    return (
      <div className="app flex">
        <Sidebar />
        <Container>
          <Header />
          <Content>
            <h1>List Events</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, index) => (
                <CardEventSkeleton key={index} />
              ))}
            </div>
          </Content>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <CustomError message={error} />
      </div>
    );
  }

  return (
    <div className="app flex">
      <Sidebar />
      <Container>
        <Header />
        <Content>
          <h1>List Events</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event) => (
              <CardEvent key={event.id} event={event} />
            ))}
          </div>
        </Content>
      </Container>
    </div>
  );
};
export default ListEvents;

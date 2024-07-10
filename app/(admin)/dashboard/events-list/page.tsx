"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "../../../_components/Admin/Sidebar/Sidebar";
import Container from "../../../_components/Admin/Container/Container";
import Header from "../../../_components/Admin/Header/Header";
import Content from "../../../_components/Admin/Container/Content";
import CardEvent from "@/app/_components/Admin/Card/CardEvent";
import { useAppDispatch, useAppSelector, RootState } from "@/store/index";
import { fetchEvents } from "@/store/action/event-slice";

interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  organization: string;
  description: string;
  start: string;
  end: string;
  pic: string;
}

const ListEvents: React.FC = () => {
  const dispatch = useAppDispatch();
  const { events, loading, error } = useAppSelector(
    (state: RootState) => state.eventStore
  );

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
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

/*
const ListEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/all-events`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.ok) {
        const result = await response.json();
        setEvents(result.data);
      } else {
        setError(`Failed to fetch events: ${response.statusText}`);
      }
    } catch (error) {
      setError("Error fetching events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log(events, "<==");

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
*/

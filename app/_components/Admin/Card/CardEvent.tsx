"use client";
import React, { useState } from "react";
import Image from "next/image";
import { CardStyle } from "./style";
import CustomModal from "../../(shared)/CustomModal";
import { useAppDispatch } from "@/store";
import { useRouter } from "next/navigation";
import { deleteEvent } from "@/store/action/event-slice";

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
  // Add other event properties as needed
}

interface CardEventProps {
  event: Event;
}

const CardEvent: React.FC<CardEventProps> = ({ event }) => {
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    content: "",
    primaryActionText: "",
    primaryAction: () => {},
  });

  const dispatch = useAppDispatch();
  const router = useRouter();

  const startDate = new Date(event.start);
  const endDate = new Date(event.end);
  const eventDate = new Date(event.date);

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
  };

  const formattedEventDate = `${eventDate.toLocaleDateString(
    undefined,
    dateOptions
  )}: ${eventDate.toLocaleTimeString(undefined, timeOptions)}`;

  const formattedStartTime = startDate.toLocaleTimeString(
    undefined,
    timeOptions
  );

  const formattedEndTime = endDate.toLocaleTimeString(undefined, timeOptions);

  // console.log(formattedEventDate, "<== format event date");

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    // Handle delete logic here
    dispatch(deleteEvent(event.id));
    closeModal();
  };

  const handleEdit = () => {
    // Handle edit logic here
    router.push(`/dashboard/edit-event/${event.id}`);
    closeModal();
  };

  const showDeleteModal = () => {
    setModalContent({
      title: "Confirm Delete",
      content: "Are you sure you want to delete this event?",
      primaryActionText: "Delete",
      primaryAction: handleDelete,
    });
    openModal();
  };

  const showEditModal = () => {
    setModalContent({
      title: "Confirm Edit Event",
      content: "Are you sure you want to edit event details?",
      primaryActionText: "Edit",
      primaryAction: handleEdit,
    });
    openModal();
  };

  return (
    <CardStyle padding="0">
      <Image
        src={event.pic}
        quality={100}
        height={100}
        width={100}
        rel="preload"
        alt={`${event.name}-image`}
        className="rounded-t-[10px] w-full h-full"
      />

      <CustomModal
        open={open}
        onClose={closeModal}
        title={modalContent.title}
        content={modalContent.content}
        primaryActionText={modalContent.primaryActionText}
        onPrimaryAction={modalContent.primaryAction}
      />

      <div className="mx-2">
        <p>{event.description}</p>
        <h1 className="my-2">{event.name}</h1>
        <p>{event.location}</p>
        <p>
          {formattedStartTime} - {formattedEndTime}
        </p>
        <p className="text-red-600 mt-6 mb-2">{formattedEventDate}</p>
        <div className="flex justify-around gap-4">
          <button
            onClick={showEditModal}
            type="button"
            className="my-2 p-2 bg-blue-700 w-full rounded-lg text-[#fff] hover:bg-blue-600">
            Edit
          </button>
          <button
            onClick={showDeleteModal}
            type="button"
            className="my-2 p-2 bg-red-700 w-full rounded-lg text-[#fff] hover:bg-red-600">
            Delete
          </button>
        </div>
      </div>
    </CardStyle>
  );
};

export default CardEvent;

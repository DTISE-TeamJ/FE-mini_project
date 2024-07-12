"use client";
import React, { useState } from "react";
import Image from "next/image";
import { CardStyle } from "./style";
import CustomModal from "../../(shared)/CustomModal";
import { useAppDispatch } from "@/store";
import { useRouter } from "next/navigation";
import { deleteEvent, fetchEvents } from "@/store/action/event-slice";
import { FaCalendar, FaClock, FaMapMarker } from "react-icons/fa";
import { IoIosPricetags } from "react-icons/io";
import moment from "moment";

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

  console.log({ event }, "<== prop event");

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteEvent(event.id));
    } catch (error) {
      console.error("Failed to delete event", error);
    } finally {
      dispatch(fetchEvents());
      closeModal();
    }
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

      <div className="mx-4 my-2">
        <p>{event.description}</p>
        <h1 className="my-2 text-gray-800">{event.name}</h1>

        <div className="flex items-start gap-2 align-middle my-2">
          <FaCalendar width={20} height={20} />
          <span className="text-[#000]">
            {moment(event.start).format("ll")} -{" "}
            {moment(event.end).format("ll")}
          </span>
        </div>
        <div className="flex items-start gap-2 align-middle my-2">
          <FaClock width={20} height={20} />
          <span className="text-[#000]">
            {moment(event.start).format("LT")} -{" "}
            {moment(event.end).format("LT")}
          </span>
        </div>

        <div className="flex items-start align-middle gap-2 my-2">
          <FaMapMarker width={20} height={20} />
          {/* <span className="text-gray-400">{event.location}</span> */}
          <span className="text-[#000]">{event.location}</span>
        </div>

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

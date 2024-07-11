import React from "react";
import Image from "next/image";
// import { Event } from "@/types/event";
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

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  // console.log(event, "<==");
  return (
    <div className="shadow-md rounded-b-2xl bg-white">
      <div className="relative">
        <Image
          src={event?.pic}
          alt={`${event?.name}-image`}
          quality={100}
          width={300}
          height={300}
          rel="preload"
          className="rounded-t-[10px] w-full h-full"
        />
        <div className="absolute bg-white/50 p-2 rounded-xl right-[5%] bottom-[5%]">
          category
        </div>
      </div>
      <div className="p-4 flex flex-col gap-2">
        <div className="text-md font-medium mb-2">{event?.description}</div>
        <div className="text-gray-600 flex flex-col gap-2 text-sm">
          <div className="flex items-start gap-2 align-middle">
            <FaCalendar width={20} height={20} />
            <span className="text-[#000]">
              {moment(event?.start).format("ll")} -{" "}
              {moment(event?.end).format("ll")}
            </span>
          </div>
          <div className="flex items-start gap-2 align-middle">
            <FaClock width={20} height={20} />
            <span className="text-[#000]">
              {moment(event?.start).format("LT")} -{" "}
              {moment(event?.end).format("LT")}
            </span>
          </div>
          <div className="flex items-start gap-2 align-middle">
            <IoIosPricetags width={20} height={20} />
            <span>100,000 - 200,000 (IDR)</span>
          </div>
          <div className="flex items-start gap-2">
            <FaMapMarker width={20} height={20} />
            <span className="text-[#000]">{event?.location}</span>
          </div>
        </div>
        <div className="text-[#000] font-medium text-sm mt-4">
          Organized by {event?.organization}
        </div>
      </div>
    </div>
  );
};

export default EventCard;

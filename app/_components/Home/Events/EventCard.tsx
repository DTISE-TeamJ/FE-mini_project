import React from "react";
import Image from "next/image";
import { FaCalendar, FaClock, FaMapMarker } from "react-icons/fa";
import { IoIosPricetags } from "react-icons/io";
import moment from "moment";
import { useRouter } from "next/navigation";
import { Event } from "@/types/event";

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const router = useRouter();

  const handleDetail = () => {
    router.push(`/event-detail/${event?.id}`);
  };

  const pricing = event?.ticketTypes?.map((ticket) => ticket?.price);
  const sortPrice = pricing?.sort((a, b) => a - b);

  let priceDisplay = "Free";

  if (sortPrice && sortPrice.length > 0) {
    const lowestPrice = Math.min(...sortPrice);
    const highestPrice = Math.max(...sortPrice);

    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });

    const formattedLowestPrice = formatter.format(lowestPrice);
    const formattedHighestPrice = formatter.format(highestPrice);

    priceDisplay =
      lowestPrice === highestPrice
        ? formattedLowestPrice
        : `${formattedLowestPrice} - ${formattedHighestPrice}`;
  }

  return (
    <div
      className="shadow-md rounded-b-2xl rounded-t-2xl bg-white h-full flex flex-col"
      onClick={handleDetail}
    >
      <div className="relative h-[150px] overflow-hidden rounded-t-[10px]">
        <Image
          src={event?.pic}
          alt={`${event?.name}-image`}
          quality={100}
          width={500}
          height={150}
          className="w-full h-full object-cover object-center cursor-pointer"
        />
        <div className="absolute bg-white/50 p-2 rounded-s-full text-xs text-[#353535] right-[-0%] bottom-[0%] cursor-pointer">
          {event?.eventCategory?.name}
        </div>
      </div>
      <div className="p-4 flex flex-col gap-2 flex-grow">
        <div className="text-md font-medium mb-2 cursor-pointer">
          {event?.description}
        </div>
        <div className="text-gray-600 flex flex-col gap-2 text-sm">
          <div className="flex items-start gap-2 align-middle cursor-pointer">
            <FaCalendar width={20} height={20} />
            <span className="text-[#000]">
              {moment(event?.start).format("ll")} -{" "}
              {moment(event?.end).format("ll")}
            </span>
          </div>
          <div className="flex items-start gap-2 align-middle cursor-pointer">
            <FaClock width={20} height={20} />
            <span className="text-[#000]">
              {moment(event?.start).format("LT")} -{" "}
              {moment(event?.end).format("LT")}
            </span>
          </div>
          <div className="flex items-start gap-2 align-middle cursor-pointer">
            <IoIosPricetags width={20} height={20} />
            <span>{priceDisplay}</span>
          </div>
          <div className="flex items-start gap-2 cursor-pointer">
            <FaMapMarker width={20} height={20} />
            <span className="text-[#000]">{event?.location}</span>
          </div>
        </div>
      </div>
      <div className="text-[#000] font-medium text-sm mt-2 mb-4 px-4 cursor-pointer">
        Organized by {event?.organization}
      </div>
    </div>
  );
};

export default EventCard;

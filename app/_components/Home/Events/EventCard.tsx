import React from "react";
import Image from "next/image";
import { FaCalendar, FaClock, FaMapMarker } from "react-icons/fa";
import { IoIosPricetags } from "react-icons/io";
import moment from "moment";
import { useRouter } from "next/navigation";

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
  eventCategory?: { id: number; name: string };
  user: [];
  ticketTypes?: [
    {
      eventId: number;
      id: number;
      name: string;
      price: number;
      quantity: number;
    }
  ];
  promos: [];
}

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const router = useRouter();

  const handleDetail = () => {
    router.push(`/event-detail/${event?.id}/${event?.name}`);
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
      minimumFractionDigits: 0, // Adjust decimals as needed
    });

    const formattedLowestPrice = formatter.format(lowestPrice);
    const formattedHighestPrice = formatter.format(highestPrice);

    priceDisplay =
      lowestPrice === highestPrice
        ? formattedLowestPrice
        : `${formattedLowestPrice} - ${formattedHighestPrice}`;
  }

  return (
    <div className="shadow-md rounded-b-2xl bg-white " onClick={handleDetail}>
      <div className="relative ">
        <Image
          src={event?.pic}
          alt={`${event?.name}-image`}
          quality={100}
          width={300}
          height={300}
          className="rounded-t-[10px] w-full h-full cursor-pointer"
        />
        <div className="absolute bg-white/50 p-2 rounded-s-full text-xs text-[#353535] right-[-2%] bottom-[0%] cursor-pointer">
          {event?.eventCategory?.name}
        </div>
      </div>
      <div className="p-4 flex flex-col gap-2">
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
        <div className="text-[#000] font-medium text-sm mt-4 cursor-pointer">
          Organized by {event?.organization}
        </div>
      </div>
    </div>
  );
};

export default EventCard;

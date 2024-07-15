"use client";

import React, { useEffect, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/store";
import { fetchEventDetail } from "@/store/action/event-slice";
import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import moment from "moment";
import BrokenImage from "@/assets/broken-image.png";
import { usePathname, useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { addOrderItem } from "@/store/action/order-slice";

interface EventDetailProps {
  params: {
    id: string;
  };
}

interface TicketType {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const EventDetail: React.FC<EventDetailProps> = ({ params }) => {
  const [selectedTickets, setSelectedTickets] = useState<
    { ticket: TicketType; quantity: number }[]
  >([]);
  const id = parseInt(params.id, 10);
  console.log(id, "<== id detail");
  const dispatch = useAppDispatch();

  const { data: session, status } = useSession();
  const router = useRouter();

  const eventDetail = useAppSelector((state: RootState) =>
    state?.eventStore?.result?.find((event: any) => event?.id === id)
  );

  const loading = useAppSelector(
    (state: RootState) => state?.eventStore?.loading
  );

  const error = useAppSelector((state: RootState) => state?.eventStore?.error);

  useEffect(() => {
    if (status === "loading") return;

    if (status === "authenticated") {
      if (session?.user?.role === "USER") {
        dispatch(fetchEventDetail(id));
      } else {
        router.push("/");
      }
    } else {
      signIn(undefined, {
        callbackUrl: `${window.location.origin}/event-detail/${id}`,
      });
    }
  }, [dispatch, id, router, session]);

  const formatPrice = (price: number | undefined) => {
    if (!price) return "";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!eventDetail) {
    return <p>Event not found</p>;
  }

  const handleTicketSelection = (
    ticket: TicketType,
    quantityChange: number
  ) => {
    const existingTicketIndex = selectedTickets.findIndex(
      (t) => t.ticket.id === ticket.id
    );
    const currentQuantity =
      existingTicketIndex !== -1
        ? selectedTickets[existingTicketIndex].quantity
        : 0;
    let newQuantity = currentQuantity + quantityChange;

    if (newQuantity < 0) {
      newQuantity = 0;
    } else if (newQuantity > ticket.quantity) {
      newQuantity = ticket.quantity;
    }

    if (existingTicketIndex !== -1) {
      const updatedTickets = [...selectedTickets];
      updatedTickets[existingTicketIndex].quantity = newQuantity;
      setSelectedTickets(updatedTickets);
    } else {
      setSelectedTickets([
        ...selectedTickets,
        { ticket, quantity: newQuantity },
      ]);
    }
  };

  const handleOrderNow = () => {
    if (session?.user?.id) {
      const orderData: OrderData = {
        userId: parseInt(session.user.id),
        ticketRequests: selectedTickets.map(({ ticket, quantity }) => ({
          ticketTypeId: ticket.id,
          quantity,
        })),
      };

      try {
        dispatch(addOrderItem(orderData));
      } catch (error) {
        console.error(error);
      }

      router.push("/cart");
    }
  };

  const totalPrice = selectedTickets.reduce((total, { ticket, quantity }) => {
    return total + ticket.price * quantity;
  }, 0);

  const isOrderDisabled = selectedTickets.length === 0;

  return (
    <div className="bg-custom-gradient w-full h-full">
      <div className="flex justify-center mx-4 md:mx-8 shadow-orange-500">
        {loading ? (
          <div className="w-full h-full md:h-[400px] mt-20 rounded-lg bg-gray-300 animate-pulse" />
        ) : (
          <Image
            src={eventDetail?.pic || BrokenImage}
            alt={eventDetail?.name || "error"}
            quality={100}
            height={1000}
            width={1000}
            rel="preload"
            className="w-full h-full md:h-[400px] mt-20 rounded-lg bg-[#fff]"
          />
        )}
      </div>

      <div className="info grid grid-cols-1 md:grid-cols-2 mx-4 md:mx-8 mt-6">
        <div className="info1 mx-4 md:mx-8">
          <h1
            className={`text-2xl font-semibold mt-4 text-[#fff] ${
              loading ? "bg-gray-300 animate-pulse h-8 w-3/4 rounded" : ""
            }`}>
            {eventDetail?.name}
          </h1>
          <div className="flex justify-start gap-2 items-center mt-4 text-[#fff]">
            <FaLocationDot className="text-[#fff]" size={24} />
            <p
              className={`text-xl text-[#fff] ${
                loading ? "bg-gray-300 animate-pulse h-4 w-1/2 rounded" : ""
              }`}>
              {eventDetail?.location}
            </p>
          </div>
          <div
            className={`description mt-4 ${
              loading ? "bg-gray-300 animate-pulse h-16 w-full rounded" : ""
            }`}>
            <p
              className={`text-xl text-[#fff] ${
                loading ? "h-4 w-3/4 rounded" : ""
              }`}>
              {eventDetail?.description}
            </p>
          </div>
          <div className="border p-4 rounded-lg block mt-4 w-full">
            <div className="date flex justify-start gap-2 items-center">
              <FaCalendarAlt className="text-[#fff]" size={16} />
              <span
                className={`text-[#fff] ${
                  loading ? "bg-gray-300 animate-pulse h-4 w-3/4 rounded" : ""
                }`}>
                {moment(eventDetail?.start).format("ll")} -{" "}
                {moment(eventDetail?.end).format("ll")}
              </span>
            </div>

            <div className="time flex justify-start gap-2 items-center mt-4">
              <FaClock className="text-[#fff]" size={16} />
              <span
                className={`text-[#fff] ${
                  loading ? "bg-gray-300 animate-pulse h-4 w-3/4 rounded" : ""
                }`}>
                {moment(eventDetail?.start).format("LT")} -{" "}
                {moment(eventDetail?.end).format("LT")}
              </span>
            </div>
          </div>

          <div className="mt-4">
            {eventDetail?.ticketTypes.map((ticket: TicketType) => {
              const selectedTicket = selectedTickets.find(
                (t) => t.ticket.id === ticket.id
              );
              const remainingQuantity =
                ticket.quantity - (selectedTicket?.quantity || 0);

              return (
                <div
                  key={ticket.id}
                  className={`ticket-item flex flex-row md:flex-row justify-between items-start md:items-center mt-4 p-4 border rounded-lg ${
                    loading
                      ? "bg-gray-300 animate-pulse h-24 w-full rounded"
                      : ""
                  }`}>
                  <div className="ticket-info">
                    <p className="text-xl text-[#fff] my-2">{ticket.name}</p>
                    <div className="block">
                      <span className="text-sm text-[#fff] my-2">
                        {formatPrice(ticket.price)}
                      </span>
                    </div>
                    <span className="text-xs text-[#acacac] my-2">
                      Available: {remainingQuantity}
                    </span>
                  </div>
                  <div className="ticket-actions flex items-center py-4">
                    <button
                      onClick={() => handleTicketSelection(ticket, -1)}
                      disabled={selectedTicket?.quantity === 0}
                      className="px-2 py-1 text-[#fff] text-xl rounded-lg mr-2 cursor-pointer">
                      -
                    </button>
                    <span className="text-xl text-[#fff]">
                      {selectedTicket?.quantity || 0}
                    </span>
                    <button
                      aria-disabled
                      onClick={() => handleTicketSelection(ticket, 1)}
                      disabled={remainingQuantity === 0}
                      className="px-2 py-1 text-[#fff] text-xl rounded-lg ml-2 cursor-pointer">
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="info2 mx-4 md:mx-8">
          <div className="order-summary mt-8 p-4 border rounded-lg">
            <h2 className="text-2xl text-[#fff]">Order Summary</h2>
            <div className="mt-4">
              {selectedTickets.map(({ ticket, quantity }) => (
                <div
                  key={ticket.id}
                  className="flex justify-between items-center mt-4">
                  <p className="text-xl text-[#fff]">{ticket.name}</p>
                  <p className="text-xl text-[#fff]">{quantity}</p>
                  <p className="text-xl text-[#fff]">
                    {formatPrice(ticket.price * quantity)}
                  </p>
                </div>
              ))}
              <div className="flex justify-between items-center mt-4">
                <p className="text-xl text-[#fff]">Total</p>
                <p className="text-xl text-[#fff]">{formatPrice(totalPrice)}</p>
              </div>

              <div className="order-actions mt-4 ">
                <button
                  onClick={handleOrderNow}
                  disabled={isOrderDisabled}
                  className="px-4 py-2 bg-[#fff] text-[#000] rounded-lg w-full font-semibold">
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;

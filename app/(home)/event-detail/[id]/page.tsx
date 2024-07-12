"use client";

import React, { useEffect, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/store";
import { fetchEventDetail } from "@/store/action/event-slice";
import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import { RiUserStarFill } from "react-icons/ri";
import moment from "moment";
import BrokenImage from "@/assets/broken-image.png";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

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
  const dispatch = useAppDispatch();

  const { data: session, status } = useSession();
  const router = useRouter();

  const eventDetail = useAppSelector((state: RootState) =>
    state?.eventStore?.events?.find((event) => event?.id === id)
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
      // signIn("credentials", {
      //   callbackUrl: `${window.location.origin}/event-detail/${id}`,
      // });
    }
  }, [dispatch, id, router, session]);

  console.log(window.location.origin);

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
    console.log("Ordering tickets:", selectedTickets);
    // Place your order logic here
    setSelectedTickets([]);
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
              const remainingTickets =
                ticket.quantity - (selectedTicket?.quantity || 0);

              return (
                <div
                  key={ticket.id}
                  className="border p-4 rounded-lg block mt-4 w-full">
                  <div className="date items-center">
                    <h1 className="text-[#fff] font-bold text-xl font-kanit my-4">
                      {ticket.name}
                    </h1>
                    <p className="text-[#acacac] font-semibold text-sm my-4 ms-4">
                      Price include tax
                    </p>
                    <p className="text-[#fff] font-bold text-xl font-mono my-4">
                      {formatPrice(ticket.price)}
                    </p>
                    <div className="flex justify-between mt-4">
                      <div className="flex items-center">
                        <button
                          type="button"
                          className={`px-4 py-2 bg-blue-700 text-white rounded-lg ${
                            loading
                              ? "bg-gray-300 animate-pulse h-8 w-1/4 rounded"
                              : ""
                          }`}
                          onClick={() => handleTicketSelection(ticket, 1)} // Increment by 1
                          disabled={
                            selectedTicket?.quantity === ticket.quantity
                          } // Disable button when max tickets reached
                        >
                          +
                        </button>
                        <input
                          type="number"
                          min={0}
                          max={ticket.quantity}
                          className={`px-4 py-2 border rounded-md  text-center ${
                            loading
                              ? "bg-gray-300 animate-pulse h-8  rounded"
                              : ""
                          }`}
                          value={selectedTicket?.quantity || 0}
                          onChange={(e) => {
                            const newQuantity = parseInt(e.target.value) || 0;
                            handleTicketSelection(
                              ticket,
                              newQuantity - (selectedTicket?.quantity || 0)
                            );
                          }}
                        />
                        <button
                          type="button"
                          className={`px-4 py-2 bg-red-700 text-white rounded-lg ${
                            loading
                              ? "bg-gray-300 animate-pulse h-8 w-1/4 rounded"
                              : ""
                          }`}
                          onClick={() => handleTicketSelection(ticket, -1)}
                          disabled={selectedTicket?.quantity === 0}>
                          -
                        </button>
                      </div>
                      <p
                        className={`text-[#fff] text-sm ${
                          loading
                            ? "bg-gray-300 animate-pulse h-4 w-1/4 rounded"
                            : ""
                        }`}>
                        {remainingTickets > 0
                          ? `${remainingTickets} tickets left`
                          : "Tickets sold out"}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="info2 mx-4 md:mx-8">
          <div className="border p-4 rounded-lg block mt-4 w-full">
            <h1
              className={`text-[#acacac] text-xl ${
                loading ? "bg-gray-300 animate-pulse h-4 w-1/2 rounded" : ""
              }`}>
              Hosted by
            </h1>
            <div className="date flex justify-start gap-2 items-center my-4 ms-4">
              <RiUserStarFill className="text-[#fff]" size={32} />
              <p
                className={`text-[#fff] text-lg ${
                  loading ? "bg-gray-300 animate-pulse h-4 w-1/2 rounded" : ""
                }`}>
                {eventDetail?.organization}
              </p>
            </div>
          </div>

          <div className="border p-4 rounded-lg block mt-4 w-full my-4">
            <div className="order">
              <h1
                className={`text-[#fff] my-4 ${
                  loading ? "bg-gray-300 animate-pulse h-8 w-3/4 rounded" : ""
                }`}>
                Your ticket order
              </h1>
              {loading ? (
                <div className="h-16 bg-gray-300 rounded animate-pulse mt-4 w-full" />
              ) : selectedTickets.length === 0 ? (
                <p className="text-[#acacac] my-4">No ticket selected</p>
              ) : (
                <div>
                  {selectedTickets.map(({ ticket, quantity }) => (
                    <div
                      key={ticket.id}
                      className="flex justify-between items-center my-2">
                      <p className="text-[#fff]">
                        {ticket.name} x {quantity}
                      </p>
                      <p className="text-[#fff] font-bold">
                        {formatPrice(ticket.price * quantity)}
                      </p>
                    </div>
                  ))}
                  <p className="text-[#fff] font-bold mt-4">
                    Total: {formatPrice(totalPrice)}
                  </p>
                </div>
              )}

              <button
                type="button"
                className={`p-2 bg-green-700 w-full rounded-lg text-[#fff] hover:bg-green-600 ${
                  isOrderDisabled ? "opacity-50 cursor-not-allowed" : ""
                } ${loading ? "bg-gray-300 animate-pulse h-12 rounded" : ""}`}
                onClick={handleOrderNow}
                disabled={isOrderDisabled}>
                {loading ? "Loading..." : "Order Now"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;

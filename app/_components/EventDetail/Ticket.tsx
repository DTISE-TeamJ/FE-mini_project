"use client";

import React, { useEffect } from "react";
import TicketCard from "./TicketCard";
import OrderList from "./OrderList";

interface TicketProps {
  onClose?: () => void;
}

const Ticket: React.FC<TicketProps> = ({ onClose }) => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = event.target as HTMLDivElement;
    if (target.classList.contains("bg-gray-400/50")) {
      onClose?.();
    }
  };

  useEffect(() => {
    document.body.classList.add("no-scroll");

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-400/50 z-50"
        onClick={handleClick}
      >
        <div
          className="w-full h-full flex justify-center items-center
                        mx-auto
                        md:mx-6 md:h-[75%]
                        lg:mx-12
                        xl:max-w-[1400px] xl:mx-18"
        >
          <div
            className="relative bg-white w-full h-full shadow-2xl flex flex-col 
                        md:flex-row md:h-full md:rounded-lg"
          >
            <div
              className="p-6
                          md:w-[70%] md:p-8"
            >
              <div
                className="flex flex-col gap-2 mb-2 border-b-2 pb-2
                              md:mb-10 md:pb-6"
              >
                <div className="text-2xl font-semibold mb-2">Title</div>
                <div className="flex">
                  <div className="w-[50%]">Date</div>
                  <div className="w-[50%]">Time</div>
                </div>
              </div>
              <div className="text-2xl font-semibold mb-4">Tickets</div>
              <div
                className="flex flex-col gap-2 h-[calc(90% - 250px)] overflow-y-auto pb-10 scrollbar-hide
                            md:h-[calc(75% - 300px)] md:overflow-y-scroll md:scrollbar-hide"
                style={{ maxHeight: "calc(75vh - 250px)" }}
              >
                <TicketCard />
                <TicketCard />
                <TicketCard />
                <TicketCard />
                <TicketCard />
                <TicketCard />
                <TicketCard />
                <TicketCard />
                <TicketCard />
                <TicketCard />
                <TicketCard />
                <TicketCard />
                <TicketCard />
                <TicketCard />
              </div>
            </div>
            <div
              className="text-2xl font-semibold border-t-2 p-6
                          md:w-[30%] md:p-8 md:border-l-2  md:border-t-0"
            >
              <div
                className="text-2xl font-semibold pb-2 md:py-0
              md:mb-6"
              >
                Order Summary
              </div>
              <div className="overflow-y-scroll h-[20%] md:h-[75%] flex flex-col gap-2">
                <OrderList />
                <OrderList />
                <OrderList />
                <OrderList />
                <OrderList />
                <OrderList />
                <OrderList />
                <OrderList />
                <OrderList />
                <OrderList />
                <OrderList />
              </div>
            </div>
            <button
              className="absolute top-4 right-4 bg-cyan-400 hover:bg-cyan-700 text-white text-xl font-bold py-1 px-3 rounded-full"
              onClick={onClose}
            >
              ×
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ticket;

import React from "react";

const TicketCard = () => {
  return (
    <>
      <div className="border-2 p-[10px] rounded-xl border-cyan-500 text-base text-gray-700">
        <div className="flex justify-between">
          <div>Ticket type/tier/title</div>
          <div>Quantity</div>
        </div>
        <div className="">Ticket description</div>
        <div className="">Ticket price</div>
      </div>
    </>
  );
};

export default TicketCard;

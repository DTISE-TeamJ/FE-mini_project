import React from "react";

const OrderList = () => {
  return (
    <>
      <div className="text-sm font-normal border-b py-2">
        <div className="flex gap-4 mb-2">
          <div className="w-[80%]">Ticket Golden, VIP on the Chair Seat</div>
          <div className="w-[20%]">@999</div>
        </div>
        <div className="">
          Price: IDR
          <span> 100,500,500</span>
        </div>
      </div>
    </>
  );
};

export default OrderList;

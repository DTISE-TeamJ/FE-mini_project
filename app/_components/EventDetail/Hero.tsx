"use client";

import React, { useState } from "react";
import Wrapper from "../Home/Events/Wrapper";
import Image from "next/image";
import Test from "@/assets/signupLandscape.webp";
import Calendar from "@/assets/icons/calendar.svg";
import Clock from "@/assets/icons/clock.svg";
import Ticket from "./Ticket";

const Hero = () => {
  const [isTicketVisible, setIsTicketVisible] = useState(false);

  const titleStyle = "text-xl font-medium";

  const handleClick = () => {
    setIsTicketVisible(true);
  };

  const handleCloseTicket = () => {
    setIsTicketVisible(false);
  };

  return (
    <>
      <div className="mt-20"></div>
      <Wrapper>
        <div className="flex justify-center items-center">
          <Image alt="" height={1000} src={Test} className="rounded-2xl" />
        </div>
        <div className="flex flex-col gap-12 my-10">
          <div className="flex justify-between items-start">
            <div className="text-5xl font-semibold">name</div>
            <div className="h-[160px] w-[320px] bg-white flex justify-center items-end shadow-xl rounded-2xl">
              <div></div>
              <button
                className="bg-cyan-500 text-white font-bold py-2 px-4 mb-4 rounded-full shadow-md hover:bg-blue-600 transition duration-300"
                onClick={handleClick}
              >
                Tickets
              </button>
            </div>
          </div>
          <div>
            <div className={titleStyle}>Organized by user.name</div>
          </div>
          <div>
            <div className={titleStyle}>Date and Time</div>
            <div className="flex items-start gap-2">
              <Image alt="" src={Calendar} width={25} />
              <span>date</span>
            </div>
            <div className="flex items-start gap-2">
              <Image alt="" src={Clock} width={25} />
              <span>start - end</span>
            </div>
          </div>
          <div>
            <div className={titleStyle}>Location</div>
            <div>location</div>
          </div>
          <div>
            <div className={titleStyle}>Event Description</div>
            <div>description</div>
          </div>
        </div>
      </Wrapper>
      {isTicketVisible && <Ticket onClose={handleCloseTicket} />}
    </>
  );
};

export default Hero;

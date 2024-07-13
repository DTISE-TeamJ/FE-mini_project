import React from "react";
import Image from "next/image";
import Tests from "@/assets/signupLandscape.webp";
import Calendar from "@/assets/icons/calendar.svg";
import Clock from "@/assets/icons/clock.svg";
import CurrencyDollar from "@/assets/icons/currencydollar.svg";
import MapPin from "@/assets/icons/mapPin.svg";

const Test = () => {
  return (
    <div
      className="grid grid-cols-1 gap-4
                      sm:grid-cols-2
                      md:grid-cols-3
                      lg:grid-cols-4">
      <div className="shadow-md rounded-b-2xl bg-white">
        <div className="relative">
          <Image src={Tests} alt="" className="" />
          <div className="absolute bg-white/50 p-2 rounded-xl right-[5%] bottom-[5%]">
            category
          </div>
        </div>
        <div
          className="p-4 flex flex-col gap-2
          sm:h-[240px]">
          <div className="text-2xl font-medium mb-2">name</div>
          <div className="text-gray-600 flex flex-col gap-2 text-sm">
            <div className="flex items-start gap-2">
              <Image
                src={Calendar}
                alt="Calendar Icon"
                width={20}
                height={20}
              />
              <span>date</span>
            </div>
            <div className="flex items-start gap-2">
              <Image src={Clock} alt="Clock Icon" width={20} height={20} />
              <span>start - end</span>
            </div>
            <div className="flex items-start gap-2">
              <Image
                src={CurrencyDollar}
                alt="Currency Dollar Icon"
                width={20}
                height={20}
              />
              <span>100,000 - 200,000 (IDR)</span>
            </div>
            <div className="flex items-start gap-2">
              <Image src={MapPin} alt="Map Pin Icon" width={20} height={20} />
              <span>location</span>
            </div>
          </div>
          <div className="text-gray-600 font-medium mt-auto text-sm">
            Organized by user.name
          </div>
        </div>
      </div>

      <div className="shadow-md rounded-b-2xl bg-white">
        <div className="relative">
          <Image src={Tests} alt="" className="" />
          <div className="absolute bg-white/50 p-2 rounded-xl right-[5%] bottom-[5%]">
            category
          </div>
        </div>
        <div
          className="p-4 flex flex-col gap-2
          sm:h-[240px]">
          <div className="text-2xl font-medium mb-2">name</div>
          <div className="text-gray-600 flex flex-col gap-2 text-sm">
            <div className="flex items-start gap-2">
              <Image
                src={Calendar}
                alt="Calendar Icon"
                width={20}
                height={20}
              />
              <span>date</span>
            </div>
            <div className="flex items-start gap-2">
              <Image src={Clock} alt="Clock Icon" width={20} height={20} />
              <span>start - end</span>
            </div>
            <div className="flex items-start gap-2">
              <Image
                src={CurrencyDollar}
                alt="Currency Dollar Icon"
                width={20}
                height={20}
              />
              <span>100,000 - 200,000 (IDR)</span>
            </div>
            <div className="flex items-start gap-2">
              <Image src={MapPin} alt="Map Pin Icon" width={20} height={20} />
              <span>location</span>
            </div>
          </div>
          <div className="text-gray-600 font-medium mt-auto text-sm">
            Organized by user.name
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;

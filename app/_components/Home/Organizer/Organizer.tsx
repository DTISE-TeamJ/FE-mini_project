import React from "react";
import Wrapper from "../Events/Wrapper";
import Image from "next/image";
import Organizer1 from "@/assets/signupLandscape.webp";
import Organizer2 from "@/assets/signupLandscape.webp";
import Organizer3 from "@/assets/signupLandscape.webp";

const Organizer = () => {
  const organizers = [
    { name: "Organizer 1", image: Organizer1 },
    { name: "Organizer 2", image: Organizer2 },
    { name: "Organizer 3", image: Organizer3 },
  ];

// Organizer name and image shall be taken from the user, to be changed later

  return (
    <div className="py-6">
      <Wrapper>
        <div className="mx-auto xl:max-w-[1400px] text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Popular Organizers
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6">
            {organizers.map((organizer, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md"
              >
                <Image
                  src={organizer.image}
                  alt={organizer.name}
                  className="rounded-full mb-4 object-cover object-center"
                  width={100}
                  height={100}
                />
                <h3 className="text-xl font-medium text-gray-700">
                  {organizer.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Organizer;

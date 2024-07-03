import React from "react";
import Wrapper from "../Events/Wrapper";

const PromoCta = () => {
  return (
    <div className="bg-white py-6">
      <Wrapper>
        <div className="flex justify-center items-center mx-auto xl:max-w-[1400px]">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Discover Exclusive Promos
            </h2>
            <p className="text-gray-600 mb-4">
              Wanna save some board during your surfs?
              <br />
              Let's deep dive and seek promos with WaveFest!
            </p>
            <button className="bg-cyan-500 text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition duration-300">
              Explore Promos
            </button>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default PromoCta;

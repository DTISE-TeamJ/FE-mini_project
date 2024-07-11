import React from "react";

const HeroSkeleton: React.FC = () => {
  return (
    <div className="w-full h-screen relative bg-gray-300 animate-pulse">
      <div className="absolute w-full h-full top-0 left-0 bg-gray-900/30"></div>
      <div className="absolute top-0 w-full h-full flex flex-col justify-center text-center text-white p-4">
        <div className="h-10 bg-gray-500 rounded mb-4"></div>
        <div className="h-8 bg-gray-500 rounded mb-4"></div>
        <div className="flex justify-between items-center max-w-[700px] mx-auto w-full border p-1 rounded-md bg-gray-100/90">
          <div className="h-10 bg-gray-500 rounded w-full"></div>
          <div className="h-10 w-10 bg-gray-500 rounded ml-2"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSkeleton;

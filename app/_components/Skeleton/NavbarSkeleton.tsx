import React from "react";

const NavbarSkeleton: React.FC = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-300 animate-pulse">
      <div className="h-8 bg-gray-500 rounded w-32"></div>
      <div className="flex space-x-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="h-6 bg-gray-500 rounded w-20"></div>
        ))}
      </div>
      <div className="flex space-x-4">
        <div className="h-8 w-8 bg-gray-500 rounded-full"></div>
        <div className="h-8 w-8 bg-gray-500 rounded-full"></div>
      </div>
    </div>
  );
};

export default NavbarSkeleton;

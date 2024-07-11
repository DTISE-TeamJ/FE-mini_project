import React from "react";

const FooterSkeleton: React.FC = () => {
  return (
    <div className="p-4 bg-gray-300 animate-pulse">
      <div className="flex justify-between items-start mb-4">
        <div className="w-1/4">
          <div className="h-6 bg-gray-500 rounded mb-2"></div>
          <div className="h-4 bg-gray-500 rounded mb-2 w-3/4"></div>
          <div className="h-4 bg-gray-500 rounded mb-2 w-2/3"></div>
          <div className="h-4 bg-gray-500 rounded mb-2 w-1/2"></div>
        </div>
        <div className="w-1/4">
          <div className="h-6 bg-gray-500 rounded mb-2"></div>
          <div className="h-4 bg-gray-500 rounded mb-2 w-3/4"></div>
          <div className="h-4 bg-gray-500 rounded mb-2 w-2/3"></div>
          <div className="h-4 bg-gray-500 rounded mb-2 w-1/2"></div>
        </div>
        <div className="w-1/4">
          <div className="h-6 bg-gray-500 rounded mb-2"></div>
          <div className="h-4 bg-gray-500 rounded mb-2 w-3/4"></div>
          <div className="h-4 bg-gray-500 rounded mb-2 w-2/3"></div>
          <div className="h-4 bg-gray-500 rounded mb-2 w-1/2"></div>
        </div>
        <div className="w-1/4">
          <div className="h-6 bg-gray-500 rounded mb-2"></div>
          <div className="h-4 bg-gray-500 rounded mb-2 w-3/4"></div>
          <div className="h-4 bg-gray-500 rounded mb-2 w-2/3"></div>
          <div className="h-4 bg-gray-500 rounded mb-2 w-1/2"></div>
        </div>
      </div>
      <div className="h-6 bg-gray-500 rounded mt-4"></div>
    </div>
  );
};

export default FooterSkeleton;

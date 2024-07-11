import React from "react";

interface CustomErrorProps {
  message: React.ReactNode;
}

const CustomError: React.FC<CustomErrorProps> = ({ message }) => {
  return (
    <div className="fixed z-10 inset-0 flex justify-center items-center transition-colors bg-black/20">
      <div className="bg-white rounded-xl shadow p-6 transition-all scale-100 opacity-100">
        <div className="text-center w-full">
          <div className="mx-auto my-4 w-full">
            <h3 className="text-lg font-black text-red-500">{message}</h3>
            <h3 className="text-lg font-black text-red-500 my-4">
              Please try again !
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomError;

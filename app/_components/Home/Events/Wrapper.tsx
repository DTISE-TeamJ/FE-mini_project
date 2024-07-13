import React from "react";

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <div
      className="px-4 mx-auto my-6
    sm:px-6
    lg:px-12
    xl:max-w-[1400px] xl:px-18">
      {children}
    </div>
  );
};

export default Wrapper;

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

type FormLayoutProps = {
  children: React.ReactNode;
  title: string;
  linkText: string;
  linkHref: string;
  portraitSrc: any;
  landscapeSrc: any;
};

const FormLayout: React.FC<FormLayoutProps> = ({
  children,
  title,
  linkText,
  linkHref,
  portraitSrc,
  landscapeSrc,
}) => {
  return (
    <div className="relative bg-white">
      <div>
        <Image
          src={portraitSrc}
          alt="Background Image"
          className="object-cover object-center h-[1000px] sm:hidden"
        />
      </div>
      <div>
        <Image
          src={landscapeSrc}
          alt="Background Image"
          className="object-cover object-left hidden h-screen sm:flex"
        />
      </div>

      <div className="absolute top-[20%] sm:left-[50%] sm:transform sm:-translate-x-1/2 sm:top-[50%] sm:-translate-y-1/2 xl:translate-x-0">
        <div className="px-6 rounded-t-2xl h-[800px] w-screen bg-white/70 shadow-lg sm:m-2 sm:rounded-2xl sm:w-[600px] sm:bg-white/80 sm:h-full sm:p-10 2xl:w-[700px]">
          <h1 className="pt-8 pb-10 font-bold text-gray-900 text-center cursor-default text-2xl md:text-3xl">
            {title}
          </h1>

          {children}

          <div className="flex flex-col mt-4 items-center justify-center text-sm">
            <h3 className="text-gray-700">
              {title === "Sign In"
                ? "Don't have an account?"
                : "Have an account?"}
              &nbsp;
              <Link href={linkHref} className="text-blue-400">
                <span className="">{linkText}</span>
              </Link>
            </h3>
          </div>

          <div className="text-gray-700 flex text-center flex-col mt-4 items-center text-sm">
            <p className="cursor-default">
              By signing {title === "Sign In" ? "in" : "up"}, you agree to
              our&nbsp;
              <a className="text-blue-400" href="#">
                <span className="cursor-pointer">Terms</span>
              </a>
              &nbsp;and&nbsp;
              <a className="text-blue-400" href="#">
                <span className="cursor-pointer">Privacy Policy</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormLayout;

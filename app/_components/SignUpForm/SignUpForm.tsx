"use client";

import React, { useState } from "react";
import { FormValues } from "./types";
import { registerUser } from "./ApiRegister";
import SignupFormContent from "./SignUpFormContent";

const SignUpForm: React.FC = () => {
  const [hasRegisteredMessage, setHasRegisteredMessage] = useState(false);

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    const result = await registerUser(values);
    window.alert(result.message);

    if (result.success) {
      resetForm();
      setHasRegisteredMessage(true);
      setTimeout(() => setHasRegisteredMessage(false), 5000);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center m-4">
      <div id="back-div" className="bg-gray-400 rounded-[26px]">
        <div className="border-[20px] border-transparent rounded-[20px] bg-white shadow-lg xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2 m-2">
          <h1
            className="pt-8 pb-10 font-bold text-gray-900 text-center cursor-default
          text-xl sm:text-2xl md:text-3xl"
          >
            Create an account
          </h1>

          <section className="formik">
            <SignupFormContent
              handleSubmit={handleSubmit}
              isSubmitting={false}
              hasRegisteredMessage={hasRegisteredMessage}
            />
          </section>

          <div className="flex flex-col mt-4 items-center justify-center text-sm">
            <h3 className="text-gray-700">
              Have an account?&nbsp;
              <a className="text-blue-400" href="#">
                <span className="">Sign In</span>
              </a>
            </h3>
          </div>

          <div className="text-gray-700 flex text-center flex-col mt-4 items-center text-sm">
            <p className="cursor-default">
              By signing up, you agree to our&nbsp;
              <a className="text-blue-400" href="#">
                <span className="cursor-pointer ">Terms</span>
              </a>
              &nbsp;and&nbsp;
              <a className="text-blue-400" href="#">
                <span className="cursor-pointer ">Privacy Policy</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;

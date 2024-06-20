import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FormValues } from "./types";
import Image from "next/image";
import InfoIcon from "@/assets/tooltip/questionMark.svg";

const initialValues: FormValues = {
  username: "",
  email: "",
  password: "",
  passwordConfirmation: "",
  referralCode: "",
};

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Re-type your password for confirmation"),
  referralCode: Yup.string(),
});

const SignupFormContent: React.FC<{
  handleSubmit: (
    values: FormValues,
    actions: { resetForm: () => void }
  ) => void;
  isSubmitting: boolean;
  hasRegisteredMessage: boolean;
}> = ({ handleSubmit, isSubmitting, hasRegisteredMessage }) => {
  const labelStyle = "mb-2 text-gray-800 text-lg";
  const formStyle =
    "bg-white p-4 border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 rounded-lg w-full";
  const errorStyle = "text-[0.8rem] text-yellow-400";

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="space-y-2 flex flex-col relative xl:h-[100%]">
          <label htmlFor="username" className={labelStyle}>
            Username
          </label>
          <Field
            className={formStyle}
            type="text"
            id="username"
            name="username"
            placeholder="ZenFestival (case sensitive)"
          />
          <ErrorMessage
            className={errorStyle}
            name="username"
            component="div"
          />

          <label htmlFor="email" className={labelStyle}>
            Email
          </label>
          <Field
            className={formStyle}
            type="email"
            id="email"
            name="email"
            placeholder="zen.fest@zenfest.com"
          />
          <ErrorMessage className={errorStyle} name="email" component="div" />

          <label htmlFor="password" className={labelStyle}>
            Password
          </label>
          <Field
            className={formStyle}
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
          />
          <ErrorMessage
            className={errorStyle}
            name="password"
            component="div"
          />

          <label htmlFor="passwordConfirmation" className={labelStyle}>
            Password Confirmation
          </label>
          <Field
            className={formStyle}
            type="password"
            id="passwordConfirmation"
            name="passwordConfirmation"
            placeholder="Re-type your password"
          />
          <ErrorMessage
            className={errorStyle}
            name="passwordConfirmation"
            component="div"
          />

          <div className="flex flex-col justify-between">
            <div className="flex items-center">
              <label htmlFor="referralCode" className={labelStyle}>
                Referral Code (Optional)
              </label>
              <div className="relative flex items-center group ml-2 mb-2">
                <Image
                  className="w-5 h-5 cursor-pointer"
                  src={InfoIcon}
                  alt="Info Icon"
                />
                <div className="absolute sm:left-0 sm:ml-6 hidden sm:group-hover:flex sm:items-center sm:right-auto right-0 mr-6 group-hover:flex items-center">
                  <div className="w-3 h-3 -mr-2 sm:rotate-45 rotate-45 bg-black sm:ml-0 ml-6"></div>
                  <span className="relative z-10 p-2 w-40 text-xs leading-4 text-white whitespace-no-wrap bg-black shadow-lg">
                    If you use the referral code, you'll get a 10% discount for
                    an event.
                  </span>
                </div>
              </div>
            </div>
            <Field
              className={formStyle}
              type="text"
              id="referralCode"
              name="referralCode"
              placeholder="Any referral code"
            />
            <ErrorMessage
              className={errorStyle}
              name="referralCode"
              component="div"
            />
          </div>

          <div className="">
            <button
              type="submit"
              disabled={isSubmitting}
              className="
                      mt-8 p-2 text-white bg-gray-800 shadow-lg rounded-lg w-full
                      hover:scale-105 transition duration-300 ease-in-out"
            >
              Register
            </button>
          </div>
          {hasRegisteredMessage && (
            <div className="success-message text-green-500">
              Your registration has been completed
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default SignupFormContent;

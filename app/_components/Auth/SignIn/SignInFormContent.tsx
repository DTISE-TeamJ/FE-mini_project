import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { SignInFormValues } from "@/types/authTypes";

const initialValues: SignInFormValues = {
  username: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const SignInFormContent: React.FC<{
  handleSubmit: (
    values: SignInFormValues,
    actions: { resetForm: () => void }
  ) => void;
  isSubmitting: boolean;
  hasLoggedInMessage: boolean;
}> = ({ handleSubmit, isSubmitting, hasLoggedInMessage }) => {
  const labelStyle = "mb-2 text-gray-800 text-lg";
  const formStyle =
    "bg-white p-4 border-gray-700 shadow-md placeholder:text-sm sm:placeholder:text-base focus:scale-105 ease-in-out duration-300 rounded-lg w-full";
  const errorStyle = "text-[0.8rem] text-red-600";

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="space-y-2 text- flex flex-col relative xl:h-[100%]">
          <label htmlFor="username" className={labelStyle}>
            Username
          </label>
          <Field
            className={formStyle}
            type="text"
            id="username"
            name="username"
            placeholder="Your Username"
          />
          <ErrorMessage
            className={errorStyle}
            name="username"
            component="div"
          />

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

          <div className="">
            <button
              type="submit"
              disabled={isSubmitting}
              className="
                    mt-8 p-2 text-white bg-gray-800 shadow-lg rounded-lg w-full
                    hover:scale-105 transition duration-300 ease-in-out"
            >
              Sign In
            </button>
          </div>
          {hasLoggedInMessage && (
            <div className="success-message text-green-500">
              You have successfully logged in
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default SignInFormContent;

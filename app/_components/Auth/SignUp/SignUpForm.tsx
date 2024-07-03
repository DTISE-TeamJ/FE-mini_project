"use client";

import React, { useState } from "react";
import { SignUpFormValues } from "@/types/auth";
import SignupFormContent from "./SignUpFormContent";
import FormLayout from "../FormLayout";
import SignUpPortrait from "@/assets/signUpPortrait.webp";
import SignUpLandscape from "@/assets/signUpLandscape.webp";
import { signUpUser } from "@/services/signUpService";

const SignUpForm: React.FC = () => {
  const [hasSignedUpMessage, setHasSignedUpMessage] = useState(false);

  const handleSubmit = async (
    values: SignUpFormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    const result = await signUpUser(values);
    window.alert(result.message);

    if (result.success) {
      resetForm();
      setHasSignedUpMessage(true);
      setTimeout(() => setHasSignedUpMessage(false), 5000);
    }
  };

  return (
    <FormLayout
      title="Create an account"
      linkText="Sign In"
      linkHref="/auth/signin"
      portraitSrc={SignUpPortrait}
      landscapeSrc={SignUpLandscape}
    >
      <SignupFormContent
        handleSubmit={handleSubmit}
        isSubmitting={false}
        hasSignedUpMessage={hasSignedUpMessage}
      />
    </FormLayout>
  );
};

export default SignUpForm;

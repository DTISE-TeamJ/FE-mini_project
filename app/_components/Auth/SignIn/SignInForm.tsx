"use client";

import React, { useState } from "react";
import { SignInFormValues } from "@/types/auth";
import SignInFormContent from "./SignInFormContent";
import FormLayout from "../FormLayout";
import SignInPortrait from "@/assets/signUpPortrait.webp";
import SignInLandscape from "@/assets/signUpLandscape.webp";
import { signInUser } from "@/services/SignInService";

const SignInForm: React.FC = () => {
  const [hasLoggedInMessage, setHasLoggedInMessage] = useState(false);

  const handleSubmit = async (
    values: SignInFormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    const result = await signInUser(values);
    window.alert(result.message);

    if (result.success) {
      resetForm();
      setHasLoggedInMessage(true);
      setTimeout(() => setHasLoggedInMessage(false), 5000);
    }
  };

  return (
    <FormLayout
      title="Sign In"
      linkText="Sign Up"
      linkHref="/auth/signup"
      portraitSrc={SignInPortrait}
      landscapeSrc={SignInLandscape}
    >
      <SignInFormContent
        handleSubmit={handleSubmit}
        isSubmitting={false}
        hasLoggedInMessage={hasLoggedInMessage}
      />
    </FormLayout>
  );
};

export default SignInForm;

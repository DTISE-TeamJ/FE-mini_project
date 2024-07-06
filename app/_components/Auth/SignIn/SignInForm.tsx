"use client";

import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SignInFormValues } from "@/types/auth";
import SignInFormContent from "./SignInFormContent";
import FormLayout from "../FormLayout";
import SignInPortrait from "@/assets/signUpPortrait.webp";
import SignInLandscape from "@/assets/signUpLandscape.webp";

const SignInForm: React.FC = () => {
  const [hasLoggedInMessage, setHasLoggedInMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { data: session, update } = useSession();

  useEffect(() => {
    if (session?.user?.role === "ADMIN") {
      router.push("/dashboard");
    } else if (session?.user?.role === "USER") {
      router.push("/");
    }
  }, [session?.user, router]);

  console.log(session, "<== session");

  /*
  // bang irfan
  const handleSubmit = async (
    values: SignInFormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: false,
      });

      console.log(result, "<== test");

      if (result?.error) {
        window.alert(result.error);
        console.log(result.error);
        // The error message from the backend will be available here
        setError(result.error);
        return {
          success: false,
          message: result.error,
        };
      }

      if (result?.ok) {
        setHasLoggedInMessage(true);
        await update();
        return {
          success: true,
          message: "You have successfully logged in.",
        };
      }
    } catch (error) {
      console.error("Error during form submission", error);
      window.alert("test error");
      setError((error as Error).message || "Something went wrong");
      return {
        success: false,
        message: (error as Error).message || "Something went wrong",
      };
    } finally {
      setIsSubmitting(false);
    }
  };
  */

  const handleSubmit = async (
    values: SignInFormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        username: values.username,
        password: values.password,
      });

      if (result?.error) {
        setError(result.error);
        return {
          success: false,
          message: result.error,
        };
      }

      if (result?.ok) {
        setHasLoggedInMessage(true);
        await update();
        return {
          success: true,
          message: "You have successfully logged in.",
        };
      }
    } catch (error) {
      const message = (error as any).message || "Something went wrong";
      setError(message);
      return {
        success: false,
        message,
      };
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormLayout
      title="Sign In"
      linkText="Sign Up"
      linkHref="/auth/signup"
      portraitSrc={SignInPortrait}
      landscapeSrc={SignInLandscape}>
      <SignInFormContent
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        hasLoggedInMessage={hasLoggedInMessage}
        error={error}
      />
    </FormLayout>
  );
};

export default SignInForm;

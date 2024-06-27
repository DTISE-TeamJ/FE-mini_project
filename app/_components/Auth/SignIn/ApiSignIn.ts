import { SignInFormValues, SignInResponse } from "@/types/auth";

const SUPABASE_URL = "http://localhost:8080";

export const signInUser = async (
  data: SignInFormValues
): Promise<SignInResponse> => {
  try {
    const { username, password } = data;

    const response = await fetch(`${SUPABASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong");
    }

    return {
      success: true,
      message: "You have successfully logged in.",
    };
  } catch (error) {
    console.error("Error during form submission", error);
    return {
      success: false,
      message: (error as Error).message || "Something went wrong",
    };
  }
};

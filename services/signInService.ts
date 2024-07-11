import { SignInFormValues, SignInResponse } from "@/types/auth";

export const signInUser = async (
  data: SignInFormValues
): Promise<SignInResponse> => {
  try {
    const { username, password } = data;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "Something went wrong");
    }

    return {
      status: response.status,
      statusMessage: response.statusText,
      message: "You have successfully logged in.",
      data: responseData,
    };
  } catch (error) {
    return {
      status: 500,
      statusMessage: "Internal Server Error",
      message: (error as Error).message || "Something went wrong",
      data: null,
    };
  }
};

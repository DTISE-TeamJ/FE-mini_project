import { SignUpFormValues, SignUpResponse } from "@/types/auth";

export const signUpUser = async (
  data: SignUpFormValues
): Promise<SignUpResponse> => {
  try {
    const { username, email, password, referralCode } = data;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, referralCode }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong");
    }

    return {
      success: true,
      message: "Your registration has been completed.",
    };
  } catch (error) {
    console.error("Error during form submission", error);
    return {
      success: false,
      message: (error as Error).message || "Something went wrong",
    };
  }
};

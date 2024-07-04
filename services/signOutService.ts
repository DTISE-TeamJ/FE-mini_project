export const signOutUser = async (): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`,
      {
        method: "POST",
        credentials: "include", // This ensures cookies are sent with the request
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to log out");
    }

    // Clear the JWT cookie on the client side
    document.cookie = "jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";

    return {
      success: true,
      message: "You have successfully logged out.",
    };
  } catch (error) {
    console.error("Error during logout", error);
    return {
      success: false,
      message: (error as Error).message || "Something went wrong",
    };
  }
};

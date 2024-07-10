"use server";

import { cookies } from "next/headers";

const deleteCookies = async () => {
  const cookieStore = cookies();
  cookieStore.delete("jwt");

  return cookieStore;
};

export { deleteCookies };

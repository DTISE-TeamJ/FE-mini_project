import { redirect } from "next/navigation";
import SignInForm from "@/app/_components/Auth/SignIn/SignInForm";
import { auth } from "@/auth";

export default async function SignIn() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <div>
      <SignInForm />
    </div>
  );
}

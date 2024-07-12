import type { Metadata } from "next";
import Navbar from "../_components/(shared)/Navbar/Navbar";
import Footer from "../_components/(shared)/Footer/Footer";

export const metadata: Metadata = {
  title: "Home",
  description: "Home",
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

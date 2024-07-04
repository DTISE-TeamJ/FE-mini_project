import type { Metadata } from "next";
import Navbar from "../_components/Navbar/Navbar";
import Footer from "../_components/Footer/Footer";

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
    <section>
      <Navbar />
      {children}
      <Footer />
    </section>
  );
}

import Navbar from "@/app/_components/(shared)/Navbar/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PEACHES. Discover",
  description: "Discover events",
};

export default function DiscoverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className=" bg-custom-gradient">
      <Navbar />
      {children}
    </section>
  );
}

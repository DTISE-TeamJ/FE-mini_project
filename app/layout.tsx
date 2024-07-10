import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CategoryProvider } from "@/context/CategoryContext";
import { SessionProvider } from "next-auth/react";
import ReduxProvider from "@/store/redux-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <CategoryProvider>{children}</CategoryProvider>
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;

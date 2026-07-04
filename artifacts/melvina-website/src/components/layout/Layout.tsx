import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ReactNode } from "react";
import { BirthdaySplash } from "@/components/BirthdaySplash";
import { BirthdayBanner } from "@/components/BirthdayBanner";
import { isBirthdayToday } from "@/lib/birthday";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {isBirthdayToday() && (
        <>
          <BirthdaySplash />
          <BirthdayBanner />
        </>
      )}
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

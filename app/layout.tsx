import type { Metadata } from "next";

import "./globals.css";
import { ClientProvider } from "@/components/providers/ClientProvider";
import { Toaster } from "@/components/common/Toast/toaster";
import LandingPage from "./landing";
import { CourseProvider } from "@/providers/course-provider";

export const metadata: Metadata = {
  title: "함께 즐기는 모임의 시작, 피키",
  description: "함께 즐기는 모임의 시작, 피키",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <link rel="icon" type="image/x-icon" href="./favicon.ico" />
      <body className="w-screen flex justify-center lg:justify-end bg-landing-background">
        <ClientProvider>
          <div className="w-full justify-center lg:block hidden">
            <LandingPage />
          </div>
          <CourseProvider>
            <div className="max-w-[375px] w-full bg-neutral-0 relative h-dvh overflow-y-auto overflow-x-hidden xl:mr-[218px] disable-scrollbar">
              {children}
            </div>
          </CourseProvider>
        </ClientProvider>
        <Toaster />
      </body>
    </html>
  );
}

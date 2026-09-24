import type { Metadata } from "next";
import AppLayout from "@/components/AppLayout";
import "./globals.css";

export const metadata: Metadata = {
  title: "TimePilot - AI-Powered Time Management",
  description:
    "Take control of your time. AI-powered planning, focus sessions, and productivity insights.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-black">
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
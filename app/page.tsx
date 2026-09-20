"use client";

import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import ProductPreview from "@/components/landing/ProductPreview";
import Features from "@/components/landing/Features";
import CalendarSection from "@/components/landing/CalendarSection";
import AIPlanner from "@/components/landing/AIPlanner";
import Analytics from "@/components/landing/Analytics";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#08090B] text-white selection:bg-[#F5A623] selection:text-black">
      <Navbar />

      <div id="top">
        <Hero />
      </div>

      <ProductPreview />

      <Features />

      <CalendarSection />

      <AIPlanner />

      <Analytics />

      <CTA />

      <Footer />
    </main>
  );
}
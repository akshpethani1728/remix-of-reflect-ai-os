import { createFileRoute } from "@tanstack/react-router";
import { SiteBackground } from "@/components/SiteBackground";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrustLogos } from "@/components/TrustLogos";
import { Services } from "@/components/Services";
import { RealVisuals } from "@/components/RealVisuals";
import { Pricing } from "@/components/Pricing";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Reflect — Get 10x More Google Calls" },
      { name: "description", content: "We help local businesses rank #1 on Google Maps, automate WhatsApp & Instagram replies, and turn every inquiry into a booked customer. Start your free audit today." },
      { property: "og:title", content: "Reflect — Get 10x More Google Calls" },
      { property: "og:description", content: "Get more customers through Google & automation. Built for local businesses." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <SiteBackground />
      <ScrollProgress />
      <Navbar />
      <main className="relative">
        <Hero />
        <TrustLogos />
        <Services />
        <RealVisuals />
        <Pricing />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

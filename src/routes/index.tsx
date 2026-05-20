import { createFileRoute } from "@tanstack/react-router";
import { SiteBackground } from "@/components/SiteBackground";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { RealVisuals } from "@/components/RealVisuals";
import { Pricing } from "@/components/Pricing";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Reflect — Visibility With Automation" },
      { name: "description", content: "Reflect helps local businesses get more customers through Google Business Profile optimization, WhatsApp & Instagram automation, AI voice agents, and review management." },
      { property: "og:title", content: "Reflect — Visibility With Automation" },
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

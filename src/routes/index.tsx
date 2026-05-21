import { createFileRoute } from "@tanstack/react-router";
import { SiteBackground } from "@/components/SiteBackground";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CustomCursor } from "@/components/CustomCursor";
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
      { title: "Reflect — Get More Customers From Google" },
      { name: "description", content: "We help local businesses improve visibility, automate customer replies, and grow online. Google Maps, WhatsApp, Instagram automation for gyms, salons, cafes & more." },
      { property: "og:title", content: "Reflect — Get More Customers From Google" },
      { property: "og:description", content: "Visibility Through Automation. Built for local businesses." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <SiteBackground />
      <SmoothScroll>
        <CustomCursor />
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
      </SmoothScroll>
    </>
  );
}

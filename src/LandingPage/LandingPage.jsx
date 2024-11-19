import React from "react";
import HeroSection from "./components/Hero";
import Features from "./components/Feature";
import HowItWorks from "./components/HowItWork";
import Footer from "./Footer";
import Benefits from "./components/Benefits";
import Testimonials from "./components/Testimonial";
import MarqueeCarousel from "./components/Marque";
const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <Features />
      <HowItWorks />
      <Benefits />
      <MarqueeCarousel/>
      <Testimonials />
      <Footer />
    </div>
  );
};

export default LandingPage;

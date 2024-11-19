import HeroSection from "./components/Hero";
import Features from "./components/Feature";
import HowItWorks from "./components/HowItWork";
import Footer from "./components/Footer";
import Benefits from "./components/Benefits";
import Testimonials from "./components/Testimonial";
import MarqueeCarousel from "./components/Marque";
import Header from "./components/Header";
const LandingPage = () => {
  return (
    <div>
      <Header/>
      <HeroSection />
      <MarqueeCarousel/>
      <Features />
      <HowItWorks />
      <Benefits />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default LandingPage;

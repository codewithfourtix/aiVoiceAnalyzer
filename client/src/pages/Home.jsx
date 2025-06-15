import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import VoiceAnalyzer from "../components/VoiceAnalyzer";
import Pricing from "../components/Pricing";
import Team from "../components/Team";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <Navbar />
      <Hero />
      <Features />
      <VoiceAnalyzer />
      <Pricing />
      <Team />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;

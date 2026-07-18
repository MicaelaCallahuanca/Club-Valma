import Header from "./components/Header";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import OffersCatalog from "./components/OffersCatalog";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <OffersCatalog />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

export default App;

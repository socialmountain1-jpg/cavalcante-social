import HeroSection     from "@/components/HeroSection";
import AboutSection     from "@/components/AboutSection";
import ServicesSection  from "@/components/ServicesSection";
import ResultsSection   from "@/components/ResultsSection";
import TickerSection    from "@/components/TickerSection";
import CTASection       from "@/components/CTASection";

export default function Home() {
  return (
    <main>
      <div id="inicio">
        <HeroSection />
      </div>
      <div id="sobre">
        <AboutSection />
      </div>
      <div id="servicos">
        <ServicesSection />
      </div>
      <div id="resultados">
        <ResultsSection />
      </div>
      <TickerSection />
      <div id="contato">
        <CTASection />
      </div>
    </main>
  );
}

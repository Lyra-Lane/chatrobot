import { TrendingUp } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import professionalPhoto from "@assets/证件照（长发）_1752797393618.jpg";

export default function HeroSection() {
  const { ref, isVisible } = useScrollAnimation();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="home" 
      ref={ref}
      className={`min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8 transition-all duration-800 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold morandi-gray mb-6">
            Hi, I'm <span className="text-[hsl(var(--morandi-rose))]">ManYao Li</span>
          </h1>
          <p className="text-xl md:text-2xl text-[hsl(var(--morandi-sage))] mb-6 font-medium">
            Data-Driven Explorer of the Future
          </p>
          <p className="text-lg morandi-gray mb-8 leading-relaxed">
            Statistics student at Beijing Normal University specializing in Natural Language Processing and Machine Learning. 
            Passionate about unlocking data value through AI research and statistical modeling.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button 
              onClick={() => scrollToSection('projects')}
              className="bg-[hsl(var(--morandi-rose))] text-white px-8 py-3 rounded-lg hover:opacity-80 transition-all duration-300 font-medium"
            >
              View My Work
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="border-2 border-[hsl(var(--morandi-sage))] text-[hsl(var(--morandi-sage))] px-8 py-3 rounded-lg hover:bg-[hsl(var(--morandi-sage))] hover:text-white transition-all duration-300 font-medium"
            >
              Get In Touch
            </button>
          </div>
        </div>
        
        <div className="flex justify-center md:justify-end">
          <div className="relative">
            <div className="w-80 h-80 rounded-full bg-gradient-to-br from-[hsl(var(--morandi-rose))] to-[hsl(var(--morandi-sage))] p-1">
              <div className="w-full h-full rounded-full bg-morandi-cream p-4">
                <img 
                  src={professionalPhoto}
                  alt="ManYao Li Professional Photo" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-morandi-beige rounded-full p-4 animate-pulse-gentle">
              <TrendingUp className="text-2xl morandi-gray" size={32} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

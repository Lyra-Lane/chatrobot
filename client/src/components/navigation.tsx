import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-morandi-cream/90 backdrop-blur-sm border-b border-morandi-light' : 'bg-morandi-cream/90 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-xl font-semibold morandi-gray cursor-pointer" onClick={() => scrollToSection('home')}>
            ManYao Li
          </div>
          
          <div className="hidden md:flex space-x-8">
            {[
              { label: "Home", id: "home" },
              { label: "About", id: "about" },
              { label: "Projects", id: "projects" },
              { label: "Resume", id: "resume" },
              { label: "Contact", id: "contact" }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="morandi-gray hover:text-[hsl(var(--morandi-rose))] transition-colors duration-300"
              >
                {item.label}
              </button>
            ))}
          </div>
          
          <button 
            className="md:hidden morandi-gray"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-morandi-cream border-t border-morandi-light">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {[
              { label: "Home", id: "home" },
              { label: "About", id: "about" },
              { label: "Projects", id: "projects" },
              { label: "Resume", id: "resume" },
              { label: "Contact", id: "contact" }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left px-3 py-2 morandi-gray hover:text-[hsl(var(--morandi-rose))] transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

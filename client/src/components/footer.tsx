import { Mail, Linkedin, Github } from "lucide-react";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-morandi-gray text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-xl font-semibold mb-4">ManYao Li</h4>
            <p className="text-gray-300 mb-4">
              Data Science & NLP Researcher passionate about AI innovation and statistical modeling.
            </p>
            <div className="flex space-x-4">
              <a 
                href="mailto:manyaoli@berkeley.edu" 
                className="text-gray-300 hover:text-[hsl(var(--morandi-rose))] transition-colors"
              >
                <Mail size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/in/manyao-li-9a4436375" 
                className="text-gray-300 hover:text-[hsl(var(--morandi-rose))] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://github.com/Lyra-lane" 
                className="text-gray-300 hover:text-[hsl(var(--morandi-rose))] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h5 className="font-semibold mb-4">Quick Links</h5>
            <ul className="space-y-2 text-gray-300">
              {[
                { label: "Home", id: "home" },
                { label: "About", id: "about" },
                { label: "Projects", id: "projects" },
                { label: "Resume", id: "resume" },
                { label: "Contact", id: "contact" }
              ].map((link) => (
                <li key={link.id}>
                  <button 
                    onClick={() => scrollToSection(link.id)}
                    className="hover:text-[hsl(var(--morandi-rose))] transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h5 className="font-semibold mb-4">Expertise</h5>
            <ul className="space-y-2 text-gray-300">
              <li>Natural Language Processing</li>
              <li>Machine Learning</li>
              <li>Statistical Modeling</li>
              <li>Data Analysis</li>
              <li>Python & R Programming</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2025 ManYao Li. All rights reserved.</p>
          <p className="text-sm mt-2">Built with modern web technologies and Morandi design principles.</p>
        </div>
      </div>
    </footer>
  );
}

import { FileText, Eye, Download, ExternalLink } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export default function ResumeSection() {
  const { ref, isVisible } = useScrollAnimation();

  const handleDownloadResume = () => {
    // Create a link to download the resume PDF
    const link = document.createElement('a');
    link.href = '/api/resume/download'; // This would be an API endpoint to serve the PDF
    link.download = 'ManYao_Li_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewResume = () => {
    // Open resume in new tab or modal
    window.open('/api/resume/view', '_blank');
  };

  const highlights = [
    { value: "3.8", label: "GPA", sublabel: "Out of 4.0", color: "bg-[hsl(var(--morandi-rose))]" },
    { value: "2+", label: "Research Projects", sublabel: "University Funded", color: "bg-[hsl(var(--morandi-sage))]" },
    { value: "5+", label: "Awards", sublabel: "Academic & Competition", color: "bg-[hsl(var(--morandi-beige))]" },
    { value: "3", label: "Languages", sublabel: "Chinese, English, Spanish", color: "bg-[hsl(var(--morandi-rose))]" }
  ];

  return (
    <section 
      id="resume" 
      ref={ref}
      className={`py-20 px-4 sm:px-6 lg:px-8 bg-white transition-all duration-800 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold morandi-gray mb-4">Resume</h2>
        <p className="text-xl text-[hsl(var(--morandi-sage))] mb-12">Download my detailed resume or view it online</p>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="bg-morandi-light p-8 rounded-xl">
            <Download className="text-[hsl(var(--morandi-rose))] text-6xl mb-6 mx-auto" size={64} />
            <h3 className="text-2xl font-semibold morandi-gray mb-4">Download Resume</h3>
            <p className="morandi-gray mb-6">Get the latest version of my resume in PDF format</p>
            <button 
              onClick={handleDownloadResume}
              className="bg-[hsl(var(--morandi-rose))] text-white px-8 py-3 rounded-lg hover:opacity-80 transition-all duration-300 font-medium inline-flex items-center gap-2"
            >
              <Download size={16} />
              Download PDF
            </button>
          </div>
          
          <div className="bg-morandi-light p-8 rounded-xl">
            <Eye className="text-[hsl(var(--morandi-sage))] text-6xl mb-6 mx-auto" size={64} />
            <h3 className="text-2xl font-semibold morandi-gray mb-4">View Online</h3>
            <p className="morandi-gray mb-6">Preview my resume directly in your browser</p>
            <button 
              onClick={handleViewResume}
              className="border-2 border-[hsl(var(--morandi-sage))] text-[hsl(var(--morandi-sage))] px-8 py-3 rounded-lg hover:bg-[hsl(var(--morandi-sage))] hover:text-white transition-all duration-300 font-medium inline-flex items-center gap-2"
            >
              <ExternalLink size={16} />
              View Online
            </button>
          </div>
        </div>
        
        {/* Resume Highlights */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold morandi-gray mb-8">Key Highlights</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {highlights.map((highlight, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 ${highlight.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-white font-bold text-xl">{highlight.value}</span>
                </div>
                <p className="font-medium morandi-gray">{highlight.label}</p>
                <p className="text-sm text-[hsl(var(--morandi-sage))]">{highlight.sublabel}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

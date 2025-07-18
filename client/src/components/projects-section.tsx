import { MessageCircle, Bus, Trophy, GraduationCap, Heart, Github, ExternalLink } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export default function ProjectsSection() {
  const { ref, isVisible } = useScrollAnimation();

  const projects = [
    {
      title: "Chinese Irony Recognition with LLaMA-2",
      description: "Led a university-funded research project developing NLP models for detecting irony in Chinese social media. Fine-tuned LLaMA-2 and compared performance with LSTM and RoBERTa models.",
      icon: MessageCircle,
      gradient: "from-[hsl(var(--morandi-rose))] to-[hsl(var(--morandi-sage))]",
      techStack: ["Python", "LLaMA-2", "PyTorch", "NLP"],
      metrics: [
        { label: "Precision", value: "92%", color: "text-[hsl(var(--morandi-rose))]" },
        { label: "Recall", value: "89%", color: "text-[hsl(var(--morandi-sage))]" },
        { label: "F1-Score", value: "90%", color: "text-[hsl(var(--morandi-beige))]" }
      ],
      funding: "Beijing Undergraduate Research Fund",
      link: "#"
    },
    {
      title: "Carbon-Neutral Bus Network Optimization",
      description: "Applied time-series and spatial regression models to optimize Beijing public transport routes under carbon emission constraints. Integrated metro data for dual-mode network optimization.",
      icon: Bus,
      gradient: "from-[hsl(var(--morandi-sage))] to-[hsl(var(--morandi-beige))]",
      techStack: ["R", "Time Series", "GIS", "Optimization"],
      metrics: [
        { label: "CO₂ Reduction", value: "25%", color: "text-[hsl(var(--morandi-sage))]" },
        { label: "Efficiency Gain", value: "15%", color: "text-[hsl(var(--morandi-rose))]" }
      ],
      funding: "National Statistical Modeling Competition",
      link: "#"
    }
  ];

  const otherWork = [
    {
      icon: Trophy,
      title: "Market Research Competition",
      description: "First Prize winner using R and Excel for conjoint analysis and pricing strategy simulations",
      color: "text-[hsl(var(--morandi-rose))]"
    },
    {
      icon: GraduationCap,
      title: "Academic Excellence",
      description: "Multiple academic scholarships and recognition for outstanding performance in statistics courses",
      color: "text-[hsl(var(--morandi-sage))]"
    },
    {
      icon: Heart,
      title: "Community Leadership",
      description: "Director of White Dove Youth Volunteer Association, organizing community service events",
      color: "text-[hsl(var(--morandi-beige))]"
    }
  ];

  return (
    <section 
      id="projects" 
      ref={ref}
      className={`py-20 px-4 sm:px-6 lg:px-8 bg-morandi-cream transition-all duration-800 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold morandi-gray mb-4">Featured Projects</h2>
          <p className="text-xl text-[hsl(var(--morandi-sage))]">Showcasing my work in AI research and data science</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className={`h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                <project.icon className="text-white text-6xl" size={64} />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold morandi-gray mb-3">{project.title}</h3>
                <p className="morandi-gray mb-4">{project.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-medium morandi-gray mb-2">Technology Stack:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, techIndex) => (
                      <span key={techIndex} className="bg-morandi-light morandi-gray px-3 py-1 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium morandi-gray mb-2">Performance Metrics:</h4>
                  <div className={`grid grid-cols-${project.metrics.length} gap-2 text-center`}>
                    {project.metrics.map((metric, metricIndex) => (
                      <div key={metricIndex} className="bg-morandi-light p-2 rounded">
                        <div className={`text-lg font-bold ${metric.color}`}>{metric.value}</div>
                        <div className="text-xs morandi-gray">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[hsl(var(--morandi-sage))] font-medium">{project.funding}</span>
                  <a 
                    href={project.link} 
                    className="text-[hsl(var(--morandi-rose))] hover:opacity-80 transition-colors"
                  >
                    <Github size={20} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Additional Projects Preview */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-semibold morandi-gray mb-6">Other Notable Work</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {otherWork.map((work, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <work.icon className={`${work.color} text-2xl mb-3`} size={32} />
                <h4 className="font-semibold morandi-gray mb-2">{work.title}</h4>
                <p className="text-sm morandi-gray">{work.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

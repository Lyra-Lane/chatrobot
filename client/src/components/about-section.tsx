import { Brain, Bot, BarChart3, Database } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export default function AboutSection() {
  const { ref, isVisible } = useScrollAnimation();

  const skills = [
    { name: "Python", level: 90, color: "bg-[hsl(var(--morandi-rose))]" },
    { name: "Machine Learning", level: 85, color: "bg-[hsl(var(--morandi-sage))]" },
    { name: "R & Statistics", level: 88, color: "bg-[hsl(var(--morandi-beige))]" },
    { name: "SQL", level: 75, color: "bg-[hsl(var(--morandi-rose))]" },
    { name: "NLP", level: 80, color: "bg-[hsl(var(--morandi-sage))]" }
  ];

  const researchAreas = [
    { icon: Brain, title: "Natural Language Processing", color: "text-[hsl(var(--morandi-rose))]" },
    { icon: Bot, title: "Machine Learning", color: "text-[hsl(var(--morandi-sage))]" },
    { icon: BarChart3, title: "Statistical Modeling", color: "text-[hsl(var(--morandi-beige))]" },
    { icon: Database, title: "Data Science", color: "text-[hsl(var(--morandi-rose))]" }
  ];

  return (
    <section 
      id="about" 
      ref={ref}
      className={`py-20 px-4 sm:px-6 lg:px-8 bg-white transition-all duration-800 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold morandi-gray mb-4">About Me</h2>
          <p className="text-xl text-[hsl(var(--morandi-sage))]">Passionate about AI research and statistical innovation</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-semibold morandi-gray mb-6">Educational Journey</h3>
            <div className="space-y-6">
              <div className="border-l-4 border-[hsl(var(--morandi-rose))] pl-6">
                <h4 className="text-lg font-medium morandi-gray">Beijing Normal University</h4>
                <p className="text-[hsl(var(--morandi-sage))]">Bachelor of Science in Statistics</p>
                <p className="text-sm morandi-gray">2023 - 2027 | GPA: 3.8/4.0</p>
                <p className="text-sm morandi-gray mt-2">
                  Relevant Coursework: Probability Theory, Statistical Modeling, Machine Learning, 
                  Python Programming, Natural Language Processing
                </p>
              </div>
            </div>
            
            <h3 className="text-2xl font-semibold morandi-gray mb-6 mt-10">Research Interests</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {researchAreas.map((area, index) => (
                <div key={index} className="bg-morandi-light p-4 rounded-lg">
                  <area.icon className={`${area.color} text-xl mb-2`} size={24} />
                  <p className="font-medium">{area.title}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold morandi-gray mb-6">Skills Overview</h3>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="font-medium">{skill.name}</span>
                  <div className="w-32 bg-morandi-light rounded-full h-3">
                    <div 
                      className={`${skill.color} h-3 rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: isVisible ? `${skill.level}%` : '0%' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-morandi-light rounded-lg">
                <div className="text-2xl font-bold text-[hsl(var(--morandi-rose))]">3.8</div>
                <p className="text-sm morandi-gray">GPA</p>
              </div>
              <div className="text-center p-4 bg-morandi-light rounded-lg">
                <div className="text-2xl font-bold text-[hsl(var(--morandi-sage))]">5+</div>
                <p className="text-sm morandi-gray">Awards</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

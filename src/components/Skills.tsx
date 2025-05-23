import React, { useEffect, useRef, useState } from 'react';
import { Star, Badge, Award, BookOpen } from 'lucide-react';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [hoveredAcademic, setHoveredAcademic] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  const technicalSkills = [
    { name: "Artificial Intelligence", level: 95, icon: "🧠", color: "from-indigo-500 to-violet-600" },
    { name: "Machine Learning", level: 90, icon: "🤖", color: "from-blue-500 to-indigo-600" },
    { name: "Deep Learning", level: 85, icon: "🔬", color: "from-cyan-500 to-blue-600" },
    { name: "Natural Language Processing", level: 80, icon: "💬", color: "from-teal-500 to-cyan-600" },
    { name: "Data Science", level: 90, icon: "📊", color: "from-emerald-500 to-teal-600" },
    { name: "Python", level: 85, icon: "🐍", color: "from-green-500 to-emerald-600" },
    { name: "Neural Networks", level: 75, icon: "🔄", color: "from-gold-500 to-amber-600" },
  ];
  
  const academicSkills = [
    { name: "Academic Leadership", icon: <Award size={20} />, description: "Leading academic programs and departments with vision" },
    { name: "Curriculum Development", icon: <BookOpen size={20} />, description: "Creating innovative educational content" },
    { name: "Research Methodology", icon: <Star size={20} />, description: "Designing rigorous research frameworks" },
    { name: "Educational Technology", icon: <Badge size={20} />, description: "Implementing advanced learning technologies" },
    { name: "Student Mentoring", icon: <Award size={20} />, description: "Guiding students to academic excellence" },
    { name: "Academic Writing", icon: <BookOpen size={20} />, description: "Publishing in high-impact journals" },
    { name: "Grant Writing", icon: <Star size={20} />, description: "Securing research funding" },
    { name: "Course Design", icon: <Badge size={20} />, description: "Creating engaging learning experiences" }
  ];

  // Intersection Observer to trigger animations when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.1 });
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Premium background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary via-secondary to-secondary/90"></div>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-luxury-100/20 to-transparent opacity-30"></div>
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gold-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/3 right-1/4 w-60 h-60 bg-navy-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="luxury-container relative z-10">
        {/* Elegant section header */}
        <div className="mb-16 text-center">
          <p className="inline-block px-4 py-1 rounded-full text-gold-600 font-medium mb-3 tracking-wider text-sm uppercase animate-fade-up" 
             style={{background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)"}}>
            Expertise & Capabilities
          </p>
          <h2 className="text-4xl md:text-5xl font-playfair font-medium mb-4 text-navy-800 animate-fade-up animation-delay-200">
            Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">Expertise</span>
          </h2>
          <div className="flex items-center justify-center animate-fade-up animation-delay-400">
            <div className="h-0.5 w-12 bg-navy-200"></div>
            <div className="w-24 h-1 mx-2 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full"></div>
            <div className="h-0.5 w-12 bg-navy-200"></div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Technical skills with premium animations */}
          <div className="transform transition-all duration-700 ease-out animate-fade-left">
            <div className="flex items-center mb-10 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-xl">
              <div className="p-3 rounded-lg mr-4 bg-gradient-to-br from-gold-300/30 to-gold-600/30">
                <Star size={24} className="text-gold-500" />
              </div>
              <h3 className="text-2xl font-playfair text-navy-800">Technical Proficiency</h3>
            </div>
            
            <div className="space-y-7">
              {technicalSkills.map((skill, index) => (
                <div 
                  key={index}
                  className="group relative"
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <div className="flex justify-between mb-3 items-center">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl transform group-hover:scale-125 transition-transform duration-300 filter drop-shadow-sm">{skill.icon}</span>
                      <span className="text-navy-800 font-medium">{skill.name}</span>
                    </div>
                    <div className="flex items-center">
                      <span 
                        className={`font-bold transition-all duration-300 text-gold-500 ${hoveredSkill === skill.name ? 'text-xl' : 'text-base'}`}
                      >
                        {skill.level}%
                      </span>
                    </div>
                  </div>
                  
                  {/* Skill progress bar with animation */}
                  <div className="h-3 bg-navy-200/30 rounded-full overflow-hidden shadow-inner relative">
                    {/* Inner progress bar with animated fill */}
                    <div 
                      className={`absolute top-0 left-0 h-full rounded-full bg-gradient-to-r ${skill.color} transform transition-transform origin-left scale-x-0 duration-1000 ease-out shadow`}
                      style={{ 
                        width: `${skill.level}%`, 
                        transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
                        transitionDelay: `${index * 150}ms`,
                      }}
                    >
                      {/* Animated glow effect */}
                      <div 
                        className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 animate-shimmer"
                        style={{
                          backgroundSize: '200% 100%',
                          visibility: hoveredSkill === skill.name ? 'visible' : 'hidden'
                        }}
                      ></div>
                    </div>
                    
                    {/* Animated particles for premium effect */}
                    <div className={`absolute top-0 left-0 h-full w-full overflow-hidden ${isVisible ? '' : 'opacity-0'}`}>
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div 
                          key={i}
                          className="absolute top-0 h-full w-1 bg-white/60 rounded-full animate-pulse-fast"
                          style={{ 
                            left: `${skill.level * Math.random()}%`, 
                            animationDelay: `${i * 0.5}s`,
                            opacity: hoveredSkill === skill.name ? 0.8 : 0
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Floating tooltip */}
                  <div 
                    className={`absolute mt-2 p-2 bg-navy-800 text-white text-xs rounded shadow-lg transition-all duration-300 z-10 ${
                      hoveredSkill === skill.name ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-2 pointer-events-none'
                    }`}
                    style={{ maxWidth: '200px' }}
                  >
                    Expert level proficiency with {skill.level}% mastery
                    <div className="absolute -top-1 left-4 w-2 h-2 bg-navy-800 transform rotate-45"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Academic skills with premium cards and effects */}
          <div className="transform transition-all duration-700 ease-out animate-fade-right">
            <div className="flex items-center mb-10 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-xl">
              <div className="p-3 rounded-lg mr-4 bg-gradient-to-br from-gold-300/30 to-gold-600/30">
                <Badge size={24} className="text-gold-500" />
              </div>
              <h3 className="text-2xl font-playfair text-navy-800">Academic Excellence</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
              {academicSkills.map((skill, index) => (
                <div 
                  key={index} 
                  className="group relative p-5 bg-white bg-opacity-10 backdrop-blur-sm rounded-xl border border-white/20 
                         transition-all duration-500 hover:shadow-xl overflow-hidden"
                  style={{ 
                    opacity: isVisible ? 1 : 0, 
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `opacity 0.5s ease, transform 0.5s ease`,
                    transitionDelay: `${0.3 + index * 0.1}s`
                  }}
                  onMouseEnter={() => setHoveredAcademic(index)}
                  onMouseLeave={() => setHoveredAcademic(null)}
                >
                  {/* Animated background gradient */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-transparent to-gold-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  ></div>
                  
                  {/* Animated corner accent */}
                  <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-gold-400/0 to-gold-400/30 rounded-full transform translate-x-full -translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-700 pointer-events-none"></div>
                  
                  <div className="flex flex-col h-full relative z-10">
                    <div className="flex items-center mb-2">
                      <div 
                        className="mr-3 p-2 rounded-md bg-white/10 text-gold-500 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-gold-500/20"
                      >
                        {skill.icon}
                      </div>
                      <h4 className="font-medium text-navy-800">{skill.name}</h4>
                    </div>
                    
                    <p 
                      className={`text-navy-500 text-sm mt-2 transition-all duration-500 ${
                        hoveredAcademic === index ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0'
                      } overflow-hidden`}
                    >
                      {skill.description}
                    </p>
                    
                    {/* Animated border bottom */}
                    <div className="mt-auto pt-2">
                      <div className="w-0 group-hover:w-full h-px bg-gradient-to-r from-gold-400 to-transparent transition-all duration-700"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Animation CSS - moved to external stylesheet */}
    </section>
  );
};

export default Skills;

import React, { useState, useEffect, useRef } from 'react';
import { Award, Star, Calendar, MapPin, Briefcase, ChevronRight, Check, Circle } from 'lucide-react';

const Leadership = () => {
  const [activeAchievement, setActiveAchievement] = useState<number | null>(null);
  const [visibleTimeline, setVisibleTimeline] = useState<number | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const achievements = [
    {
      title: "Most Inspiring Teacher",
      organization: "KIET, Kakinada",
      year: "2023",
      description: "Recognized for exceptional teaching methods and student inspiration.",
      icon: <Star className="h-6 w-6" />,
      color: "bg-rose-500"
    },
    {
      title: "Honorary Doctorate Award",
      organization: "Washington University, American Council of Training and Development",
      year: "June 15, 2024",
      description: "Awarded for contributions to AI education and research.",
      icon: <Award className="h-6 w-6" />,
      color: "bg-amber-500"
    },
    {
      title: "GATE - 1050 AIR",
      organization: "Graduate Aptitude Test in Engineering",
      year: "2008",
      description: "Secured All India Rank of 1050 in the prestigious GATE examination.",
      icon: <Star className="h-6 w-6" />,
      color: "bg-emerald-500"
    },
    {
      title: "University Topper",
      organization: "Jawaharlal Technological University Kakinada",
      year: "2011",
      description: "Achieved top rank with 83% in academics for MTech in Power Systems and High Voltage Engineering.",
      icon: <Award className="h-6 w-6" />,
      color: "bg-indigo-500"
    }
  ];
  
  const leadershipPositions = [
    {
      title: "Principal & Director of Academics",
      organization: "KIET Group of Institutions, Kakinada, India",
      period: "2020 - Present",
      responsibilities: [
        "Kept abreast of advances in pedagogy and work to continuously improve teaching methods and introduce new approaches to instruction.",
        "Developed students' critical thinking skills through interactive classroom activities and discussions."
      ],
      icon: <Briefcase />,
      highlight: true
    },
    {
      title: "Vice Principal",
      organization: "Kakinada Institute of Engineering and Technology, Kakinada, India",
      period: "2019 - 2020",
      responsibilities: [
        "Delivered UG and PG courses in Python, DevOps, Cloud Computing and Machine Learning"
      ],
      icon: <Briefcase />
    },
    {
      title: "Associate Professor and HOD, Department of EEE",
      organization: "Kakinada Institute of Engineering & Technology, Kakinada, India",
      period: "2015 - 2017",
      responsibilities: [
        "Conducted advanced research in renewable energy systems and smart grids.",
        "Published 20+ peer-reviewed papers in top journals.",
        "Supervised 15+ postgraduate research projects."
      ],
      icon: <Briefcase />
    },
    {
      title: "Assistant Professor",
      organization: "Kakinada Institute of Engineering & Technology, Kakinada, India",
      period: "2011 - 2015",
      responsibilities: [
        "Delivered UG and PG courses in power systems, power electronics and High voltage DC.",
        "Collaborated on industry-funded research projects."
      ],
      icon: <Briefcase />
    },
    {
      title: "Software Programmer",
      organization: "IBM, Bangalore",
      period: "2007 - 2008",
      responsibilities: [],
      icon: <Briefcase />
    }
  ];
  
  // Observe timeline items for animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setVisibleTimeline(index);
          }
        });
      }, 
      { threshold: 0.5, rootMargin: '0px 0px -100px 0px' }
    );
    
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => observer.observe(item));
    
    return () => {
      timelineItems.forEach(item => observer.unobserve(item));
    };
  }, []);
  
  // Section animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          entries[0].target.classList.add('section-visible');
        }
      }, 
      { threshold: 0.1 }
    );
    
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
    <section ref={sectionRef} id="leadership" className="section-animate py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white">
      {/* Premium background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-luxury-100/10 to-transparent"></div>
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-indigo-100 rounded-full filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-100 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>
      
      <div className="luxury-container relative z-10">
        {/* Enhanced section header */}
        <div className="mb-16 text-center">
          <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider text-gold-700 uppercase bg-gold-100/50 rounded-full mb-3 section-animate-children">
            Professional Growth
          </span>
          <h2 className="text-4xl md:text-5xl font-playfair mb-4 text-navy-900 section-animate-children">
            Leadership & <span className="text-gradient">Achievements</span>
          </h2>
          <div className="flex items-center justify-center section-animate-children">
            <div className="h-px w-12 bg-navy-200"></div>
            <div className="w-24 h-1 mx-2 bg-gradient-to-r from-gold-300 to-gold-600 rounded-full"></div>
            <div className="h-px w-12 bg-navy-200"></div>
          </div>
        </div>
        
        {/* Premium Achievement Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-20">
          {achievements.map((achievement, index) => (
            <div 
              key={index} 
              className={`achievement-card group relative rounded-xl overflow-hidden bg-white/80 backdrop-blur-sm transition-all duration-500 section-animate-children`}
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => setActiveAchievement(index)}
              onMouseLeave={() => setActiveAchievement(null)}
            >
              {/* Floating particle effects */}
              <div className="absolute inset-0 pointer-events-none achievement-particles">
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i}
                    className={`absolute w-1 h-1 rounded-full ${achievement.color.replace('bg-', 'bg-opacity-30 bg-')} animate-float-particle`}
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 3}s`,
                      animationDuration: `${5 + Math.random() * 5}s`,
                      opacity: activeAchievement === index ? 0.7 : 0
                    }}
                  ></div>
                ))}
              </div>
              
              {/* Background gradient effect */}
              <div 
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${achievement.color} bg-opacity-5`}>
              </div>
              
              <div className="relative z-10 p-6">
                {/* Award icon with interactive background */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500 ${achievement.color} text-white`}>
                  {achievement.icon}
                  <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </div>
                
                <h3 className="text-xl font-playfair mb-3 text-navy-800 group-hover:text-navy-900 transition-colors">
                  {achievement.title}
                </h3>
                
                <div className="flex flex-col space-y-2 mb-4">
                  <div className="flex items-center text-sm text-navy-600">
                    <MapPin className="h-3.5 w-3.5 mr-1.5 text-navy-500" />
                    <span>{achievement.organization}</span>
                  </div>
                  <div className="flex items-center text-sm text-navy-500">
                    <Calendar className="h-3.5 w-3.5 mr-1.5 text-navy-400" />
                    <span>{achievement.year}</span>
                  </div>
                </div>
                
                <p className="text-navy-600 text-sm">{achievement.description}</p>
                
                {/* Animated corner accent */}
                <div className={`absolute bottom-0 right-0 w-12 h-12 ${achievement.color} opacity-0 group-hover:opacity-20 transition-all duration-700 transform translate-y-full translate-x-full group-hover:translate-y-0 group-hover:translate-x-0 rounded-tl-xl`}></div>
                
                {/* Animated bottom border */}
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${achievement.color} transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500`}></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Interactive premium timeline */}
        <div className="relative mt-24 mb-8 section-animate-delay" ref={timelineRef}>
          <h3 className="text-2xl md:text-3xl font-playfair text-navy-800 text-center mb-16">
            Professional Journey
          </h3>
          
          {/* Vertical timeline for medium screens and up - IMPROVED */}
          <div className="hidden md:block relative">
            {/* Enhanced vertical line with gradient and subtle glow */}
            <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gradient-to-b from-navy-100 via-navy-300 to-navy-100 transform -translate-x-1/2 z-0 shadow-sm"></div>
            
            {leadershipPositions.map((position, index) => (
              <div 
                key={index} 
                data-index={index}
                className={`timeline-item flex items-start mb-20 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} relative`}
              >
                {/* Improved timeline dot with pulse animation */}
                <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                  <div className={`w-5 h-5 rounded-full border-4 transition-all duration-500 ${
                    visibleTimeline === index ? 'border-gold-500 scale-110' : 'border-navy-300'
                  } bg-white shadow-md`}>
                    {visibleTimeline === index && (
                      <span className="absolute inset-0 rounded-full bg-gold-200 opacity-60 animate-ping-slow"></span>
                    )}
                  </div>
                </div>
                
                {/* Improved connecting line between dot and content */}
                <div className={`absolute top-2.5 ${index % 2 === 0 ? 'left-1/2' : 'right-1/2'} ${
                  index % 2 === 0 ? 'w-[10%]' : 'w-[10%]'
                } h-0.5 ${
                  visibleTimeline === index ? 'bg-gradient-to-r from-gold-500 to-navy-200' : 'bg-navy-200'
                } z-5 transition-colors duration-500 ${index % 2 === 0 ? '' : 'transform rotate-180'}`}></div>
                
                {/* Content card with improved spacing */}
                <div className={`w-[45%] ${index % 2 === 0 ? 'pr-[5%] text-right ml-auto' : 'pl-[5%] mr-auto'} transition-all duration-700 transform ${
                  visibleTimeline === index ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}>
                  <div className={`bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border ${
                    position.highlight ? 'border-gold-200' : 'border-navy-100'
                  } hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
                    {index % 2 === 0 ? (
                      /* Right-aligned content */
                      <>
                        <div className="flex items-center justify-end gap-3 mb-3">
                          <h4 className="text-xl font-playfair text-navy-800">{position.title}</h4>
                          <div className={`p-2 rounded-lg ${
                            position.highlight ? 'bg-gold-100 text-gold-700' : 'bg-navy-100 text-navy-600'
                          }`}>
                            {position.icon}
                          </div>
                        </div>
                        
                        <p className="text-navy-600 text-sm mb-3">{position.organization}</p>
                        <p className="text-navy-500 text-xs mb-4 font-medium">{position.period}</p>
                        
                        {position.responsibilities.length > 0 && (
                          <ul className="space-y-2">
                            {position.responsibilities.map((item, idx) => (
                              <li key={idx} className="flex items-baseline justify-end gap-2 text-navy-600 text-sm">
                                <span className="text-right">{item}</span>
                                <Check size={14} className={`flex-shrink-0 ${position.highlight ? 'text-gold-500' : 'text-navy-400'}`} />
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      /* Left-aligned content */
                      <>
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`p-2 rounded-lg ${
                            position.highlight ? 'bg-gold-100 text-gold-700' : 'bg-navy-100 text-navy-600'
                          }`}>
                            {position.icon}
                          </div>
                          <h4 className="text-xl font-playfair text-navy-800">{position.title}</h4>
                        </div>
                        
                        <p className="text-navy-600 text-sm mb-3">{position.organization}</p>
                        <p className="text-navy-500 text-xs mb-4 font-medium">{position.period}</p>
                        
                        {position.responsibilities.length > 0 && (
                          <ul className="space-y-2">
                            {position.responsibilities.map((item, idx) => (
                              <li key={idx} className="flex items-baseline gap-2 text-navy-600 text-sm">
                                <Check size={14} className={`flex-shrink-0 ${position.highlight ? 'text-gold-500' : 'text-navy-400'}`} />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    )}
                  </div>
                </div>
                
                {/* Year marker on the opposite side with improved positioning */}
                <div className={`absolute ${index % 2 === 0 ? 'left-[calc(50%-80px)]' : 'right-[calc(50%-80px)]'} top-2 transition-all duration-700 delay-300 transform ${
                  visibleTimeline === index ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}>
                  <div className={`inline-block px-4 py-2 rounded-md ${
                    position.highlight ? 'bg-gold-50 text-gold-700 border border-gold-100' : 'bg-navy-50 text-navy-700 border border-navy-100'
                  }`}>
                    {position.period}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Mobile timeline (vertical stacked) */}
          <div className="md:hidden relative">
            {/* Vertical line */}
            <div className="absolute top-0 bottom-0 left-4 w-0.5 bg-gradient-to-b from-navy-100 via-navy-200 to-navy-100 z-0"></div>
            
            {leadershipPositions.map((position, index) => (
              <div 
                key={index} 
                className="timeline-item relative pl-12 mb-12 pb-8"
                data-index={index}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 top-0 transform -translate-x-1/2 z-10">
                  <div className={`w-4 h-4 rounded-full border-4 ${
                    visibleTimeline === index ? 'border-gold-500' : 'border-navy-300'
                  } bg-white`}></div>
                </div>
                
                <div className={`bg-white/90 backdrop-blur-sm p-5 rounded-xl shadow-lg border ${
                  position.highlight ? 'border-gold-200' : 'border-navy-100'
                } transition-all duration-300`}>
                  <div className="inline-block px-3 py-1 text-xs font-medium rounded-full mb-3 text-navy-500 bg-navy-50">
                    {position.period}
                  </div>
                  
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg ${
                      position.highlight ? 'bg-gold-100 text-gold-700' : 'bg-navy-100 text-navy-600'
                    }`}>
                      {position.icon}
                    </div>
                    <h4 className="text-lg font-playfair text-navy-800">{position.title}</h4>
                  </div>
                  
                  <p className="text-navy-600 text-sm mb-4">{position.organization}</p>
                  
                  {position.responsibilities.length > 0 && (
                    <ul className="space-y-2">
                      {position.responsibilities.map((item, idx) => (
                        <li key={idx} className="flex items-baseline gap-2 text-navy-600 text-sm">
                          <Check size={14} className={`flex-shrink-0 ${position.highlight ? 'text-gold-500' : 'text-navy-400'}`} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Premium animations and styles */}
      <style>{`
        .section-animate {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .section-visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .section-animate-delay {
          transition-delay: 0.4s;
        }
        
        .section-animate-children {
          opacity: 0;
          transform: translateY(15px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .section-visible .section-animate-children {
          opacity: 1;
          transform: translateY(0);
        }
        
        .section-visible .section-animate-children:nth-child(1) { transition-delay: 0.2s; }
        .section-visible .section-animate-children:nth-child(2) { transition-delay: 0.4s; }
        .section-visible .section-animate-children:nth-child(3) { transition-delay: 0.6s; }
        
        .achievement-card {
          transform: perspective(1000px) rotateY(0deg);
          transition: transform 0.8s ease;
        }
        
        .achievement-card:hover {
          transform: perspective(1000px) rotateY(5deg);
        }
        
        @keyframes float-particle {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-15px) translateX(10px); }
        }
        
        .animate-float-particle {
          animation: float-particle 5s ease-in-out infinite;
        }
        
        .text-gradient {
          background: linear-gradient(90deg, #694E2E, #BF953F, #FCF6BA, #B38728);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 300% 100%;
          animation: gradient-shift 8s ease infinite;
        }
        
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(20px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        .animate-blob {
          animation: blob 20s infinite alternate;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.6; }
          75%, 100% { transform: scale(1.6); opacity: 0; }
        }
        
        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </section>
  );
};

export default Leadership;

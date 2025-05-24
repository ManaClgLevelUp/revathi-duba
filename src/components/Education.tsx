import React, { useEffect, useRef, useState } from 'react';
import { GraduationCap, MapPin, Calendar, Award, ExternalLink, ChevronRight, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';

// Animation styles as a separate component to avoid TypeScript errors
const AnimationStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    @keyframes ping-slow {
      0% { transform: scale(1); opacity: 0.8; }
      70% { transform: scale(2); opacity: 0; }
      100% { transform: scale(2.5); opacity: 0; }
    }
    
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }
    
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    
    .animate-ping-slow {
      animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
    }
    
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
    
    .animate-pulse-slow {
      animation: pulse 3s ease-in-out infinite;
    }
  `}} />
);

const Education = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const timelineRef = useRef(null);
  const sectionRef = useRef(null);
  const nodeRefs = useRef([]);
  
  const educationHistory = [
    {
      degree: 'Ph.D.: Electrical and Computer Engineering',
      institution: 'Lincoln University College',
      location: 'Malaysia',
      years: '2023',
      description: 'Doctoral research focused on advanced applications of AI in electrical power systems.',
      achievements: ['Research focusing on AI integration in smart grid systems', 'International research collaboration'],
      color: 'bg-indigo-600',
      gradient: 'from-indigo-400 to-indigo-600',
      lightGradient: 'from-indigo-50 to-indigo-100',
      borderColor: 'border-indigo-600',
      textColor: 'text-indigo-600'
    },
    {
      degree: 'Master of Technology: Artificial Intelligence and Data Science',
      institution: 'Jawaharlal Nehru Technological University',
      location: 'Kakinada, India',
      years: '2024',
      description: 'First class with Distinction. Final Grade: 83%',
      achievements: ['Advanced research in AI applications', 'Top performer in data science projects'],
      color: 'bg-blue-600',
      gradient: 'from-blue-400 to-blue-600',
      lightGradient: 'from-blue-50 to-blue-100',
      borderColor: 'border-blue-600',
      textColor: 'text-blue-600'
    },
    {
      degree: 'One Year Certification Courses: Artificial Intelligence and Machine Learning',
      institution: 'Indian Institute of Technology',
      location: 'Kanpur, India',
      years: '2023',
      description: 'Specialized training in cutting-edge AI and ML technologies with practical applications.',
      achievements: ['Completed advanced machine learning projects', 'Received excellence certification'],
      color: 'bg-cyan-600',
      gradient: 'from-cyan-400 to-cyan-600',
      lightGradient: 'from-cyan-50 to-cyan-100',
      borderColor: 'border-cyan-600',
      textColor: 'text-cyan-600'
    },
    {
      degree: 'MBA: Marketing Management and Human Resource Management',
      institution: 'Adikavi Nannayya University',
      location: 'Rajahmundry, India',
      years: '2019',
      description: 'First Class with Distinction. Final Grade: CGPA 7.93',
      achievements: ['Specialized in educational marketing strategies', 'Leadership development focus'],
      color: 'bg-emerald-600',
      gradient: 'from-emerald-400 to-emerald-600',
      lightGradient: 'from-emerald-50 to-emerald-100',
      borderColor: 'border-emerald-600',
      textColor: 'text-emerald-600'
    },
    {
      degree: 'Post-Graduation Diploma in Energy Management',
      institution: 'MIT',
      location: 'Pune, India',
      years: '2019',
      description: 'Final Grade: A',
      achievements: ['Focus on renewable energy systems', 'Sustainable energy management practices'],
      color: 'bg-teal-600',
      gradient: 'from-teal-400 to-teal-600',
      lightGradient: 'from-teal-50 to-teal-100',
      borderColor: 'border-teal-600',
      textColor: 'text-teal-600'
    },
    {
      degree: 'Master of Technology: Power Systems and High Voltage Engineering',
      institution: 'Jawaharlal Technological University Kakinada',
      location: 'Kakinada, India',
      years: '2011',
      description: 'First class with Distinction. Final Grade: 83%. Recipient of University Topper',
      achievements: ['University gold medalist', 'Published research on power systems optimization'],
      color: 'bg-amber-600',
      gradient: 'from-amber-400 to-amber-600',
      lightGradient: 'from-amber-50 to-amber-100',
      borderColor: 'border-amber-600',
      textColor: 'text-amber-600'
    },
    {
      degree: 'Bachelor of Technology: Electrical and Electronics Engineering',
      institution: 'Jawaharlal Technological University Hyderabad',
      location: 'Hyderabad, India',
      years: '2007',
      description: 'First Class with Distinction. Final Grade: 76%',
      achievements: ['Excellence in technical projects', 'Active participation in IEEE student branch'],
      color: 'bg-orange-600',
      gradient: 'from-orange-400 to-orange-600',
      lightGradient: 'from-orange-50 to-orange-100',
      borderColor: 'border-orange-600',
      textColor: 'text-orange-600'
    },
    {
      degree: 'Board of Intermediate Studies: MPC',
      institution: 'Pragati Junior College',
      location: 'Kakinada, India',
      years: '2003',
      description: 'Final Grade: 80.1%',
      achievements: ['Mathematics and Science distinction', 'Academic scholarship recipient'],
      color: 'bg-rose-600',
      gradient: 'from-rose-400 to-rose-600',
      lightGradient: 'from-rose-50 to-rose-100',
      borderColor: 'border-rose-600',
      textColor: 'text-rose-600'
    }
  ];

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initialize node refs with proper fill argument to fix TS error
  useEffect(() => {
    nodeRefs.current = Array(educationHistory.length).fill(null).map(() => React.createRef());
  }, [educationHistory.length]);

  // Improved timeline animation with better responsiveness
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current || !sectionRef.current) return;
      
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const timelineHeight = timelineRef.current.parentElement?.offsetHeight || 0;
      const viewportHeight = window.innerHeight;
      
      // Responsive calculation based on device type
      const visibilityThreshold = isMobile ? 0.7 : 0.8;
      const speedMultiplier = isMobile ? 1.4 : 1.2; // Faster progression on mobile
      
      // Calculate section visibility
      const sectionVisible = sectionRect.top < viewportHeight * visibilityThreshold;
      
      if (sectionVisible) {
        // Calculate scroll progress with improved sensitivity
        const scrolledDistance = viewportHeight - sectionRect.top;
        const totalScrollDistance = sectionRect.height + viewportHeight * 0.5;
        const progress = Math.max(0, Math.min(1, scrolledDistance / totalScrollDistance * speedMultiplier));
        
        // Apply timeline progress with smoother animation
        if (timelineRef.current) {
          timelineRef.current.style.height = `${progress * 100}%`;
        }
        
        // Determine which education item should be active based on scroll
        const activeItemIndex = Math.min(
          educationHistory.length - 1,
          Math.floor(progress * educationHistory.length * 1.2)
        );
        
        if (activeItemIndex >= 0) {
          setActiveIndex(activeItemIndex);
          
          // Reveal items up to current index with staggered effect
          const newRevealed = {};
          for (let i = 0; i <= activeItemIndex; i++) {
            newRevealed[i] = true;
          }
          setIsRevealed(prev => ({...prev, ...newRevealed}));
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial call with slight delay to ensure proper setup
    setTimeout(handleScroll, 200);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [educationHistory.length, isMobile]);

  // Function to toggle education details
  const toggleDetails = (index) => {
    setIsRevealed(prev => ({
      ...prev,
      [`details-${index}`]: !prev[`details-${index}`]
    }));
  };
  
  // Scroll to a specific node with improved positioning
  const scrollToNode = (index) => {
    if (nodeRefs.current[index] && nodeRefs.current[index].current) {
      const yOffset = -120; // Adjust offset to position the node better in view
      const element = nodeRefs.current[index].current;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="education" ref={sectionRef} className="py-16 md:py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Add animation styles properly to avoid TypeScript errors */}
      <AnimationStyles />
      
      {/* Dynamic background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-300 to-purple-400 rounded-full filter blur-3xl animate-float"></div>
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-gradient-to-r from-amber-300 to-pink-400 rounded-full filter blur-3xl" style={{animationDelay: '-3s', animationDuration: '9s'}}></div>
        <div className="absolute -bottom-40 left-20 w-72 h-72 bg-gradient-to-r from-emerald-300 to-cyan-400 rounded-full filter blur-3xl" style={{animationDelay: '-5s', animationDuration: '12s'}}></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Enhanced section header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block mb-3 px-3 py-1 bg-blue-50 rounded-full text-blue-600 text-xs font-semibold tracking-wider animate-pulse-slow">
            ACADEMIC JOURNEY
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Educational Timeline
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-600 text-sm md:text-base">
            A journey through knowledge, research, and academic achievement across multiple disciplines
            and prestigious institutions.
          </p>
        </div>
        
        {/* Responsive timeline navigation pills - horizontally scrollable on mobile */}
        <div className="mb-10 md:mb-12 overflow-x-auto -mx-4 px-4 py-2 md:overflow-visible md:px-0 md:mx-0">
          <div className="flex flex-nowrap md:flex-wrap min-w-max md:min-w-0 justify-start md:justify-center gap-2 md:gap-3">
            {educationHistory.map((item, index) => (
              <button
                key={`nav-${index}`}
                onClick={() => scrollToNode(index)}
                className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full transition-all duration-300 text-xs md:text-sm font-medium flex items-center gap-1.5 md:gap-2 whitespace-nowrap
                  ${activeIndex === index 
                    ? `${item.color} text-white shadow-lg` 
                    : `bg-white hover:bg-gray-100 ${item.textColor} border border-gray-200}`}`
                }
              >
                <span>{item.years}</span>
                <span className="truncate max-w-[100px] md:max-w-xs">{item.degree.split(':')[0]}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Main timeline container - Responsive layout for all devices */}
        <div className="relative flex justify-center">
          {/* Timeline line - Responsive positioning */}
          <div className={`absolute top-0 h-full w-1 bg-gray-200 rounded-full z-10 
            ${isMobile ? 'left-5 sm:left-8' : 'left-1/2 transform -translate-x-1/2'}`}></div>
          
          {/* Active progress bar - Responsive positioning with glow effect */}
          <div 
            ref={timelineRef}
            className={`absolute top-0 w-1.5 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full z-20
              ${isMobile ? 'left-5 sm:left-8' : 'left-1/2 transform -translate-x-1/2'}`}
            style={{ 
              height: '0%', 
              transition: 'height 0.4s ease-out', 
              boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)' 
            }}
          ></div>
          
          {/* Education items container */}
          <div className="w-full max-w-6xl">
            {educationHistory.map((education, index) => {
              const isEven = index % 2 === 0;
              return (
                <div 
                  key={index}
                  ref={nodeRefs.current[index]}
                  className={`relative mb-12 md:mb-16 flex 
                    ${!isMobile ? (isEven ? 'md:justify-start' : 'md:justify-end') : 'justify-start'}`}
                >
                  {/* Timeline node - Responsive positioning - FIX for mobile centering */}
                  <div className={`absolute z-30 flex items-center justify-center top-5
                    ${isMobile ? 'left-6 sm:left-8 transform -translate-x-1/2' : 'left-1/2 transform -translate-x-1/2'}`}
                  >
                    <div className={`
                      w-6 h-6 rounded-full ${isRevealed[index] ? education.color : 'bg-gray-300'} 
                      transition-all duration-500 shadow-lg
                      ${isRevealed[index] ? 'scale-100' : 'scale-75 opacity-70'}
                      hover:scale-125 hover:shadow-lg cursor-pointer
                    `}>
                      <div className="absolute inset-0 rounded-full animate-ping-slow opacity-60 bg-white"></div>
                    </div>
                  </div>
                  
                  {/* Card - hug the timeline on desktop */}
                  <div className={`
                    ${isMobile
                      ? 'ml-12 sm:ml-16 w-full'
                      : (isEven
                          ? 'md:pr-0 md:-mr-12 md:w-[42%]'   // Increased negative margin and reduced width
                          : 'md:pl-0 md:-ml-12 md:w-[45%]'   // for both sides
                        )
                    } 
                    transform transition-all duration-700 
                    ${isRevealed[index] 
                      ? 'translate-y-0 opacity-100' 
                      : (isMobile ? 'translate-y-8' : `${isEven ? '-translate-x-12' : 'translate-x-12'}`)+' opacity-0'}
                  `}
                  >
                    <div className="relative">
                      {/* Year marker with improved padding for better text coverage */}
                      <div 
                        className={`
                          absolute text-sm font-bold inline-flex items-center justify-center
                          px-3 py-1.5 md:px-4 md:py-2 min-w-[2.5rem] rounded-full shadow-sm whitespace-nowrap
                          ${isMobile 
                            ? 'top-0 right-2 -translate-y-1/2' 
                            : `top-4 ${isEven ? 'right-0 md:left-full md:translate-x-6' : 'left-0 md:right-full md:-translate-x-6'}`}
                          z-20 text-white ${education.color}
                        `}
                      >
                        {education.years}
                      </div>
                      
                      {/* Enhanced card with better hover effects */}
                      <div 
                        className={`
                          p-5 md:p-6 rounded-xl shadow-xl bg-white border-t-4 
                          ${education.borderColor} overflow-hidden relative group
                          transition-all duration-500 hover:shadow-2xl hover:-translate-y-1
                          ${isMobile ? 'mt-4' : ''}
                        `}
                      >
                        {/* Card decoration */}
                        <div className={`absolute top-0 right-0 h-24 w-24 -mt-8 -mr-8 rounded-full bg-gradient-to-br ${education.lightGradient} opacity-50`}></div>
                        
                        {/* Card content */}
                        <div className="relative">
                          <div className={`p-3 rounded-lg bg-gradient-to-br ${education.lightGradient} inline-flex mb-4`}>
                            <GraduationCap size={22} className={education.textColor} />
                          </div>
                          
                          <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                            {education.degree}
                          </h3>
                          
                          <h4 className="text-lg font-medium text-gray-800 mb-3">
                            {education.institution}
                          </h4>
                          
                          <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <MapPin size={16} className="mr-1 opacity-70" />
                              <span>{education.location}</span>
                            </div>
                          </div>
                          
                          <p className="text-gray-600 mb-4">
                            {education.description}
                          </p>
                          
                          {/* Expandable achievements with improved animation */}
                          <div 
                            className={`
                              overflow-hidden transition-all duration-500
                              ${isRevealed[`details-${index}`] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                            `}
                          >
                            <div className="pt-4 border-t border-gray-100">
                              <h5 className="font-medium text-gray-900 mb-3">Key Achievements</h5>
                              <ul className="space-y-2">
                                {education.achievements.map((achievement, idx) => (
                                  <li key={idx} className="flex items-start">
                                    <div className={`mt-1.5 mr-3 w-1.5 h-1.5 rounded-full ${education.color} flex-shrink-0`}></div>
                                    <span className="text-gray-600">{achievement}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          
                          {/* Enhanced toggle button */}
                          <button
                            onClick={() => toggleDetails(index)}
                            className={`
                              mt-4 px-4 py-1.5 rounded-full text-sm font-medium 
                              border transition-all duration-300 flex items-center
                              ${education.borderColor} ${education.textColor}
                              hover:bg-gray-50 active:scale-95
                            `}
                          >
                            {isRevealed[`details-${index}`] ? (
                              <>Hide details <ChevronUp size={16} className="ml-1" /></>
                            ) : (
                              <>View details <ChevronDown size={16} className="ml-1" /></>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Responsive statistics grid */}
        <div className="mt-20 mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="bg-white rounded-xl shadow-xl p-6 flex flex-col items-center justify-center text-center transition-all hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden group">
              <div className="absolute top-0 right-0 h-32 w-32 -mt-10 -mr-10 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mb-4 relative z-10">
                <Award size={30} className="text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-1 relative z-10">8</div>
              <p className="text-gray-600 text-sm font-medium relative z-10">Degrees & Diplomas</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-xl p-6 flex flex-col items-center justify-center text-center transition-all hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden group">
              <div className="absolute top-0 right-0 h-32 w-32 -mt-10 -mr-10 rounded-full bg-gradient-to-br from-purple-50 to-purple-100 opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center mb-4 relative z-10">
                <GraduationCap size={30} className="text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-1 relative z-10">20+</div>
              <p className="text-gray-600 text-sm font-medium relative z-10">Years in Academia</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-xl p-6 flex flex-col items-center justify-center text-center transition-all hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden group">
              <div className="absolute top-0 right-0 h-32 w-32 -mt-10 -mr-10 rounded-full bg-gradient-to-br from-amber-50 to-amber-100 opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mb-4 relative z-10">
                <Award size={30} className="text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-1 relative z-10">5+</div>
              <p className="text-gray-600 text-sm font-medium relative z-10">Academic Honors</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-xl p-6 flex flex-col items-center justify-center text-center transition-all hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden group">
              <div className="absolute top-0 right-0 h-32 w-32 -mt-10 -mr-10 rounded-full bg-gradient-to-br from-emerald-50 to-emerald-100 opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center mb-4 relative z-10">
                <BookOpen size={30} className="text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-1 relative z-10">3+</div>
              <p className="text-gray-600 text-sm font-medium relative z-10">Fields of Expertise</p>
            </div>
          </div>
        </div>
        
        {/* Responsive CTA section */}
        <div className="text-center mt-16">
          <a 
            href="#contact" 
            className="inline-flex items-center px-5 py-3 md:px-6 md:py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 group text-sm md:text-base"
          >
            <span>Connect for Academic Collaborations</span>
            <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Education;
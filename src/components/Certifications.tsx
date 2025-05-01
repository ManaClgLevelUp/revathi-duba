import React, { useState, useEffect, useRef } from 'react';
import { 
  Award, GraduationCap, Briefcase, Users, CheckCircle, 
  Shield, Star, ChevronRight, Layers, BookOpen, 
  ExternalLink, Activity, Compass, Grid, Zap, Globe
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Certifications = () => {
  // Animation-related state
  const [activeTab, setActiveTab] = useState<'certifications' | 'activities' | 'memberships'>('certifications');
  const [hovered, setHovered] = useState<string | null>(null);
  const [animatedNumbers, setAnimatedNumbers] = useState({
    workshops: 0,
    fdps: 0,
    activities: 0,
    memberships: 0
  });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Certification platforms with their respective data
  const certificationPlatforms = [
    { 
      name: 'NPTEL', 
      icon: <Award size={24} />, 
      color: 'from-blue-500 to-blue-600',
      description: 'National Programme on Technology Enhanced Learning',
      logo: '/src/images/nptel-logo.png',
    },
    { 
      name: 'Coursera', 
      icon: <GraduationCap size={24} />, 
      color: 'from-blue-600 to-indigo-600',
      description: 'Global online learning platform',
      logo: '/src/images/coursera-logo.png',
    },
    { 
      name: 'edX', 
      icon: <BookOpen size={24} />, 
      color: 'from-red-500 to-red-600',
      description: 'Massive open online course provider',
      logo: '/src/images/edx-logo.png',
    },
    { 
      name: 'TEQIP', 
      icon: <Briefcase size={24} />, 
      color: 'from-green-500 to-green-600',
      description: 'Technical Education Quality Improvement Programme',
      logo: '/src/images/teqip-logo.png',
    },
    { 
      name: 'IIT FDPs', 
      icon: <Users size={24} />, 
      color: 'from-amber-500 to-amber-600',
      description: 'Faculty Development Programs from IITs',
      logo: '/src/images/iit-logo.png',
    }
  ];

  // Administrative activities
  const activities = [
    { 
      title: 'ISO & NAAC Coordinator', 
      icon: <Shield className="text-blue-600" size={22} />,
      description: 'Leading accreditation and quality assessment initiatives'
    },
    { 
      title: 'AICTE, UGC, JNTUK Approval Handler', 
      icon: <CheckCircle className="text-green-600" size={22} />,
      description: 'Successfully managing regulatory compliance and accreditation work'
    },
    { 
      title: 'Industrial Academic Coordinator', 
      icon: <Briefcase className="text-amber-600" size={22} />,
      description: 'Bridging the gap between industry requirements and academic curriculum'
    },
    { 
      title: 'IIT Bombay Remote Center Coordinator', 
      icon: <Globe className="text-purple-600" size={22} />,
      description: 'Led as coordinator in 2017 for remote learning initiatives'
    },
    { 
      title: 'IIIT Hyderabad Research Affiliate Program Coordinator', 
      icon: <Compass className="text-indigo-600" size={22} />,
      description: 'Facilitating research collaboration programs with IIIT Hyderabad'
    },
    { 
      title: 'Academic Advisory Board Member', 
      icon: <Users className="text-teal-600" size={22} />,
      description: 'Contributing to academic excellence at KIET Group of Institutions'
    },
    { 
      title: 'Edunet Regional Projects Showcase Collaboration', 
      icon: <Layers className="text-cyan-600" size={22} />,
      description: 'Leading CSR initiative programs in partnership with Microsoft and SAP'
    },
    { 
      title: 'Academic Member of AICTE-Eduskills', 
      icon: <BookOpen className="text-rose-600" size={22} />,
      description: 'Contributing to skill development initiatives under AICTE'
    }
  ];

  // Memberships
  const memberships = [
    {
      organization: 'APSSDC, IL&FS Advisory Member',
      role: 'Advisory Member',
      description: 'Central Government Initiative, India',
      icon: <Star className="text-amber-500" size={22} />,
      year: 'Since 2018'
    },
    {
      organization: 'The Institution of Engineers (India)',
      role: 'Student Chapter Member',
      description: 'Professional membership supporting engineering excellence',
      icon: <Shield className="text-blue-500" size={22} />,
      year: 'Since 2015'
    }
  ];

  // Animation for counting up numbers when section becomes visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  // Animate numbers counting up
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setAnimatedNumbers(prev => ({
          workshops: prev.workshops < 10 ? prev.workshops + 1 : prev.workshops,
          fdps: prev.fdps < 10 ? prev.fdps + 1 : prev.fdps,
          activities: prev.activities < activities.length ? prev.activities + 1 : prev.activities,
          memberships: prev.memberships < memberships.length ? prev.memberships + 1 : prev.memberships
        }));
      }, 150);

      return () => clearInterval(interval);
    }
  }, [isVisible, activities.length, memberships.length]);

  // Animated background pattern effect
  const patternRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (patternRef.current) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        patternRef.current.style.transform = `translate(${x * 15}px, ${y * 15}px)`;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section 
      id="certifications" 
      ref={sectionRef}
      className="section-padding relative bg-gradient-to-b from-secondary/20 to-white overflow-hidden"
    >
      {/* Dynamic background pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
        <div ref={patternRef} className="absolute inset-0 transition-transform duration-300 ease-out">
          <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-purple-300/20 to-cyan-300/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-amber-300/20 to-rose-300/20 rounded-full blur-3xl"></div>
        </div>
      </div>
      
      <div className="luxury-container relative z-10">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-medium mb-4">Professional Development & Activities</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-gold-500 to-amber-300 mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-navy-600">
            Continuously enhancing skills through certifications and contributing to the educational community 
            through various leadership roles and administrative activities.
          </p>
        </div>

        {/* Stats Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="luxury-card bg-white backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 transform hover:-translate-y-1 transition-all hover:shadow-lg hover:shadow-gold-100/30">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center mb-3">
              <GraduationCap size={28} className="text-purple-600" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-playfair text-navy-900 mb-1">5+</span>
              <span className="text-lg text-purple-600">+</span>
            </div>
            <p className="text-navy-600 text-sm font-medium">Certification Platforms</p>
          </div>

          <div className="luxury-card bg-white backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 transform hover:-translate-y-1 transition-all hover:shadow-lg hover:shadow-gold-100/30">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center mb-3">
              <Grid size={28} className="text-blue-600" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-playfair text-navy-900 mb-1">{animatedNumbers.workshops}</span>
              <span className="text-lg text-blue-600">+</span>
            </div>
            <p className="text-navy-600 text-sm font-medium">Workshops Attended</p>
          </div>

          <div className="luxury-card bg-white backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 transform hover:-translate-y-1 transition-all hover:shadow-lg hover:shadow-gold-100/30">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center mb-3">
              <Activity size={28} className="text-amber-600" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-playfair text-navy-900 mb-1">{animatedNumbers.fdps}</span>
              <span className="text-lg text-amber-600">+</span>
            </div>
            <p className="text-navy-600 text-sm font-medium">Faculty Development Programs</p>
          </div>

          <div className="luxury-card bg-white backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 transform hover:-translate-y-1 transition-all hover:shadow-lg hover:shadow-gold-100/30">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center mb-3">
              <Zap size={28} className="text-green-600" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-playfair text-navy-900 mb-1">{animatedNumbers.activities}</span>
              <span className="text-lg text-green-600">+</span>
            </div>
            <p className="text-navy-600 text-sm font-medium">Administrative Roles</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setActiveTab('certifications')}
              className={cn(
                "px-5 py-3 rounded-md flex items-center gap-2 font-medium transition-all duration-300",
                activeTab === 'certifications' 
                  ? "bg-navy-900 text-white shadow-lg shadow-navy-900/20" 
                  : "bg-white text-navy-700 border border-navy-100 hover:bg-navy-50"
              )}
            >
              <GraduationCap size={18} />
              <span>Certifications</span>
            </button>
            
            <button
              onClick={() => setActiveTab('activities')}
              className={cn(
                "px-5 py-3 rounded-md flex items-center gap-2 font-medium transition-all duration-300",
                activeTab === 'activities' 
                  ? "bg-navy-900 text-white shadow-lg shadow-navy-900/20" 
                  : "bg-white text-navy-700 border border-navy-100 hover:bg-navy-50"
              )}
            >
              <Briefcase size={18} />
              <span>Administrative Roles</span>
            </button>
            
            <button
              onClick={() => setActiveTab('memberships')}
              className={cn(
                "px-5 py-3 rounded-md flex items-center gap-2 font-medium transition-all duration-300",
                activeTab === 'memberships' 
                  ? "bg-navy-900 text-white shadow-lg shadow-navy-900/20" 
                  : "bg-white text-navy-700 border border-navy-100 hover:bg-navy-50"
              )}
            >
              <Users size={18} />
              <span>Memberships</span>
            </button>
          </div>
        </div>

        {/* Certifications Tab Content */}
        <div 
          className={cn(
            "transition-all duration-500 transform",
            activeTab === 'certifications' 
              ? "opacity-100 translate-x-0" 
              : "opacity-0 absolute -translate-x-8 pointer-events-none"
          )}
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl font-playfair mb-3">Certifications & Professional Development</h3>
            <p className="text-navy-600 max-w-2xl mx-auto">
              Continuous learning through prestigious educational platforms and professional development programs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certificationPlatforms.map((platform, index) => (
              <div 
                key={index}
                className="luxury-card group bg-white backdrop-blur-sm border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                onMouseEnter={() => setHovered(platform.name)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="flex items-start gap-5 mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${platform.color} flex items-center justify-center text-white transform transition-transform duration-300 ${hovered === platform.name ? 'scale-110 rotate-6' : ''}`}>
                    {platform.icon}
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-playfair text-navy-900 mb-1">{platform.name}</h4>
                    <p className="text-navy-600 text-sm">{platform.description}</p>
                  </div>
                </div>
                
                <div className={`h-0.5 w-0 bg-gradient-to-r ${platform.color} transition-all duration-500 group-hover:w-full mb-4`}></div>
                
                <div className={`transition-all duration-300 ${hovered === platform.name ? 'opacity-100' : 'opacity-70'}`}>
                  <p className="text-navy-600 text-sm flex items-center mb-3">
                    <CheckCircle size={16} className="mr-2 text-green-500" />
                    <span>Advanced level certification courses</span>
                  </p>
                  <p className="text-navy-600 text-sm flex items-center">
                    <CheckCircle size={16} className="mr-2 text-green-500" />
                    <span>Industry-recognized credentials</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="luxury-card bg-gradient-to-br from-blue-50 to-blue-100 border-none hover:shadow-lg transition-all">
              <h4 className="text-lg font-playfair mb-4 flex items-center text-navy-900">
                <Grid className="mr-2 text-blue-600" size={20} />
                <span>Workshops & Training</span>
              </h4>
              
              <div className="flex items-center justify-between mb-3">
                <span className="text-navy-700 font-medium">Workshops Attended</span>
                <div className="flex items-center">
                  <span className="text-2xl font-playfair text-navy-900">10</span>
                  <span className="text-blue-600 ml-1">+</span>
                </div>
              </div>
              
              <div className="h-2 w-full bg-blue-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 w-full rounded-full"></div>
              </div>
              
              <p className="mt-4 text-navy-600 text-sm">
                Participated in specialized technical and pedagogical workshops focusing on emerging technologies
                and innovative teaching methodologies.
              </p>
            </div>
            
            <div className="luxury-card bg-gradient-to-br from-amber-50 to-amber-100 border-none hover:shadow-lg transition-all">
              <h4 className="text-lg font-playfair mb-4 flex items-center text-navy-900">
                <Users className="mr-2 text-amber-600" size={20} />
                <span>Faculty Development Programs</span>
              </h4>
              
              <div className="flex items-center justify-between mb-3">
                <span className="text-navy-700 font-medium">FDPs Completed</span>
                <div className="flex items-center">
                  <span className="text-2xl font-playfair text-navy-900">10</span>
                  <span className="text-amber-600 ml-1">+</span>
                </div>
              </div>
              
              <div className="h-2 w-full bg-amber-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-500 to-amber-600 w-full rounded-full"></div>
              </div>
              
              <p className="mt-4 text-navy-600 text-sm">
                Engaged in faculty development programs offered by premier institutes to enhance teaching skills 
                and subject knowledge in specialized domains.
              </p>
            </div>
          </div>
        </div>

        {/* Activities Tab Content */}
        <div 
          className={cn(
            "transition-all duration-500 transform",
            activeTab === 'activities' 
              ? "opacity-100 translate-x-0" 
              : "opacity-0 absolute -translate-x-8 pointer-events-none"
          )}
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl font-playfair mb-3">Administrative & Leadership Roles</h3>
            <p className="text-navy-600 max-w-2xl mx-auto">
              Taking initiative and providing leadership in various academic and administrative capacities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activities.map((activity, index) => (
              <div 
                key={index}
                className="luxury-card group bg-white hover:bg-gradient-to-br hover:from-white hover:to-gray-50 transition-all duration-300"
              >
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {activity.icon}
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium mb-2 text-navy-900 group-hover:text-gold-700 transition-colors">
                      {activity.title}
                    </h4>
                    <p className="text-navy-600 text-sm">{activity.description}</p>
                    
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center text-xs text-gold-600">
                      <span>Learn more</span>
                      <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Memberships Tab Content */}
        <div 
          className={cn(
            "transition-all duration-500 transform",
            activeTab === 'memberships' 
              ? "opacity-100 translate-x-0" 
              : "opacity-0 absolute -translate-x-8 pointer-events-none"
          )}
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl font-playfair mb-3">Professional Memberships</h3>
            <p className="text-navy-600 max-w-2xl mx-auto">
              Active participation in professional bodies and organizations to contribute to the broader educational community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {memberships.map((membership, index) => (
              <div 
                key={index}
                className="luxury-card group bg-white relative overflow-hidden hover:shadow-xl transition-all duration-300 border-b-2 border-transparent hover:border-gold-500"
              >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-gray-100 to-transparent rounded-bl-full opacity-50"></div>
                
                <div className="relative">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      {membership.icon}
                    </div>
                    
                    <div>
                      <h4 className="text-xl font-playfair text-navy-900 group-hover:text-gold-700 transition-colors">
                        {membership.organization}
                      </h4>
                      <p className="text-navy-500 text-sm">{membership.year}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4 pb-4 border-b border-gray-100">
                    <h5 className="text-navy-700 font-medium mb-1">{membership.role}</h5>
                    <p className="text-navy-600 text-sm">{membership.description}</p>
                  </div>
                  
                  <a 
                    href="#" 
                    className="inline-flex items-center text-navy-700 text-sm font-medium hover:text-gold-700 transition-colors"
                  >
                    <span>View details</span>
                    <ExternalLink size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;

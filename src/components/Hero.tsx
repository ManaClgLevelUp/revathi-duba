import React, { useState, useEffect, useRef } from 'react';
import { Linkedin, Facebook, Instagram, Youtube, X, ChevronDown, ArrowRight, Github, Mail } from 'lucide-react';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [deviceOrientation, setDeviceOrientation] = useState({ beta: 0, gamma: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  
  const heroRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRefs = useRef<(HTMLElement | null)[]>([]);
  
  // Initialize window size on component mount
  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
    
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle scroll events for parallax and reveal effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Handle device orientation for mobile 3D effect
  useEffect(() => {
    if (!window.DeviceOrientationEvent) return;
    
    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.beta !== null && event.gamma !== null) {
        // Normalize orientation values
        const beta = Math.min(Math.max(event.beta, -30), 30) / 30;
        const gamma = Math.min(Math.max(event.gamma, -30), 30) / 30;
        
        setDeviceOrientation({ beta, gamma });
      }
    };
    
    window.addEventListener('deviceorientation', handleOrientation as any);
    return () => window.removeEventListener('deviceorientation', handleOrientation as any);
  }, []);
  
  // Handle component load state
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  // Text reveal animation references
  useEffect(() => {
    textRefs.current = textRefs.current.slice(0, 5);
  }, []);

  // Calculate styles based on scroll and device orientation
  const getImageTransform = () => {
    const isMobile = windowSize.width < 768;
    let transform = '';
    
    // Apply parallax on scroll
    transform += `translateY(${scrollY * -0.1}px) scale(${1 + scrollY * 0.0005}) `;
    
    // Apply tilting effect based on device orientation on mobile
    if (isMobile) {
      transform += `rotateX(${deviceOrientation.beta * 10}deg) rotateY(${deviceOrientation.gamma * -10}deg)`;
    }
    
    return { transform };
  };

  // TypeWriter effect for headlines
  const TypedText = ({ text, className, delay = 0 }: any) => {
    const [displayText, setDisplayText] = useState('');
    
    useEffect(() => {
      const timeout = setTimeout(() => {
        let currentIndex = 0;
        const typeInterval = setInterval(() => {
          if (currentIndex <= text.length) {
            setDisplayText(text.substring(0, currentIndex));
            currentIndex++;
          } else {
            clearInterval(typeInterval);
          }
        }, 50);
        
        return () => clearInterval(typeInterval);
      }, delay);
      
      return () => clearTimeout(timeout);
    }, [text, delay]);
    
    return <span className={className}>{displayText}</span>;
  };

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden py-12 md:py-16 lg:py-20"
    >
      {/* Dynamic background elements with enhanced gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-luxury-50 via-luxury-100 to-secondary/70 opacity-40 z-0"></div>
      
      {/* Premium animated background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="animate-float-slow absolute top-[10%] left-[10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-gradient-to-tr from-gold-300/10 to-indigo-300/10 blur-3xl"></div>
        <div className="animate-float-slow-reverse absolute bottom-[15%] right-[5%] w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] rounded-full bg-gradient-to-bl from-navy-400/5 to-indigo-400/10 blur-3xl"></div>
        <div className="animate-pulse-slow absolute top-1/3 right-1/4 w-[20vw] h-[20vw] max-w-[300px] max-h-[300px] rounded-full bg-gradient-to-r from-indigo-300/5 to-gold-300/10 blur-3xl"></div>
      </div>
      
      {/* Enhanced grain texture with improved opacity control */}
      <div className="absolute inset-0 bg-texture opacity-[0.025] z-0 pointer-events-none"></div>
      
      {/* Particle effect overlay */}
      <div className="particles-container absolute inset-0 z-0"></div>
      
      {/* Main content container with improved responsive behavior */}
      <div className="luxury-container relative z-10 grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center px-4 sm:px-6 md:px-8">
        {/* Text content section with improved responsive spacing */}
        <div className="order-2 md:order-1 relative">
          {/* Enhanced decorative line element */}
          <div className="hidden md:block absolute -left-6 top-0 bottom-0 w-0.5">
            <div className="h-full w-full bg-gradient-to-b from-transparent via-gold-400/50 to-transparent animate-pulse-subtle"></div>
          </div>

          {/* Premium highlight tag with animated dot and glow effect */}
          <div 
            className="text-xs sm:text-sm inline-flex items-center mb-4 sm:mb-5 px-3 sm:px-4 py-1.5 bg-navy-800/10 text-navy-700 
                       rounded-full backdrop-blur-sm border border-navy-500/20 transform-gpu animate-fade-in-up shadow-sm"
            style={{ animationDelay: '0.2s' }}
          >
            <span className="relative w-2 h-2 rounded-full bg-gold-500 mr-2 animate-pulse-slow">
              <span className="absolute inset-0 rounded-full bg-gold-500 animate-ping-slow opacity-60"></span>
            </span>
            <TypedText text="Principal & Academic Director" className="tracking-wide" delay={800} />
          </div>
          
          {/* Fixed main headline - removed white shading issue */}
          <h1 
            ref={el => textRefs.current[0] = el}
            className="font-playfair text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold mb-2 sm:mb-3 tracking-tight 
                       text-balance relative transform-gpu animate-reveal-text"
          >
            <span className="relative inline-block">
              <span className="text-navy-900">Dr. Revathi</span>{" "}
              <span className="text-navy-900">Duba</span>
              <div className="absolute -bottom-1 left-0 w-1/3 h-1 bg-gradient-to-r from-gold-400 to-gold-200 rounded-full animate-extend"></div>
            </span>
          </h1>
          
          {/* Subtitle with enhanced animation and color treatment */}
          <h2 
            ref={el => textRefs.current[1] = el}
            className="font-playfair text-lg sm:text-xl lg:text-2xl font-medium mb-4 sm:mb-5 text-navy-700 
                       transform-gpu animate-reveal-text opacity-0"
            style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
          >
            Academic Leader & <span className="relative text-indigo-700">
              AI Specialist
              <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-indigo-400/30"></span>
            </span>
          </h2>
          
          {/* Description paragraph with enhanced reveal animation */}
          <p 
            ref={el => textRefs.current[2] = el}
            className="text-navy-600 text-sm sm:text-base max-w-lg leading-relaxed mb-5 sm:mb-6 transform-gpu animate-reveal-text opacity-0"
            style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
          >
            Principal, Director of Academics, and expert in <span className="text-navy-800 font-medium">Artificial Intelligence</span>, 
            <span className="text-navy-800 font-medium"> Machine Learning</span>, and <span className="text-navy-800 font-medium">Data Science</span> with a passion for innovation and education.
          </p>
          
          {/* Badges section - with improved spacing */}
          <div 
            className="flex flex-wrap gap-2 mb-5 sm:mb-6"
            style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
          >
            {['AI Research', 'Academia', 'Leadership', 'Education', 'Innovation'].map((badge, index) => (
              <span 
                key={index} 
                className="inline-block px-3 py-1 bg-navy-50 text-navy-700 text-xs rounded-full border border-navy-100 animate-fade-in-up"
                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
              >
                {badge}
              </span>
            ))}
          </div>
          
          {/* Enhanced CTA buttons with premium hover effects */}
          <div className="flex flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-8 animate-fade-in" style={{ animationDelay: '0.7s' }}>
            <a 
              href="#about" 
              className="px-5 sm:px-6 py-2 sm:py-2.5 bg-navy-800 text-white rounded-lg group relative overflow-hidden transition-all duration-300 shadow-lg shadow-navy-900/10 hover:shadow-xl hover:shadow-navy-900/15"
            >
              <span className="absolute inset-0 w-0 bg-gradient-to-r from-navy-700 to-indigo-800 transition-all duration-500 ease-out group-hover:w-full"></span>
              <span className="relative flex items-center gap-2">
                Learn More <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-1.5"/>
              </span>
            </a>
            <a 
              href="#contact" 
              className="px-5 sm:px-6 py-2 sm:py-2.5 border border-navy-800 text-navy-800 rounded-lg group relative overflow-hidden hover:text-white transition-all duration-300"
            >
              <span className="absolute inset-0 w-0 bg-navy-800 transition-all duration-500 ease-out group-hover:w-full"></span>
              <span className="relative flex items-center gap-2">
                Get in Touch <Mail size={16} className="transition-transform duration-500 group-hover:translate-x-1"/>
              </span>
            </a>
          </div>

          {/* Enhanced social media section with premium hover effects */}
          <div className="animate-fade-in" style={{ animationDelay: '0.9s' }}>
            <p className="text-xs sm:text-sm text-navy-500 mb-2 font-medium">Connect With Me</p>
            <div className="flex gap-2 sm:gap-3 items-center">
              {[
                { icon: <Linkedin size={18} />, href: "https://linkedin.com", color: "hover:text-blue-700", hoverBg: "hover:bg-blue-50" },
                { icon: <Github size={18} />, href: "https://github.com", color: "hover:text-gray-900", hoverBg: "hover:bg-gray-50" },
                { icon: <X size={18} />, href: "https://x.com", color: "hover:text-black", hoverBg: "hover:bg-gray-50" },
                { icon: <Instagram size={18} />, href: "https://instagram.com", color: "hover:text-pink-600", hoverBg: "hover:bg-pink-50" },
                { icon: <Youtube size={18} />, href: "https://youtube.com", color: "hover:text-red-600", hoverBg: "hover:bg-red-50" }
              ].map((social, index) => (
                <a 
                  key={index}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`text-navy-600 transition-all duration-300 ${social.color} ${social.hoverBg}
                            hover:scale-110 p-2 bg-white/80 hover:bg-white rounded-full shadow-sm hover:shadow
                            border border-transparent hover:border-gray-100`}
                  aria-label={`Visit ${social.href.split('://')[1]}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Experience highlight - More responsive */}
          <div className="hidden sm:flex items-center gap-4 md:gap-6 mt-6 pt-4 border-t border-navy-100/50 animate-fade-in" style={{ animationDelay: '1.1s' }}>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-playfair font-bold text-navy-900">15+</p>
              <p className="text-xs text-navy-600">Years Experience</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-playfair font-bold text-navy-900">20+</p>
              <p className="text-xs text-navy-600">Publications</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-playfair font-bold text-navy-900">3+</p>
              <p className="text-xs text-navy-600">Awards</p>
            </div>
          </div>
        </div>
        
        {/* Improved image presentation with better UI and spacing on mobile */}
        <div className="order-1 md:order-2 flex justify-center md:justify-end mt-16 md:mt-0">
          <div className="relative">
            {/* Image container with improved styling */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-[26rem] lg:w-[28rem] lg:h-[32rem] animate-fade-in">
              {/* Main image container with enhanced styling */}
              <div className="relative h-full transform z-10">
                <img 
                  ref={imageRef}
                  src="https://res.cloudinary.com/duq15xsse/image/upload/v1746123838/jhz18sfcnpfdcovh6vbp.jpg" 
                  alt="Dr. Revathi Duba" 
                  onLoad={() => setIsLoaded(true)}
                  style={getImageTransform()}
                  className="w-full h-full object-cover rounded-lg shadow-md"
                />
              </div>
              
              {/* Improved decorative elements */}
              <div className="absolute -bottom-3 -right-3 w-full h-full border-2 border-gold-500/40 rounded-lg"></div>
              <div className="absolute -bottom-1.5 -right-1.5 w-full h-full border border-navy-600/20 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced scroll indicator */}
      <div className="hidden md:flex absolute bottom-6 left-1/2 transform -translate-x-1/2 flex-col items-center animate-bounce-slow">
        <span className="text-xs text-navy-600 mb-1 tracking-wider font-medium">Scroll to explore</span>
        <div className="relative h-8 w-5 rounded-full border border-navy-400/30 flex justify-center">
          <span className="absolute top-1 w-1 h-1 rounded-full bg-navy-600 animate-scroll-dot"></span>
        </div>
      </div>
      
      {/* CSS for enhanced premium animations */}
      <style>{`
        /* Existing animations */
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-slow-reverse {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(20px); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0) translateX(-50%); }
          50% { transform: translateY(-10px) translateX(-50%); }
        }
        
        @keyframes reveal-text {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        /* New enhanced animations */
        @keyframes pulse-spotlight {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.03); }
        }
        
        @keyframes pulse-subtle {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        
        @keyframes extend {
          from { width: 0; }
          to { width: 33%; }
        }
        
        @keyframes scroll-dot {
          0% { top: 2px; opacity: 0.7; }
          100% { top: 20px; opacity: 0; }
        }
        
        @keyframes gradient-text {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes particles {
          0% { transform: translateY(0); }
          100% { transform: translateY(-500px); }
        }
        
        /* Animation classes */
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        
        .animate-float-slow-reverse {
          animation: float-slow-reverse 7s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        .animate-pulse-subtle {
          animation: pulse-subtle 4s ease-in-out infinite;
        }
        
        .animate-pulse-spotlight {
          animation: pulse-spotlight 8s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        
        .animate-reveal-text {
          animation: reveal-text 0.8s cubic-bezier(0.2, 0.6, 0.3, 1);
        }
        
        .animate-extend {
          animation: extend 1.5s ease-out forwards;
          animation-delay: 0.8s;
        }
        
        .animate-scroll-dot {
          animation: scroll-dot 1.5s ease-out infinite;
        }
        
        .animate-gradient-text {
          background-size: 200% auto;
          animation: gradient-text 4s linear infinite;
        }
        
        /* Special effects */
        .bg-texture {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        
        .particles-container {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 800 800'%3E%3Cg fill='none' stroke='%23CCCCCC' stroke-width='1'%3E%3Ccircle cx='400' cy='400' r='1'/%3E%3Ccircle cx='500' cy='300' r='1'/%3E%3Ccircle cx='300' cy='500' r='0.5'/%3E%3Ccircle cx='200' cy='400' r='0.8'/%3E%3Ccircle cx='600' cy='200' r='0.7'/%3E%3Ccircle cx='100' cy='300' r='0.5'/%3E%3Ccircle cx='700' cy='100' r='1'/%3E%3Ccircle cx='300' cy='100' r='0.6'/%3E%3Ccircle cx='100' cy='700' r='0.7'/%3E%3Ccircle cx='700' cy='600' r='0.8'/%3E%3C/g%3E%3C/svg%3E");
          opacity: 0.03;
        }
        
        .text-balance {
          text-wrap: balance;
        }
      `}</style>
    </section>
  );
};

export default Hero;

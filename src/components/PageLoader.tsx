import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageLoaderProps {
  isLoading: boolean;
  onLoadingComplete?: () => void;
}

const PageLoader: React.FC<PageLoaderProps> = ({ isLoading, onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'initial' | 'loading' | 'complete'>('initial');
  const particlesRef = useRef<HTMLDivElement>(null);
  
  // Generate particles for background effect
  useEffect(() => {
    if (!particlesRef.current) return;
    
    const particles = Array.from({ length: 30 }).map((_, i) => {
      const particle = document.createElement('div');
      
      // Random position, size and animation delay
      const size = Math.random() * 8 + 4;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const delay = Math.random() * 2;
      const duration = (Math.random() * 8) + 10;
      const rotation = Math.random() * 360;
      
      // Apply styles to create premium look
      particle.className = 'absolute rounded-full';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.opacity = (Math.random() * 0.5 + 0.1).toString();
      particle.style.background = `rgba(246, 204, 117, ${Math.random() * 0.3 + 0.1})`; // Gold tint
      particle.style.boxShadow = '0 0 10px rgba(246, 204, 117, 0.3)';
      particle.style.animation = `float-particle ${duration}s ease-in-out infinite`;
      particle.style.animationDelay = `${delay}s`;
      particle.style.transform = `rotate(${rotation}deg)`;
      
      return particle;
    });
    
    // Add particles to container
    particles.forEach(p => particlesRef.current?.appendChild(p));
    
    return () => {
      particles.forEach(p => p.remove());
    };
  }, []);
  
  // Handle loading animation progress
  useEffect(() => {
    // Start animation sequence
    if (isLoading) {
      setPhase('loading');
      
      // Increment progress with acceleration curve
      const interval = setInterval(() => {
        setProgress(prev => {
          // Progress acceleration curve
          if (prev < 30) return prev + 0.7;
          if (prev < 60) return prev + 0.5;
          if (prev < 80) return prev + 0.3;
          if (prev < 95) return prev + 0.1;
          
          // Hold at 95% until content is ready
          return 95;
        });
      }, 30);
      
      return () => clearInterval(interval);
    } else if (phase === 'loading') {
      // Complete loading animation when content is ready
      setProgress(100);
      setTimeout(() => {
        setPhase('complete');
        onLoadingComplete?.();
      }, 600);
    }
  }, [isLoading, phase, onLoadingComplete]);

  // Apply or cleanup styles based on loading state
  useEffect(() => {
    const applyStyles = () => {
      document.body.style.overflow = isLoading ? 'hidden' : '';
    };
    
    applyStyles();
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <AnimatePresence>
      {phase !== 'complete' && (
        <motion.div 
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-navy-900 overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { 
              duration: 0.8, 
              ease: [0.22, 1, 0.36, 1] 
            }
          }}
        >
          {/* Particle effects container */}
          <div ref={particlesRef} className="absolute inset-0 pointer-events-none"></div>
          
          {/* Elegant gradient background */}
          <div className="absolute inset-0 bg-gradient-radial from-navy-800 to-navy-950"></div>
          
          {/* Subtle grain texture */}
          <div className="absolute inset-0 bg-texture opacity-[0.03]"></div>
          
          {/* Main loader container */}
          <div className="relative z-10 flex flex-col items-center justify-center px-4">
            {/* Logo animation */}
            <motion.div
              className="relative mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  duration: 0.8, 
                  ease: [0.22, 1, 0.36, 1] 
                }
              }}
            >
              {/* Animated image replacing "DR" initials */}
              <div className="relative text-5xl font-playfair font-bold text-white">
                <span className="inline-block relative">
                  <img 
                    src="https://res.cloudinary.com/duq15xsse/image/upload/v1746123838/jhz18sfcnpfdcovh6vbp.jpg"
                    alt="Dr. Revathi Duba"
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-3 border-gold-400/50"
                    style={{ boxShadow: "0 0 20px rgba(246, 204, 117, 0.6)" }}
                  />
                  
                  {/* Animated circular path around logo - adjusted for larger image */}
                  <div className="absolute -inset-8 sm:-inset-10">
                    <svg className="w-full h-full" viewBox="0 0 120 120">
                      <circle 
                        cx="60" 
                        cy="60" 
                        r="54" 
                        stroke="url(#gold-gradient)" 
                        strokeWidth="1.5"
                        fill="none"
                        strokeDasharray="339.29"
                        strokeDashoffset={(339.29 * (100 - progress)) / 100}
                        className="transition-all duration-200 ease-out"
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#f6e05e" />
                          <stop offset="100%" stopColor="#d69e2e" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </span>
              </div>
            </motion.div>
            
            {/* Name and tagline with staggered reveal */}
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  duration: 0.8, 
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.2
                }
              }}
            >
              <h1 className="text-3xl font-playfair font-medium text-white mb-2">Dr. Revathi Duba</h1>
              <p className="text-gold-300/90 text-sm">Principal & Academic Director</p>
            </motion.div>
            
            {/* Premium loading bar */}
            <motion.div
              className="w-full max-w-xs mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  duration: 0.8, 
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.4
                }
              }}
            >
              <div className="h-0.5 w-full bg-navy-700 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-gold-400 to-gold-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-navy-400">
                <span>Loading experience</span>
                <span>{Math.round(progress)}%</span>
              </div>
            </motion.div>
          </div>
          
          {/* Floating elements to enhance premium feel */}
          <div className="absolute w-40 h-40 rounded-full 
                         bg-gradient-to-br from-gold-300/5 to-gold-500/5
                         top-1/4 right-1/4 blur-2xl animate-float-reverse"></div>
          
          <div className="absolute w-64 h-64 rounded-full 
                         bg-gradient-to-br from-indigo-300/5 to-indigo-500/5
                         bottom-1/4 left-1/4 blur-2xl animate-float"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;

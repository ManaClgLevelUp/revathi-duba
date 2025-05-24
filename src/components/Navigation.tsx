import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUp, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeItem, setActiveItem] = useState('home');
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  // Add location hook to detect the current route
  const location = useLocation();
  
  // Check if on gallery page
  const isGalleryPage = location.pathname === '/gallery';

  const navigationItems = [
    { name: 'Home', href: '#home', icon: '🏠' },
    { name: 'About', href: '#about', icon: '👤' },
    { name: 'Education', href: '#education', icon: '🎓' },
    { name: 'Research', href: '#research', icon: '🔬' },
    { name: 'Skills', href: '#skills', icon: '⚡' },
    { name: 'Leadership', href: '#leadership', icon: '👑' },
    { name: 'Gallery', href: '/gallery', icon: '📸', isExternal: true },
    { name: 'Contact', href: '#contact', icon: '✉️' },
  ];

  // Update dimensions on resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle scroll effects - modify to consider gallery page
  useEffect(() => {
    const handleScroll = () => {
      // Update navbar background on scroll
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Show/hide back to top button
      if (window.scrollY > 500) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
      
      // Only update active section on non-gallery pages
      if (!isGalleryPage) {
        // Update active section based on scroll position
        const sections = navigationItems
          .filter(item => !item.isExternal)
          .map(item => item.href.substring(1));
        
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            // If the section is in view (with some buffer for better UX)
            if (rect.top <= 150 && rect.bottom >= 150) {
              setActiveItem(section);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navigationItems, isGalleryPage]);

  // Prevent scrolling when menu is open with improved approach
  useEffect(() => {
    if (isOpen) {
      // Store the current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    }
    
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Enable haptic feedback on mobile devices
  const triggerHapticFeedback = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(5); // subtle vibration (5ms)
    }
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    // Handle external links differently
    if (href.startsWith('/') && href !== window.location.pathname) {
      window.location.href = href;
      return;
    }
    
    // If on gallery page and clicking a non-gallery link, redirect to home with hash
    if (isGalleryPage && href.startsWith('#')) {
      window.location.href = `/${href}`;
      return;
    }
    
    const element = document.querySelector(href);
    if (element) {
      // Provide haptic feedback
      triggerHapticFeedback();
      
      // Close menu and scroll to section
      setIsOpen(false);
      
      // Add slight delay for better UX with animations
      setTimeout(() => {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 300);
      
      // Update active item
      setActiveItem(href.substring(1));
    }
  };

  const scrollToTop = () => {
    triggerHapticFeedback();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      x: '-100%',
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0, 0, 0.2, 1],
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.15
      }
    }
  };

  const itemVariants = {
    closed: { 
      opacity: 0, 
      y: 20, 
      transition: { 
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1]
      } 
    },
    open: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.3,
        ease: [0, 0, 0.2, 1]
      } 
    }
  };

  const backdropVariants = {
    closed: { 
      opacity: 0,
      transition: { 
        duration: 0.3,
        ease: "easeInOut"
      } 
    },
    open: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 w-full z-50 transition-all duration-500',
          isScrolled 
            ? 'py-3 bg-background/95 backdrop-blur-lg shadow-lg shadow-black/5' 
            : isGalleryPage
              ? 'py-5 gallery-nav-bg' // Special gallery nav background 
              : 'py-5 bg-transparent'
        )}
      >
        <div className="luxury-container flex justify-between items-center">
          <motion.a 
            href={isGalleryPage ? '/' : '#home'}
            className={cn(
              "font-playfair text-lg md:text-xl font-medium tracking-tight transition-colors relative",
              isGalleryPage && !isScrolled 
                ? "text-white hover:text-gold-300" 
                : "hover:text-gold-600"
            )}
            onClick={(e) => {
              if (isGalleryPage) {
                // Don't prevent default to allow normal navigation
              } else {
                scrollToSection(e, '#home');
              }
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Dr. Revathi Duba
            <motion.div 
              className={cn(
                "absolute -bottom-1 left-0 h-0.5", 
                isGalleryPage && !isScrolled
                  ? "bg-gradient-to-r from-gold-400 to-transparent" 
                  : "bg-gradient-to-r from-gold-600 to-transparent"
              )}
              initial={{ width: 0 }}
              animate={activeItem === 'home' ? { width: '100%' } : { width: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>

          <motion.button
            className={cn(
              "md:hidden flex items-center justify-center w-11 h-11 rounded-full shadow-sm border",
              isGalleryPage && !isScrolled 
                ? "text-white bg-white/10 backdrop-blur-sm border-white/20" 
                : "text-navy-900 bg-white/80 backdrop-blur-sm border-gray-100"
            )}
            onClick={() => {
              triggerHapticFeedback();
              setIsOpen(true);
            }}
            aria-label="Open menu"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
          >
            <Menu size={20} />
          </motion.button>

          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navigationItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={cn(
                  "text-sm font-inter relative px-1 py-2",
                  isGalleryPage && !isScrolled 
                    ? "text-white hover:text-white" 
                    : "text-navy-800 hover:text-navy-600"
                )}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className={cn(
                  "relative z-10",
                  isGalleryPage && !isScrolled && "text-shadow-sm"
                )}>
                  {item.name}
                </span>
                <motion.div 
                  className={cn(
                    "absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r rounded-full",
                    isGalleryPage && !isScrolled
                      ? "from-gold-300 to-gold-100" 
                      : "from-gold-500 to-gold-300"
                  )}
                  initial={{ width: 0, left: '50%' }}
                  animate={(activeItem === item.href.substring(1) && !item.isExternal) || 
                          (item.href === '/gallery' && isGalleryPage)
                    ? { width: '100%', left: 0 } 
                    : { width: 0, left: '50%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </nav>
        </div>

        {/* Mobile navigation overlay */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop with blur effect */}
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={backdropVariants}
                className="fixed inset-0 z-40 bg-navy-900/80 backdrop-blur-md"
                onClick={() => setIsOpen(false)}
              />
              
              {/* Menu content - Fixed full height for gallery page */}
              <motion.div
                ref={menuRef}
                initial="closed"
                animate="open"
                exit="closed"
                variants={menuVariants}
                className={cn(
                  "fixed inset-y-0 left-0 w-[85%] max-w-xs z-50 bg-white shadow-2xl shadow-navy-900/20 flex flex-col",
                  isGalleryPage && "h-full top-0 bottom-0"  // Ensure full height on gallery page
                )}
                style={{
                  height: isGalleryPage ? '100vh' : undefined,
                  position: 'fixed'
                }}
              >
                {/* Header area */}
                <div className="relative h-24 bg-gradient-to-r from-navy-900 to-navy-800 px-6 flex items-center">
                  <motion.button
                    onClick={() => {
                      triggerHapticFeedback();
                      setIsOpen(false);
                    }}
                    className="absolute right-4 top-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white"
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <X size={18} />
                  </motion.button>
                  
                  <div>
                    <motion.p 
                      className="text-white/70 text-xs"
                      variants={itemVariants}
                    >
                      Welcome to
                    </motion.p>
                    <motion.h2 
                      className="text-white text-xl font-playfair"
                      variants={itemVariants}
                    >
                      Dr. Revathi Duba
                    </motion.h2>
                  </div>
                </div>
                
                {/* Menu items */}
                <div className="flex-1 overflow-y-auto py-6 px-6">
                  <nav className="space-y-1">
                    {navigationItems.map((item, index) => (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        onClick={(e) => scrollToSection(e, item.href)}
                        className={cn(
                          "flex items-center justify-between py-3.5 px-4 rounded-lg text-base transition-all duration-200",
                          activeItem === item.href.substring(1)
                            ? "bg-navy-900 text-white font-medium shadow-lg shadow-navy-900/20"
                            : "text-navy-800 hover:bg-navy-50"
                        )}
                        variants={itemVariants}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="flex items-center">
                          <span className="mr-3 opacity-70">{item.icon}</span>
                          {item.name}
                        </span>
                        <ChevronRight size={16} className={cn(
                          "transition-transform duration-300",
                          activeItem === item.href.substring(1) ? "text-white rotate-90" : "text-navy-400 group-hover:translate-x-1"
                        )} />
                      </motion.a>
                    ))}
                  </nav>
                </div>
                
                {/* Footer area */}
                <div className="p-6 border-t border-navy-100">
                  <motion.div
                    variants={itemVariants}
                    className="flex items-center text-navy-600 text-sm"
                  >
                    <span className="mr-auto">Academic Director & AI Specialist</span>
                  </motion.div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-32 right-0 w-24 h-24 bg-navy-400/5 rounded-full blur-xl pointer-events-none"></div>
                <div className="absolute bottom-20 left-0 w-32 h-32 bg-gold-400/5 rounded-full blur-xl pointer-events-none"></div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* Add enhanced backdrop to improve visibility on gallery page - REDUCED HEIGHT */}
      {isGalleryPage && !isScrolled && (
        <div className="fixed top-0 left-0 right-0 z-40 h-16 pointer-events-none">
          <div className="h-full w-full bg-gradient-to-b from-black/80 via-black/40 to-transparent"></div>
        </div>
      )}

      {/* Enhanced back to top button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 right-8 z-40 p-3 rounded-full bg-navy-800 text-white shadow-lg shadow-navy-900/20 transition-all hover:bg-navy-700"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Back to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Loading indicator for page transitions */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-0.5">
        <motion.div 
          className="h-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500"
          initial={{ width: "0%", opacity: 0 }}
          animate={isOpen ? { width: "30%" } : { width: "0%" }}
          exit={{ width: "100%", opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Optional: Gradient cursor follower effect */}
      <div id="cursor-follower" className="hidden md:block fixed w-8 h-8 pointer-events-none z-50 rounded-full opacity-30 bg-gradient-to-r from-gold-400 to-amber-300 mix-blend-screen blur-md" />

      {/* Custom cursor script */}
      <style>{`
        /* Removed cursor: none to restore default cursor visibility */
      `}</style>

      {/* Script for custom cursor */}
      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('DOMContentLoaded', () => {
            const cursor = document.getElementById('cursor-follower');
            if (!cursor || window.innerWidth < 768) return;
            
            document.addEventListener('mousemove', (e) => {
              cursor.style.opacity = '0.6';
              cursor.style.transform = 'translate3d(' + (e.clientX - 16) + 'px, ' + (e.clientY - 16) + 'px, 0)';
            });
            
            document.addEventListener('mouseout', () => {
              cursor.style.opacity = '0';
            });
            
            const links = document.querySelectorAll('a, button');
            links.forEach(link => {
              link.addEventListener('mouseenter', (e) => {
                cursor.style.transform = 'translate3d(' + (e.clientX - 16) + 'px, ' + (e.clientY - 16) + 'px, 0) scale(1.5)';
                cursor.style.opacity = '0.8';
              });
              
              link.addEventListener('mouseleave', (e) => {
                cursor.style.transform = 'translate3d(' + (e.clientX - 16) + 'px, ' + (e.clientY - 16) + 'px, 0) scale(1)';
                cursor.style.opacity = '0.6';
              });
            });
          });
        `
      }} />

      {/* Custom styles for the gallery navigation */}
      <style>{`
        /* Fix for mobile menu opening issues */
        body.menu-open {
          position: fixed;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        
        .gallery-nav-bg {
          background: linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0) 100%);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }
        
        .text-shadow-sm {
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }
        
        /* Remove horizontal line above images in desktop */
        @media (min-width: 768px) {
          .gallery-container::before {
            display: none !important;
          }
          
          .gallery-container > div {
            border-top: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navigation;

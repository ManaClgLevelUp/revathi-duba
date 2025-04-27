import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const navigationItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Research', href: '#research' },
    { name: 'Skills', href: '#skills' },
    { name: 'Leadership', href: '#leadership' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (window.scrollY > 500) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 w-full z-50 transition-all duration-300 py-4',
          isScrolled ? 'bg-background/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
        )}
      >
        <div className="luxury-container flex justify-between items-center">
          <a 
            href="#home" 
            className="font-playfair text-lg md:text-xl font-medium tracking-tight hover:text-gold-600 transition-colors"
            onClick={(e) => scrollToSection(e, '#home')}
          >
            Dr. Revathi Duba
          </a>

          <button
            className="md:hidden flex items-center text-navy-900"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="text-sm font-inter text-navy-800 hover-underline transition-colors hover:text-navy-600"
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>

        {isOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-background pt-20 px-4">
            <nav className="flex flex-col space-y-6 items-center">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className="text-lg font-inter text-navy-800 py-2"
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      <button
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-8 right-8 z-40 p-3 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-700 transition-all duration-300 hover:bg-gold-500/20",
          showBackToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        )}
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </button>
    </>
  );
};

export default Navigation;

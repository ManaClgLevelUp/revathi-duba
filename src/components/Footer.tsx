import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Instagram, Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  
  // Animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          footerRef.current?.classList.add('footer-visible');
        }
      }, 
      { threshold: 0.1 }
    );
    
    if (footerRef.current) {
      observer.observe(footerRef.current);
    }
    
    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);
  
  return (
    <footer ref={footerRef} className="bg-slate-900 text-white relative footer-animate">
      {/* Visual separator from content above */}
      <div className="absolute top-0 left-0 right-0 h-20 overflow-hidden -mt-20 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 w-full h-20 text-slate-900">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,59.93,143.53,52.43,221.18,56.44Z" fill="currentColor"></path>
        </svg>
      </div>

      {/* Premium inner shadow for depth */}
      <div className="absolute inset-0 shadow-[inset_0_15px_10px_-10px_rgba(0,0,0,0.3)]"></div>
      
      {/* Content container */}
      <div className="container mx-auto px-4 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Column 1: Brand info and social links */}
          <div className="footer-column">
            <h3 className="text-xl font-semibold mb-4 text-gold-300">Dr. Revathi Duba</h3>
            <p className="text-gray-100 mb-6">
              Principal & Academic Director with expertise in AI, Machine Learning, and Data Science.
            </p>
            
            {/* Social Media Links with premium hover effects */}
            <div className="flex flex-wrap gap-3 mt-6">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Twitter Profile"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Instagram Profile"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Facebook Profile"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label="YouTube Channel"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div className="footer-column">
            <h3 className="text-xl font-semibold mb-4 text-gold-300">Quick Links</h3>
            <ul className="space-y-2 footer-links-grid">
              {['Home', 'About', 'Research', 'Publications', 'Contact'].map((item) => (
                <li key={item} className="footer-link-item">
                  <Link 
                    to={`/${item.toLowerCase()}`}
                    className="text-gray-100 hover:text-gold-300 transition-colors flex items-center group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gold-300 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 3: Contact Info and Map */}
          <div className="footer-column">
            <h3 className="text-xl font-semibold mb-4 text-gold-300">Contact</h3>
            <address className="not-italic text-gray-100 space-y-3">
              <div className="flex items-start">
                <Mail size={18} className="mr-3 mt-1 text-gold-300/80" />
                <p>revathidubaindia@gmail.com</p>
              </div>
              <div className="flex items-start">
                <Phone size={18} className="mr-3 mt-1 text-gold-300/80" />
                <p>+91 8099794356</p>
              </div>
              <div className="flex items-start">
                <MapPin size={18} className="mr-3 mt-1 text-gold-300/80" />
                <p>KIET GROUP OF INSTITUTIONS, R67Q+HW9, KIET College Road, Korangi, Andhra Pradesh 533461</p>
              </div>
            </address>
            
            {/* Enhanced Map with premium styling */}
            <div className="map-container">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2973.843583397702!2d82.23729937387456!3d16.81391288397872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3820f59a6bcb03%3A0xf4037dcbe9869dd2!2sKIET%20GROUP%20OF%20INSTITUTIONS!5e1!3m2!1sen!2sin!4v1748022779581!5m2!1sen!2sin"
                className="w-full h-full absolute inset-0 transition-all duration-500"
                style={{ filter: 'contrast(1.05)' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="KIET Group of Institutions Location"
                aria-label="Google Maps showing KIET Group of Institutions location"
              ></iframe>
            </div>
          </div>
        </div>
        
        {/* Enhanced copyright section */}
        <div className="border-t border-slate-700/70 mt-10 pt-6 text-center text-gray-200 relative">
          <div className="absolute left-1/2 -top-3 transform -translate-x-1/2 bg-slate-900 px-4">
            <div className="w-8 h-1 bg-gradient-to-r from-transparent via-gold-300 to-transparent"></div>
          </div>
          <p>&copy; {currentYear} Dr. Revathi Duba. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Designed & Developed By{" "}
            <span className="sm:inline hidden">
              <a 
                href="https://thedreamteamservices.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gold-300 hover:text-gold-200 transition-colors font-medium"
              >
                {<span className="text-gold-300">DREAM TEAM SERVICES</span>}
              </a>
            </span>
            {/* Mobile attribution with reduced spacing */}
            <span className="sm:hidden inline">
              <span className="inline-block mt-0.5"> {/* Smaller gap instead of <br /> */}
                <a 
                  href="https://thedreamteamservices.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gold-300 hover:text-gold-200 transition-colors font-medium"
                >
                  {<span className="text-gold-300">DREAM TEAM SERVICES</span>}
                </a>
              </span>
            </span>
          </p>
        </div>
      </div>

      {/* Premium CSS styling */}
      <style>{`
        /* Footer animation and style classes */
        .footer-animate {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .footer-visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .footer-column {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeUp 0.6s forwards;
        }
        
        .footer-column:nth-child(1) { animation-delay: 0.2s; }
        .footer-column:nth-child(2) { animation-delay: 0.4s; }
        .footer-column:nth-child(3) { animation-delay: 0.6s; }
        
        /* Social media links styling */
        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background-color: rgba(255,255,255,0.15);
          color: #fff;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .social-link:hover {
          transform: translateY(-3px);
          background-color: var(--color-gold-300);
          color: var(--color-navy-950);
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }
        
        .social-link:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .social-link:hover:before {
          opacity: 1;
        }
        
        /* Map container styling */
        .map-container {
          position: relative;
          width: 100%;
          height: 0;
          padding-bottom: 56.25%;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
          border: 1px solid rgba(255,255,255,0.1);
          margin-top: 1rem;
          transform: perspective(1000px) rotateX(2deg);
          transition: transform 0.5s ease, box-shadow 0.5s ease;
        }
        
        .map-container:hover {
          transform: perspective(1000px) rotateX(0);
          box-shadow: 0 8px 30px rgba(0,0,0,0.4);
        }
        
        @keyframes fadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Responsive grid for footer links */
        .footer-links-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 0.5rem 1rem;
        }
        
        .footer-link-item {
          transform: translateX(-5px);
          transition: transform 0.3s ease;
        }
        
        .footer-link-item:hover {
          transform: translateX(0);
        }
      `}</style>
    </footer>
  );
};

export default Footer;

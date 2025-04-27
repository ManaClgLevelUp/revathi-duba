
import React from 'react';

const Footer = () => {
  return (
    <footer className="py-8 bg-navy-900 text-white border-t border-navy-800">
      <div className="luxury-container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-navy-300 text-sm mb-4 md:mb-0">
            © 2025 Dr. Revathi Duba | All rights reserved.
          </p>
          
          <div className="flex space-x-8">
            <a 
              href="#home" 
              className="text-navy-300 hover:text-gold-400 transition-colors text-sm"
            >
              Back to Top
            </a>
            <a 
              href="#" 
              className="text-navy-300 hover:text-gold-400 transition-colors text-sm"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

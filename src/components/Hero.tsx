
import React from 'react';
import { Linkedin, Facebook, Instagram, Youtube, X } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center grain-texture pb-16 pt-24">
      <div className="absolute inset-0 bg-gradient-to-br from-luxury-50 to-secondary opacity-50"></div>
      
      <div className="luxury-container relative z-10 grid md:grid-cols-2 gap-12 md:gap-8 items-center">
        <div className="order-2 md:order-1 animate-fade-in-up">
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 tracking-tight text-navy-900">
            Dr. Revathi Duba
          </h1>
          <h2 className="font-playfair text-xl md:text-2xl font-medium mb-6 text-navy-700">
            Academic Leader & AI Specialist
          </h2>
          <p className="text-navy-600 max-w-lg leading-relaxed mb-8">
            Principal, Director of Academics, and expert in Artificial Intelligence, 
            Machine Learning, and Data Science with a passion for innovation and education.
          </p>
          <div className="flex gap-4 mb-8">
            <a 
              href="#about" 
              className="px-8 py-3 bg-navy-800 text-white rounded hover:bg-navy-700 transition-all"
            >
              Learn More
            </a>
            <a 
              href="#contact" 
              className="px-8 py-3 border border-navy-800 text-navy-800 rounded hover:bg-navy-50 transition-all"
            >
              Get in Touch
            </a>
          </div>

          {/* Social Media Icons */}
          <div className="flex gap-6 items-center">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-navy-600 hover:text-navy-800 transition-colors">
              <Linkedin size={24} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-navy-600 hover:text-navy-800 transition-colors">
              <Facebook size={24} />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-navy-600 hover:text-navy-800 transition-colors">
              <X size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-navy-600 hover:text-navy-800 transition-colors">
              <Instagram size={24} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-navy-600 hover:text-navy-800 transition-colors">
              <Youtube size={24} />
            </a>
          </div>
        </div>
        
        <div className="order-1 md:order-2 flex justify-center md:justify-end">
          <div className="relative w-64 h-64 md:w-80 md:h-96 lg:w-96 lg:h-[30rem] animate-fade-in">
            <div className="absolute inset-0 rounded-md bg-gradient-to-br from-gold-200/30 to-gold-500/20"></div>
            <img 
              src="https://media.licdn.com/dms/image/v2/D4E03AQGqR6Yq62JZGA/profile-displayphoto-shrink_400_400/B4EZZr_Ou1HEAo-/0/1745568463589?e=1751500800&v=beta&t=a1B9HNXMKjkoJnxaYXXzVQcJaS6Ur0JJj8W5BQjP-II" 
              alt="Dr. Revathi Duba" 
              className="w-full h-full object-cover rounded-md shadow-lg relative z-10"
            />
            <div className="absolute -bottom-3 -right-3 w-full h-full border-2 border-gold-500/30 rounded-md"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;


import React, { useEffect, useState } from 'react';
import { FileText } from 'lucide-react';

const About = () => {
  const quotes = [
    "Education is the most powerful weapon which you can use to change the world.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "The goal of education is the advancement of knowledge and the dissemination of truth.",
    "AI is not about replacing humans, but extending human capabilities."
  ];
  
  const [currentQuote, setCurrentQuote] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote(prev => (prev + 1) % quotes.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [quotes.length]);

  const stats = [
    { label: 'Years Experience', value: '10+' },
    { label: 'Publications', value: '20+' },
    { label: 'Awards', value: '8+' },
    { label: 'Students Mentored', value: '50+' }
  ];

  return (
    <section id="about" className="section-padding bg-white">
      <div className="luxury-container">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-medium mb-4">About</h2>
          <div className="w-20 h-1 bg-gold-500 mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-start mb-6">
              <div className="mr-4 mt-1">
                <FileText size={24} className="text-gold-500" />
              </div>
              <div>
                <h3 className="text-2xl font-playfair mb-4">Biography</h3>
                <p className="text-navy-600 mb-4 leading-relaxed">
                  Dr. Revathi Duba is an accomplished academic leader and AI/ML expert with a distinguished career spanning over a decade in higher education and research. As a Principal and Director of Academics, she has spearheaded innovative curriculum development and institutional excellence.
                </p>
                <p className="text-navy-600 leading-relaxed">
                  With extensive expertise in Artificial Intelligence, Machine Learning, and Data Science, Dr. Duba bridges theoretical concepts with practical applications, contributing significantly to the field through research, publications, and mentoring the next generation of data scientists.
                </p>
              </div>
            </div>
            
            <div className="mt-10">
              <div className="relative h-16 overflow-hidden">
                {quotes.map((quote, index) => (
                  <p 
                    key={index} 
                    className={`absolute w-full text-lg italic font-playfair text-navy-700 transition-all duration-500 ${
                      index === currentQuote 
                        ? "opacity-100 transform translate-y-0" 
                        : "opacity-0 transform translate-y-8"
                    }`}
                  >
                    "{quote}"
                  </p>
                ))}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="luxury-card flex flex-col items-center justify-center py-8"
              >
                <span className="text-4xl font-playfair text-gold-600 mb-2">{stat.value}</span>
                <span className="text-sm text-navy-600 uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;


import React from 'react';

const Education = () => {
  const educationHistory = [
    {
      degree: "Ph.D in Computer Science",
      institution: "Indian Institute of Technology",
      years: "2012 - 2016",
      description: "Specialized in Artificial Intelligence and Machine Learning algorithms",
      logo: "https://upload.wikimedia.org/wikipedia/en/1/1c/IIT_Kanpur_Logo.svg"
    },
    {
      degree: "M.Tech in Data Science",
      institution: "University of Delhi",
      years: "2010 - 2012",
      description: "Focused on statistical methods and big data analytics",
      logo: "https://upload.wikimedia.org/wikipedia/en/4/4c/University_of_Delhi.svg"
    },
    {
      degree: "B.Tech in Computer Engineering",
      institution: "Anna University",
      years: "2006 - 2010",
      description: "Foundation in computer systems and programming",
      logo: "https://upload.wikimedia.org/wikipedia/en/a/a2/Anna_University_Logo.svg"
    }
  ];

  return (
    <section id="education" className="section-padding bg-secondary">
      <div className="luxury-container">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-medium mb-4">Education</h2>
          <div className="w-20 h-1 bg-gold-500 mx-auto"></div>
        </div>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="timeline-line"></div>
          
          <div className="space-y-16">
            {educationHistory.map((item, index) => (
              <div key={index} className="relative">
                {/* Timeline dot */}
                <div className="timeline-dot"></div>
                
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:ml-auto pl-8 md:pl-12' : 'md:mr-auto pl-8 md:pl-0 md:pr-12'}`}>
                  <div className="luxury-card overflow-hidden hover:transform hover:scale-[1.02] transition-transform duration-300">
                    <div className="flex items-center mb-4">
                      {item.logo && (
                        <img 
                          src={item.logo} 
                          alt={`${item.institution} logo`} 
                          className="h-12 w-12 mr-4 object-contain"
                        />
                      )}
                      <div>
                        <h3 className="text-xl font-playfair mb-1">{item.degree}</h3>
                        <p className="text-navy-600">{item.institution}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-gold-700 font-medium">{item.years}</span>
                    </div>
                    <p className="text-navy-600 text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;

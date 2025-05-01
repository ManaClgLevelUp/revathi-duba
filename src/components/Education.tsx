import React from 'react';

const Education = () => {
  const educationHistory = [
    {
      degree: 'Ph.D.: Electrical Engineering',
      institution: 'Lincoln University College',
      location: 'Malaysia',
      years: '2025',
      description: '',
      logo: '/src/images/lincoln-logo.png'
    },
    {
      degree: 'Master of Technology: Artificial Intelligence and Data Science',
      institution: 'Jawaharlal Nehru Technological University',
      location: 'Kakinada, India',
      years: '2024',
      description: 'First class with Distinction. Final Grade: 83%',
      logo: '/src/images/jntu-logo.png'
    },
    {
      degree: 'One Year Certification Courses: Artificial Intelligence and Machine Learning',
      institution: 'Indian Institute of Technology',
      location: 'Kanpur, India',
      years: '2023',
      description: '',
      logo: '/src/images/iit-logo.png'
    },
    {
      degree: 'MBA: Marketing Management and Human Resource Management',
      institution: 'Adikavi Nannayya University',
      location: 'Rajahmundry, India',
      years: '2019',
      description: 'First Class with Distinction. Final Grade: CGPA 7.93',
      logo: '/src/images/anu-logo.png'
    },
    {
      degree: 'Post-Graduation Diploma in Energy Management',
      institution: 'MIT',
      location: 'Pune, India',
      years: '2019',
      description: 'Final Grade: A',
      logo: '/src/images/mit-logo.png'
    },
    {
      degree: 'Master of Technology: Power Systems and High Voltage Engineering',
      institution: 'Jawaharlal Technological University Kakinada',
      location: 'Kakinada, India',
      years: '2011',
      description: 'First class with Distinction. Final Grade: 83%. Recipient of University Topper',
      logo: '/src/images/jntu-logo.png'
    },
    {
      degree: 'Bachelor of Technology: Electrical and Electronics Engineering',
      institution: 'Jawaharlal Technological University Hyderabad',
      location: 'Hyderabad, India',
      years: '2007',
      description: 'First Class with Distinction. Final Grade: 76%',
      logo: '/src/images/jntuh-logo.png'
    },
    {
      degree: 'Board of Intermediate Studies: MPC',
      institution: 'Pragati Junior College',
      location: 'Kakinada, India',
      years: '2003',
      description: 'Final Grade: 80.1%',
      logo: '/src/images/pragati-logo.png'
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

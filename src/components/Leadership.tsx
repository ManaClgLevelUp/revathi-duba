import React from 'react';
import { Award } from 'lucide-react';

const Leadership = () => {
  const achievements = [
    {
      title: "Most Inspiring Teacher",
      organization: "KIET, Kakinada",
      year: "2023",
      description: "Recognized for exceptional teaching methods and student inspiration."
    },
    {
      title: "Honorary Doctorate Award",
      organization: "Washington University, American Council of Training and Development",
      year: "June 15, 2024",
      description: "Awarded for contributions to AI education and research."
    },
    {
      title: "GATE - 1050 AIR",
      organization: "Graduate Aptitude Test in Engineering",
      year: "2008",
      description: "Secured All India Rank of 1050 in the prestigious GATE examination."
    },
    {
      title: "University Topper",
      organization: "Jawaharlal Technological University Kakinada",
      year: "2011",
      description: "Achieved top rank with 83% in academics for MTech in Power Systems and High Voltage Engineering."
    }
  ];

  return (
    <section id="leadership" className="section-padding bg-white">
      <div className="luxury-container">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-medium mb-4">Leadership & Achievements</h2>
          <div className="w-20 h-1 bg-gold-500 mx-auto"></div>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <div 
              key={index} 
              className="luxury-card group hover:border-gold-500/30 hover:transform hover:scale-[1.02] transition-all"
            >
              <Award className="text-gold-500 mb-4 h-10 w-10" />
              <h3 className="text-xl font-playfair mb-2 group-hover:text-gold-700 transition-colors">{achievement.title}</h3>
              <p className="text-navy-600 text-sm mb-2">{achievement.organization}</p>
              <p className="text-navy-500 text-xs mb-4">{achievement.year}</p>
              <p className="text-navy-600 text-sm">{achievement.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16">
          <div className="luxury-card p-8">
            <h3 className="text-2xl font-playfair mb-6 text-center">Leadership Positions</h3>
            
            <div className="space-y-8">
              <div className="p-6 bg-luxury-50 rounded-md">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-xl font-playfair text-navy-800">Principal & Director of Academics</h4>
                  <span className="text-sm text-gold-700">2020 - Present</span>
                </div>
                <p className="text-navy-600 text-sm mb-4">KIET Group of Institutions, Kakinada, India</p>
                <ul className="list-disc pl-5 text-navy-600 text-sm space-y-2">
                  <li>Kept abreast of advances in pedagogy and work to continuously improve teaching methods and introduce new approaches to instruction.</li>
                  <li>Developed students' critical thinking skills through interactive classroom activities and discussions.</li>
                </ul>
              </div>
              
              <div className="p-6 bg-luxury-50 rounded-md">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-xl font-playfair text-navy-800">Vice Principal</h4>
                  <span className="text-sm text-gold-700">2019 - 2020</span>
                </div>
                <p className="text-navy-600 text-sm mb-4">Kakinada Institute of Engineering and Technology, Kakinada, India</p>
                <p className="text-navy-600 text-sm">Delivered UG and PG courses in Python, DevOps, Cloud Computing and Machine Learning</p>
              </div>
              
              <div className="p-6 bg-luxury-50 rounded-md">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-xl font-playfair text-navy-800">Associate Professor and HOD, Department of EEE</h4>
                  <span className="text-sm text-gold-700">2015 - 2017</span>
                </div>
                <p className="text-navy-600 text-sm mb-4">Kakinada Institute of Engineering & Technology, Kakinada, India</p>
                <ul className="list-disc pl-5 text-navy-600 text-sm space-y-2">
                  <li>Conducted advanced research in renewable energy systems and smart grids.</li>
                  <li>Published 20+ peer-reviewed papers in top journals.</li>
                  <li>Supervised 15+ postgraduate research projects.</li>
                </ul>
              </div>
              
              <div className="p-6 bg-luxury-50 rounded-md">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-xl font-playfair text-navy-800">Assistant Professor</h4>
                  <span className="text-sm text-gold-700">2011 - 2015</span>
                </div>
                <p className="text-navy-600 text-sm mb-4">Kakinada Institute of Engineering & Technology, Kakinada, India</p>
                <ul className="list-disc pl-5 text-navy-600 text-sm space-y-2">
                  <li>Delivered UG and PG courses in power systems, power electronics and High voltage DC.</li>
                  <li>Collaborated on industry-funded research projects.</li>
                </ul>
              </div>
              
              <div className="p-6 bg-luxury-50 rounded-md">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-xl font-playfair text-navy-800">Software Programmer</h4>
                  <span className="text-sm text-gold-700">2007 - 2008</span>
                </div>
                <p className="text-navy-600 text-sm">IBM, Bangalore</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Leadership;

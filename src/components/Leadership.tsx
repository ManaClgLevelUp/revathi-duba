
import React from 'react';
import { Award } from 'lucide-react';

const Leadership = () => {
  const achievements = [
    {
      title: "Most Inspiring Teacher",
      organization: "National Education Society",
      year: "2023",
      description: "Recognized for exceptional teaching methods and student inspiration."
    },
    {
      title: "Honorary Doctorate",
      organization: "University of Technology",
      year: "2022",
      description: "Awarded for contributions to AI education and research."
    },
    {
      title: "Outstanding Leadership in Education",
      organization: "Education Leadership Council",
      year: "2021",
      description: "Honored for academic leadership and institutional development."
    },
    {
      title: "Best Research Paper",
      organization: "International Conference on AI",
      year: "2020",
      description: "Awarded for groundbreaking research in AI applications."
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
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-luxury-50 rounded-md">
                <h4 className="text-xl font-playfair mb-2 text-navy-800">Principal</h4>
                <p className="text-navy-600 text-sm">Institute of Computer Science</p>
                <p className="text-navy-500 text-xs mt-1">2020 - Present</p>
              </div>
              
              <div className="text-center p-6 bg-luxury-50 rounded-md">
                <h4 className="text-xl font-playfair mb-2 text-navy-800">Director of Academics</h4>
                <p className="text-navy-600 text-sm">Academy of Technology</p>
                <p className="text-navy-500 text-xs mt-1">2018 - Present</p>
              </div>
              
              <div className="text-center p-6 bg-luxury-50 rounded-md">
                <h4 className="text-xl font-playfair mb-2 text-navy-800">Research Chair</h4>
                <p className="text-navy-600 text-sm">AI & ML Research Committee</p>
                <p className="text-navy-500 text-xs mt-1">2016 - Present</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Leadership;

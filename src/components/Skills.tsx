
import React from 'react';
import { Star, Badge } from 'lucide-react';

const Skills = () => {
  const technicalSkills = [
    { name: "Artificial Intelligence", level: 95 },
    { name: "Machine Learning", level: 90 },
    { name: "Deep Learning", level: 85 },
    { name: "Natural Language Processing", level: 80 },
    { name: "Data Science", level: 90 },
    { name: "Python", level: 85 },
    { name: "Neural Networks", level: 75 },
  ];
  
  const academicSkills = [
    "Academic Leadership",
    "Curriculum Development",
    "Research Methodology",
    "Educational Technology",
    "Student Mentoring",
    "Academic Writing",
    "Grant Writing",
    "Course Design"
  ];

  return (
    <section id="skills" className="section-padding bg-secondary">
      <div className="luxury-container">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-medium mb-4">Skills & Expertise</h2>
          <div className="w-20 h-1 bg-gold-500 mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <div className="flex items-center mb-8">
              <Star size={24} className="text-gold-500 mr-3" />
              <h3 className="text-2xl font-playfair">Technical Proficiency</h3>
            </div>
            
            <div className="space-y-6">
              {technicalSkills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="text-navy-800 font-medium">{skill.name}</span>
                    <span className="text-gold-700">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-navy-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-gold-400 to-gold-600 rounded-full"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex items-center mb-8">
              <Badge size={24} className="text-gold-500 mr-3" />
              <h3 className="text-2xl font-playfair">Academic Skills</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {academicSkills.map((skill, index) => (
                <div key={index} className="luxury-card p-4 flex items-center justify-center text-center min-h-[100px]">
                  <span className="text-navy-700">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

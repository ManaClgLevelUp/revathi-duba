
import React, { useState } from 'react';
import { Book } from 'lucide-react';

const Research = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = ['all', 'journals', 'conferences', 'books'];
  
  const publications = [
    {
      title: "Advances in Generative AI for Educational Content Creation",
      journal: "Journal of Artificial Intelligence in Education",
      year: 2024,
      impact: 3.8,
      category: "journals",
      link: "#",
      highlighted: true
    },
    {
      title: "Statistical Analysis of Machine Learning Methods in Learning Pattern Recognition",
      journal: "IEEE Transactions on Knowledge and Data Engineering",
      year: 2023,
      impact: 4.2,
      category: "journals",
      link: "#",
      highlighted: true
    },
    {
      title: "Quantum Computing Applications in Data Analysis: A Comparative Study",
      journal: "International Conference on Machine Learning",
      year: 2022,
      category: "conferences",
      link: "#"
    },
    {
      title: "Ethical Considerations in AI Development for Educational Tools",
      journal: "Book Chapter in 'AI Ethics in Education'",
      year: 2022,
      category: "books",
      link: "#"
    },
    {
      title: "Deep Learning Approaches for Natural Language Processing in Academic Content",
      journal: "ACM Transactions on Intelligent Systems and Technology",
      year: 2021,
      impact: 3.5,
      category: "journals",
      link: "#"
    },
    {
      title: "Neural Networks for Student Performance Prediction",
      journal: "Educational Data Mining Conference",
      year: 2021,
      category: "conferences",
      link: "#"
    }
  ];
  
  const filteredPublications = activeCategory === 'all' 
    ? publications 
    : publications.filter(pub => pub.category === activeCategory);

  return (
    <section id="research" className="section-padding bg-white">
      <div className="luxury-container">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-medium mb-4">Research & Publications</h2>
          <div className="w-20 h-1 bg-gold-500 mx-auto mb-8"></div>
          
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button 
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-sm transition-all ${
                  activeCategory === category 
                    ? 'bg-navy-800 text-white' 
                    : 'bg-transparent border border-navy-200 text-navy-700 hover:bg-navy-50'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {filteredPublications.map((pub, index) => (
            <div 
              key={index}
              className={`luxury-card group hover:border-gold-200 transition-all ${
                pub.highlighted ? 'border-l-4 border-l-gold-500' : ''
              }`}
            >
              <div className="flex items-start">
                <Book size={20} className="text-gold-500 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-playfair mb-2 group-hover:text-gold-700 transition-colors">
                    {pub.title}
                  </h3>
                  <p className="text-navy-600 text-sm mb-2">{pub.journal}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-navy-500">{pub.year}</span>
                    {pub.impact && (
                      <span className="text-xs bg-gold-50 text-gold-700 px-2 py-1 rounded-sm">
                        Impact Factor: {pub.impact}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <a 
            href="#" 
            className="inline-flex items-center text-navy-700 hover:text-gold-600 transition-colors"
          >
            <span className="mr-2">View Complete Publication List</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Research;

import React, { useState, useEffect, useRef } from 'react';
import { FileText, Users, Calendar, Book, Filter, X, Search, ChevronDown } from 'lucide-react';

const Research = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [activePublication, setActivePublication] = useState<number | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [publicationsToShow, setPublicationsToShow] = useState(3);
  
  const searchRef = useRef<HTMLInputElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const publications = [
    {
      id: 1,
      title: "Design and Performance Analysis of Brushless Doubly-Fed Machine for Wind Power Generation Using AI",
      authors: "Duba Revathi, Dr. Midhunchakkaravarthy",
      journal: "IJSREM",
      year: 2024,
      doi: "10.55041/IJSREM37644",
      category: "journals",
      link: "#",
      highlighted: true,
      type: "Article",
      specialization: "Computer Engineering"
    },
    {
      id: 2,
      title: "Artificial Intelligence Technique Based Wind Power Generation System in a Micro Grid",
      authors: "Duba Revathi, Dr. Midhunchakkaravarthy",
      journal: "IJSREM",
      year: 2024,
      doi: "10.55041/IJSREM37587",
      category: "journals",
      link: "#",
      type: "Article",
      specialization: "Computer Engineering"
    },
    {
      id: 3,
      title: "Hybrid Renewable Energy Systems for Remote Electrification: Integrating Solar Power into Modern Grids",
      journal: "IEEE Conference",
      year: 2024,
      category: "conferences",
      link: "#",
      type: "Conference",
      specialization: "Computer Engineering"
    },
    {
      id: 4,
      title: "Comprehensive Design Strategies for Off Grid PV Solar Power System",
      journal: "SUSTAINED Conference",
      year: 2024,
      category: "conferences",
      link: "#",
      type: "Conference",
      specialization: "Computer Engineering"
    },
    {
      id: 5,
      title: "A Novel GMPPT Scheme to Extract Maximum Power from a PV Array Under Non-Uniform Irradiance Condition",
      journal: "IEEE Conference",
      year: 2023,
      category: "conferences",
      link: "#",
      type: "Conference",
      specialization: "Computer Engineering"
    },
    {
      id: 6,
      title: "Analysis of LFC in PV‐thermal‐thermal interconnected power system using fuzzy gain scheduling",
      authors: "Revathi, G Mohan Kumar",
      journal: "International Transactions on Electrical Energy Systems",
      volume: "30 (5)",
      pages: "e12336",
      year: 2020,
      category: "journals",
      link: "#",
      type: "Article",
      specialization: "Computer Engineering"
    },
    {
      id: 7,
      title: "Assessment of Load Frequency Control of Three Area Interconnected Power System using Fuzzy Gain Scheduling controller",
      journal: "Journal of Electrical Engineering",
      volume: "19",
      year: 2019,
      category: "journals",
      link: "#",
      type: "Article",
      specialization: "Computer Engineering"
    },
    {
      id: 8,
      title: "Assessment of load frequency control of three area interconnected power system using fuzzy gain scheduling controller",
      journal: "International Journal",
      year: 2019,
      category: "journals",
      link: "#",
      type: "Article",
      specialization: "Computer Engineering"
    },
    {
      id: 9,
      title: "Accomplishment of Quasi Z Source Inverter towards power Maintenance for PV SAL",
      authors: "D. Revathi",
      journal: "International Journal of Science Engineering and Advance Technology",
      year: 2017,
      category: "journals",
      link: "#",
      type: "Article",
      specialization: "Computer Engineering"
    },
    {
      id: 10,
      title: "Mppt based multilevel inverter-controlled grid connected wind power system",
      authors: "P Mounica, D Revathi, MD Atluri",
      journal: "International Conference on Signal Processing, Communication",
      year: 2016,
      category: "conferences",
      link: "#",
      type: "Conference",
      specialization: "Computer Engineering"
    },
    {
      id: 11,
      title: "An Improved Grid Current Compensator for Grid-Connected Distributed Generation under various load conditions",
      journal: "IJSETR",
      year: 2015,
      category: "journals",
      link: "#",
      type: "Article",
      specialization: "Computer Engineering"
    },
    {
      id: 12,
      title: "A Versatile control scheme for the fault current Interruption by using Dynamic Voltage Restorer",
      journal: "IJSETR",
      year: 2015,
      category: "journals",
      link: "#",
      type: "Article",
      specialization: "Computer Engineering"
    },
    {
      id: 13,
      title: "Hybrid Inverter DSTATCOM to compensate reactive power for non-linear loads",
      journal: "IJITR",
      year: 2018,
      category: "journals",
      link: "#",
      type: "Article",
      specialization: "Computer Engineering"
    },
    {
      id: 14,
      title: "Multilevel cascaded inverter topology by neural voltage modulation",
      journal: "IJPRES",
      year: 2016,
      category: "journals",
      link: "#",
      type: "Article",
      specialization: "Computer Engineering"
    },
    {
      id: 15,
      title: "Improvement of power quality using three-phase four switch SAPF fed induction machine drive",
      journal: "IJEET",
      year: 2017,
      category: "journals",
      link: "#",
      type: "Article",
      specialization: "Computer Engineering"
    }
  ];
  
  const categories = ['all', 'journals', 'conferences'];
  
  const years = [...new Set(publications.map(pub => pub.year))].sort((a, b) => b - a);
  
  const filteredPublications = publications
    .filter(pub => {
      // Filter by category
      if (activeCategory !== 'all' && pub.category !== activeCategory) {
        return false;
      }
      
      // Filter by year
      if (selectedYear !== 'all' && pub.year !== parseInt(selectedYear)) {
        return false;
      }
      
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          pub.title.toLowerCase().includes(query) || 
          (pub.authors && pub.authors.toLowerCase().includes(query)) ||
          (pub.journal && pub.journal.toLowerCase().includes(query)) ||
          String(pub.year).includes(query)
        );
      }
      
      return true;
    })
    .sort((a, b) => b.year - a.year); // Sort by year (newest first)
  
  const researchStats = [
    { label: 'Publications', value: publications.length, icon: <FileText size={24} className="text-indigo-500" /> },
    { label: 'Citations', value: '100+', icon: <Users size={24} className="text-emerald-500" /> },
    { label: 'Years of Research', value: '10+', icon: <Calendar size={24} className="text-amber-500" /> },
    { label: 'Research Areas', value: '5+', icon: <Book size={24} className="text-rose-500" /> }
  ];

  const resetFilters = () => {
    setActiveCategory('all');
    setSelectedYear('all');
    setSearchQuery('');
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
  };

  const loadMorePublications = () => {
    setPublicationsToShow(prev => prev + 3);
  };
  
  const showLessPublications = () => {
    setPublicationsToShow(3);
  };
  
  // When filters change, reset the number of shown publications
  useEffect(() => {
    setPublicationsToShow(3);
  }, [activeCategory, selectedYear, searchQuery]);

  useEffect(() => {
    if (isSearchFocused && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isSearchFocused]);

  // Get only the publications we want to display
  const visiblePublications = filteredPublications.slice(0, publicationsToShow);
  const hasMorePublications = filteredPublications.length > publicationsToShow;

  // Animation classes for publications when they appear
  const getAnimationClass = (index: number) => {
    return `animate-fade-in-up animate-delay-${(index % 5) * 100}`;
  };

  return (
    <section id="research" className="section-padding relative bg-gradient-to-b from-white to-secondary/30">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-300/20 rounded-full blur-3xl"></div>
      </div>

      <div className="luxury-container relative z-10">
        <div className="mb-12 text-center">
          <p className="text-sm font-medium text-indigo-600 mb-2 tracking-wider uppercase">Academic Contributions</p>
          <h2 className="text-3xl md:text-4xl font-medium mb-4">Research & Publications</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-indigo-300 mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-navy-600">
            Exploring the frontiers of Artificial Intelligence, Machine Learning, and Power Systems Engineering 
            through innovative research and collaborative publications.
          </p>
        </div>

        {/* Research Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {researchStats.map((stat, index) => (
            <div 
              key={index}
              className="luxury-card bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-200/20 hover:-translate-y-1"
            >
              <div className="mb-3">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-playfair text-navy-900 mb-1">{stat.value}</h3>
              <p className="text-navy-500 text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
        
        {/* Filters Section */}
        <div className="mb-8 bg-white/70 backdrop-blur-sm rounded-lg p-4 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex flex-wrap items-center gap-2">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-1.5 px-3 py-2 bg-navy-800 text-white rounded-md hover:bg-navy-700 transition-all text-sm"
              >
                <Filter size={16} />
                <span>Filters</span>
                <ChevronDown size={14} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`}/>
              </button>
              
              {(activeCategory !== 'all' || selectedYear !== 'all' || searchQuery) && (
                <button 
                  onClick={resetFilters}
                  className="flex items-center gap-1 px-3 py-2 bg-red-50 text-red-700 rounded-md hover:bg-red-100 transition-all text-sm"
                >
                  <X size={14} />
                  <span>Reset</span>
                </button>
              )}
              
              {/* Active filters display */}
              <div className="flex gap-2 flex-wrap">
                {activeCategory !== 'all' && (
                  <div className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded text-xs flex items-center">
                    <span>Category: {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}</span>
                    <button onClick={() => setActiveCategory('all')} className="ml-1 hover:text-indigo-900">
                      <X size={12} />
                    </button>
                  </div>
                )}
                
                {selectedYear !== 'all' && (
                  <div className="px-2 py-1 bg-amber-50 text-amber-700 rounded text-xs flex items-center">
                    <span>Year: {selectedYear}</span>
                    <button onClick={() => setSelectedYear('all')} className="ml-1 hover:text-amber-900">
                      <X size={12} />
                    </button>
                  </div>
                )}
                
                {searchQuery && (
                  <div className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded text-xs flex items-center">
                    <span>Search: "{searchQuery}"</span>
                    <button onClick={() => setSearchQuery('')} className="ml-1 hover:text-emerald-900">
                      <X size={12} />
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className={`relative flex-1 md:max-w-xs transition-all duration-300 ${isSearchFocused ? 'md:max-w-sm' : ''}`}>
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                placeholder="Search publications..."
                className="w-full py-2 pl-9 pr-4 bg-white border border-gray-200 rounded-md text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-navy-400" />
            </div>
          </div>
          
          {/* Expandable filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-navy-600">Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`px-3 py-1.5 rounded-md text-sm transition-all ${
                        activeCategory === category 
                          ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20' 
                          : 'bg-white text-navy-700 border border-gray-200 hover:bg-indigo-50'
                      }`}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium text-navy-600">Publication Year</label>
                <select 
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full md:w-auto px-3 py-2 bg-white border border-gray-200 rounded-md text-navy-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                >
                  <option value="all">All Years</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
        
        {/* Results Counter */}
        <div className="mb-8 flex justify-between items-center">
          <p className="text-navy-600">
            Showing <span className="font-medium text-navy-900">{visiblePublications.length}</span> of <span className="font-medium text-navy-900">{filteredPublications.length}</span> publications
          </p>
          
          <div className="text-navy-500 text-sm">
            {filteredPublications.length > 0 ? (
              <span>Research focus: <span className="text-navy-900 font-medium">Computer Engineering</span></span>
            ) : (
              <span>No publications match your filter criteria</span>
            )}
          </div>
        </div>
        
        {/* Publications Grid */}
        <div className="space-y-6">
          {filteredPublications.length === 0 ? (
            <div className="text-center py-12 bg-white/50 rounded-lg">
              <FileText size={48} className="mx-auto text-navy-300 mb-4" />
              <h3 className="text-lg font-medium text-navy-900 mb-2">No publications found</h3>
              <p className="text-navy-600 mb-4">Try adjusting your search or filter criteria</p>
              <button 
                onClick={resetFilters}
                className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 transition-colors"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            visiblePublications.map((pub, index) => (
              <div 
                key={pub.id}
                className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border-l-4 ${
                  pub.highlighted ? 'border-indigo-500' : 'border-transparent'
                } ${getAnimationClass(index)}`}
                onClick={() => setActivePublication(activePublication === pub.id ? null : pub.id)}
              >
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {pub.category === 'journals' ? 'Journal' : 'Conference'}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      {pub.year}
                    </span>
                    {pub.highlighted && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                        Featured
                      </span>
                    )}
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Computer Engineering
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-medium text-navy-900 mb-3">{pub.title}</h3>
                  
                  {pub.authors && (
                    <p className="text-navy-700 mb-2 text-sm">
                      <span className="font-medium">Authors:</span> {pub.authors}
                    </p>
                  )}
                  
                  <p className="text-navy-600 text-sm mb-2">
                    <span className="font-medium">Published in:</span> {pub.journal}
                    {pub.volume && `, Volume ${pub.volume}`}
                    {pub.pages && `, Pages ${pub.pages}`}
                  </p>
                  
                  {pub.doi && (
                    <p className="text-navy-600 text-sm mb-4">
                      <span className="font-medium">DOI:</span> {pub.doi}
                    </p>
                  )}
                  
                  <div className="flex justify-end">
                    <a 
                      href={pub.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center px-4 py-2 bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Publication
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Load More Button */}
        {hasMorePublications && (
          <div 
            ref={loadMoreRef}
            className="mt-8 text-center"
          >
            <button
              onClick={loadMorePublications}
              className="px-5 py-2.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Load More Publications
            </button>
          </div>
        )}
        
        {/* Show Less Button (when showing more than initial count) */}
        {publicationsToShow > 3 && filteredPublications.length > 3 && (
          <div className="mt-4 text-center">
            <button
              onClick={showLessPublications}
              className="px-5 py-2.5 bg-white border border-gray-200 text-navy-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Show Less
            </button>
          </div>
        )}
        
      </div>
    </section>
  );
};

export default Research;

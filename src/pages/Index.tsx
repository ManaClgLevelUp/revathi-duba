import React from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Education from '@/components/Education';
import Research from '@/components/Research';
import Skills from '@/components/Skills';
import Leadership from '@/components/Leadership';
import Certifications from '@/components/Certifications';
import Contact from '@/components/Contact';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>
        <Hero />
        <About />
        <Education />
        <Research />
        <Skills />
        <Leadership />
        <Certifications />
        <Contact />
      </main>
    </div>
  );
};

export default Index;

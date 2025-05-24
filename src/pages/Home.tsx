import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Education from '../components/Education';
import Skills from '../components/Skills';
import Research from '../components/Research';
import Leadership from '../components/Leadership';
import Contact from '../components/Contact';

const Home: React.FC = () => {
  return (
    <main>
      <Hero />
      <About />
      <Education />
      <Skills />
      <Research />
      <Leadership />
      <Contact />
    </main>
  );
};

export default Home;

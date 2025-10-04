
import React from 'react';

const ScrollDownIcon = () => (
    <svg className="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
);


const Hero: React.FC = () => {
  return (
    <section className="relative h-screen flex items-center justify-center text-center text-white">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://picsum.photos/id/122/1920/1080')" }}></div>
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 p-6 flex flex-col items-center">
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-brand-gold drop-shadow-lg mb-4">
          A Arte do Tempo
        </h1>
        <p className="text-lg md:text-xl max-w-2xl text-brand-light font-light">
          Explorando os limites do design e da engenharia para criar relógios que transcendem o tempo.
        </p>
      </div>
      <div className="absolute bottom-10 animate-bounce">
        <ScrollDownIcon />
      </div>
    </section>
  );
};

export default Hero;

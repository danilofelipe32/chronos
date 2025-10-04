
import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-brand-dark/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-serif font-bold text-brand-gold tracking-wider">
          CHRONOS
        </div>
        <nav className="hidden md:flex space-x-8">
          <a href="#collection" className="text-brand-light hover:text-brand-gold transition-colors duration-300">Coleção</a>
          <a href="#about" className="text-brand-light hover:text-brand-gold transition-colors duration-300">Sobre</a>
          <a href="#contact" className="text-brand-light hover:text-brand-gold transition-colors duration-300">Contato</a>
        </nav>
        <button className="md:hidden text-brand-light">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;

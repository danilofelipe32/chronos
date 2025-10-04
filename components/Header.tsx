import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const menuVariants = {
    closed: { opacity: 0, x: '100%' },
    open: { opacity: 1, x: 0, transition: { type: 'tween', ease: 'easeInOut', duration: 0.3 } },
  };

  const navLinkProps = {
    onClick: () => setIsMenuOpen(false),
    className: "text-3xl font-serif text-brand-light hover:text-brand-gold transition-colors duration-300"
  };

  return (
    <>
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
          <button className="md:hidden text-brand-light z-[101]" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu" aria-expanded={isMenuOpen}>
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </header>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-brand-dark/95 backdrop-blur-lg flex flex-col items-center justify-center md:hidden"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <nav className="flex flex-col items-center space-y-8">
              <a href="#collection" {...navLinkProps}>Coleção</a>
              <a href="#about" {...navLinkProps}>Sobre</a>
              <a href="#contact" {...navLinkProps}>Contato</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;


import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import WatchShowcase from './components/WatchShowcase';
import Footer from './components/Footer';
import { WATCHES } from './constants';

const App: React.FC = () => {
  return (
    <div className="bg-brand-dark text-brand-light font-sans">
      <Header />
      <main>
        <Hero />
        <WatchShowcase watches={WATCHES} />
      </main>
      <Footer />
    </div>
  );
};

export default App;

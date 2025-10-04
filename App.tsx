import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import WatchShowcase from './components/WatchShowcase';
import Footer from './components/Footer';
import { COLLECTIONS } from './constants';

const App: React.FC = () => {
  return (
    <div className="bg-brand-dark text-brand-light font-sans">
      <Header />
      <main>
        <Hero />
        <WatchShowcase collections={COLLECTIONS} />
      </main>
      <Footer />
    </div>
  );
};

export default App;

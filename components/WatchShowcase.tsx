
import React from 'react';
import type { Watch } from '../types';
import WatchCard from './WatchCard';

interface WatchShowcaseProps {
  watches: Watch[];
}

const WatchShowcase: React.FC<WatchShowcaseProps> = ({ watches }) => {
  return (
    <section id="collection" className="py-20 bg-brand-dark">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-serif font-bold text-center mb-2 text-brand-gold">
          Nossa Coleção
        </h2>
        <p className="text-center text-gray-400 mb-12 max-w-3xl mx-auto">
          Cada peça é uma declaração de intenção, um diálogo entre tradição e inovação. Descubra os conceitos que definem o futuro da relojoaria.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {watches.map((watch) => (
            <WatchCard key={watch.id} watch={watch} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WatchShowcase;

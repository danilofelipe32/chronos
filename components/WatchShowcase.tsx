import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Watch } from '../types';
import WatchCard from './WatchCard';

interface WatchShowcaseProps {
  watches: Watch[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const WatchShowcase: React.FC<WatchShowcaseProps> = ({ watches }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="collection" className="py-20 bg-brand-dark overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-serif font-bold text-center mb-2 text-brand-gold">
          Nossa Coleção
        </h2>
        <p className="text-center text-gray-400 mb-12 max-w-3xl mx-auto">
          Cada peça é uma declaração de intenção, um diálogo entre tradição e inovação. Descubra os conceitos que definem o futuro da relojoaria.
        </p>
        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {watches.map((watch) => (
            <WatchCard key={watch.id} watch={watch} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WatchShowcase;
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Collection } from '../types';
import WatchCard from './WatchCard';

interface WatchShowcaseProps {
  collections: Collection[];
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

const CollectionSection: React.FC<{ collection: Collection }> = ({ collection }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div ref={ref} className="mb-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-4xl font-serif font-bold text-center mb-2 text-brand-gold">
          {collection.name}
        </h2>
        <p className="text-center text-gray-400 mb-12 max-w-3xl mx-auto">
          {collection.description}
        </p>
      </motion.div>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {collection.watches.map((watch) => (
          <WatchCard key={watch.id} watch={watch} />
        ))}
      </motion.div>
    </div>
  );
}

const WatchShowcase: React.FC<WatchShowcaseProps> = ({ collections }) => {
  return (
    <section id="collection" className="py-20 bg-brand-dark overflow-hidden">
      <div className="container mx-auto px-6">
        {collections.map((collection) => (
          <CollectionSection key={collection.name} collection={collection} />
        ))}
      </div>
    </section>
  );
};

export default WatchShowcase;

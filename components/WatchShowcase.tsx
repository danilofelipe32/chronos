import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Collection, Watch } from '../types';
import WatchCard from './WatchCard';

interface WatchShowcaseProps {
  collections: Collection[];
  onSelectImage: (imageUrl: string) => void;
  onEditWatch: (watch: Watch) => void;
  collectionNames: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
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

interface CollectionSectionProps {
  collection: Collection;
  onSelectImage: (imageUrl: string) => void;
  onEditWatch: (watch: Watch) => void;
}

const CollectionSection: React.FC<CollectionSectionProps> = ({ collection, onSelectImage, onEditWatch }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div ref={ref} className="mb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-center mb-2 text-brand-gold">
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
          <WatchCard
            key={watch.id}
            watch={watch}
            onSelectImage={onSelectImage}
            onEditWatch={onEditWatch}
          />
        ))}
      </motion.div>
    </div>
  );
}

const WatchShowcase: React.FC<WatchShowcaseProps> = ({
  collections,
  onSelectImage,
  onEditWatch,
  collectionNames,
  activeFilter,
  onFilterChange
}) => {
  const filters = ['All', ...collectionNames];

  return (
    <section id="collection" className="py-20 bg-brand-dark overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          className="flex flex-wrap justify-center gap-2 md:gap-4 mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => onFilterChange(filter)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark focus:ring-brand-gold ${
                activeFilter === filter
                  ? 'bg-brand-gold text-brand-dark shadow-md'
                  : 'bg-brand-gray text-brand-light/80 hover:bg-brand-gray/70 hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {collections.map((collection) => (
          <CollectionSection
            key={collection.name}
            collection={collection}
            onSelectImage={onSelectImage}
            onEditWatch={onEditWatch}
          />
        ))}
      </div>
    </section>
  );
};

export default WatchShowcase;

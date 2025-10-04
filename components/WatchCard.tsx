import React from 'react';
import { motion } from 'framer-motion';
import type { Watch } from '../types';

interface WatchCardProps {
  watch: Watch;
  onSelectImage: (imageUrl: string) => void;
  onEditWatch: (watch: Watch) => void;
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
    <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
  </svg>
);


const WatchCard: React.FC<WatchCardProps> = ({ watch, onSelectImage, onEditWatch }) => {
  return (
    <motion.div
      className="bg-brand-gray rounded-lg overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-2xl hover:shadow-brand-gold/10 flex flex-col"
      variants={cardVariants}
    >
      <div className="relative">
        <button
          onClick={() => onSelectImage(watch.imageUrl)}
          className="block w-full h-80 sm:h-96"
          aria-label={`View ${watch.name} in fullscreen`}
        >
          <img
            src={watch.imageUrl}
            alt={watch.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
        </button>
      </div>
      <div className="p-6 relative flex-grow flex flex-col">
        <div className="flex-grow">
          <h3 className="text-2xl font-serif font-bold text-brand-gold mb-2">{watch.name}</h3>
          <p className="font-semibold text-brand-light/90 mb-3">{watch.tagline}</p>
          <p className="text-gray-400 text-sm leading-relaxed">{watch.description}</p>
        </div>
         <button
            onClick={() => onEditWatch(watch)}
            className="absolute top-4 right-4 p-2 rounded-full bg-brand-dark/50 text-brand-light/70 hover:bg-brand-gold hover:text-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-gray focus:ring-brand-gold transition-all duration-300 opacity-0 group-hover:opacity-100"
            aria-label={`Edit ${watch.name}`}
          >
            <EditIcon />
          </button>
      </div>
    </motion.div>
  );
};

export default WatchCard;

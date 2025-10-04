import React from 'react';
import { motion } from 'framer-motion';
import type { Watch } from '../types';

interface WatchCardProps {
  watch: Watch;
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

const WatchCard: React.FC<WatchCardProps> = ({ watch }) => {
  return (
    <motion.div
      className="bg-brand-gray rounded-lg overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-2xl hover:shadow-brand-gold/10"
      variants={cardVariants}
    >
      <div className="relative h-96">
        <img
          src={watch.imageUrl}
          alt={watch.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-serif font-bold text-brand-gold mb-2">{watch.name}</h3>
        <p className="font-semibold text-brand-light/90 mb-3">{watch.tagline}</p>
        <p className="text-gray-400 text-sm leading-relaxed">{watch.description}</p>
      </div>
    </motion.div>
  );
};

export default WatchCard;
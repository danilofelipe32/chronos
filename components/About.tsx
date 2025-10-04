import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const About: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="about" className="py-20 bg-black">
      <div ref={ref} className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-center mb-4 text-brand-gold">
            Sobre a Chronos Concept
          </h2>
          <p className="text-center text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            Na Chronos, não apenas medimos o tempo; nós o definimos. Nascemos de uma paixão por design atemporal e engenharia de precisão. Cada relógio em nosso portfólio é um conceito, uma exploração dos limites da arte e da tecnologia. Acreditamos que um relógio é mais do que um instrumento; é uma declaração, uma herança e uma obra de arte para o pulso.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

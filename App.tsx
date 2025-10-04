import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import WatchShowcase from './components/WatchShowcase';
import Footer from './components/Footer';
import { COLLECTIONS } from './constants';
import type { Watch, Collection } from './types';
import Modal from './components/Modal';
import PasswordModal from './components/PasswordModal';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [collections, setCollections] = useState<Collection[]>(COLLECTIONS);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [editingWatch, setEditingWatch] = useState<Watch | null>(null);
  const [passwordRequest, setPasswordRequest] = useState<Watch | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const handleUpdateWatch = (updatedWatch: Watch) => {
    const newCollections = collections.map(collection => ({
      ...collection,
      watches: collection.watches.map(watch =>
        watch.id === updatedWatch.id ? updatedWatch : watch
      ),
    }));
    setCollections(newCollections);
    setEditingWatch(null);
  };

  const handleEditRequest = (watch: Watch) => {
    setPasswordRequest(watch);
  };
  
  const handlePasswordCheck = (password: string): boolean => {
    if (password === '29101980') {
      if (passwordRequest) {
        setEditingWatch(passwordRequest);
      }
      setPasswordRequest(null);
      return true;
    }
    return false;
  };

  const collectionNames = COLLECTIONS.map(c => c.name);
  const filteredCollections = activeFilter === 'All'
    ? collections
    : collections.filter(c => c.name === activeFilter);

  return (
    <div className="bg-brand-dark text-brand-light font-sans">
      <Header />
      <main>
        <Hero />
        <WatchShowcase
          collections={filteredCollections}
          onSelectImage={setSelectedImage}
          onEditWatch={handleEditRequest}
          collectionNames={collectionNames}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </main>
      <Footer />

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <img
                src={selectedImage}
                alt="Watch Fullscreen"
                className="block max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
              />
            </motion.div>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors"
              aria-label="Close image viewer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <PasswordModal
        isOpen={!!passwordRequest}
        onClose={() => setPasswordRequest(null)}
        onCheckPassword={handlePasswordCheck}
      />

      <Modal isOpen={!!editingWatch} onClose={() => setEditingWatch(null)}>
        {editingWatch && (
          <EditWatchForm
            watch={editingWatch}
            onSave={handleUpdateWatch}
            onCancel={() => setEditingWatch(null)}
          />
        )}
      </Modal>
    </div>
  );
};

interface EditWatchFormProps {
  watch: Watch;
  onSave: (watch: Watch) => void;
  onCancel: () => void;
}

const EditWatchForm: React.FC<EditWatchFormProps> = ({ watch, onSave, onCancel }) => {
  const [formData, setFormData] = useState(watch);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="pt-8">
      <h2 className="text-2xl font-serif text-brand-gold mb-6 text-center">Editar Relógio</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-300 mb-1">URL da Imagem</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full bg-brand-dark border border-brand-gray text-white rounded-md p-2 focus:ring-brand-gold focus:border-brand-gold transition-colors"
            aria-label="Image URL"
          />
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Nome do Relógio</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-brand-dark border border-brand-gray text-white rounded-md p-2 focus:ring-brand-gold focus:border-brand-gold transition-colors"
            aria-label="Watch Name"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">Descrição</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full bg-brand-dark border border-brand-gray text-white rounded-md p-2 focus:ring-brand-gold focus:border-brand-gold transition-colors"
            aria-label="Description"
          ></textarea>
        </div>
      </div>
      <div className="mt-6 flex justify-end space-x-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded-md text-gray-300 hover:bg-brand-dark/50 transition-colors">Cancelar</button>
        <button type="submit" className="px-4 py-2 rounded-md bg-brand-gold text-brand-dark font-bold hover:bg-yellow-500 transition-colors">Salvar</button>
      </div>
    </form>
  )
}

export default App;
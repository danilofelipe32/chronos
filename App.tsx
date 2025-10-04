import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import WatchShowcase from './components/WatchShowcase';
import About from './components/About';
import Footer from './components/Footer';
import { COLLECTIONS } from './constants';
import { FEATURED_WATCH_IDS } from './featured';
import type { Watch, Collection } from './types';
import Modal from './components/Modal';
import PasswordModal from './components/PasswordModal';
import EditWatchForm from './components/EditWatchForm';
import AddWatchForm from './components/AddWatchForm';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [collections, setCollections] = useState<Collection[]>(COLLECTIONS);
  const [displayCollections, setDisplayCollections] = useState<Collection[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [editingWatch, setEditingWatch] = useState<{ watch: Watch; collectionName: string } | null>(null);
  const [passwordRequest, setPasswordRequest] = useState<{ watch: Watch; collectionName: string } | null>(null);
  const [isAddingWatch, setIsAddingWatch] = useState(false);
  const [isRequestingPasswordForAdd, setIsRequestingPasswordForAdd] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  
  useEffect(() => {
    // Cria a coleção "Destaques" dinamicamente
    const allWatches = collections.flatMap(c => c.watches);
    const featuredWatches = FEATURED_WATCH_IDS.map(id => allWatches.find(w => w.id === id)).filter(Boolean) as Watch[];

    const featuredCollection: Collection = {
        name: "Destaques",
        description: "Uma seleção curada das nossas peças mais icônicas e inovadoras, representando o auge do design e da engenharia da Chronos Concept.",
        watches: featuredWatches,
    };
    
    setDisplayCollections([featuredCollection, ...collections]);
  }, [collections]);


  const handleUpdateWatch = (updatedWatch: Watch, newCollectionName: string) => {
    const newCollections = collections.map(collection => {
      // Remove o relógio de qualquer coleção em que possa estar (lida com a movimentação)
      const watches = collection.watches.filter(w => w.id !== updatedWatch.id);
      
      // Se esta for a nova coleção de destino, adicione o relógio atualizado
      if (collection.name === newCollectionName) {
        // Ordenar por ID para manter a ordem consistente
        const newWatches = [...watches, updatedWatch].sort((a, b) => a.id - b.id);
        return { ...collection, watches: newWatches };
      }
      
      // Caso contrário, apenas retorne a coleção com o relógio removido (se ele estava lá)
      return { ...collection, watches };
    });
    
    setCollections(newCollections);
    setEditingWatch(null);
  };

  const handleAddNewWatch = (newWatchData: Omit<Watch, 'id'>, collectionName: string) => {
    const newId = Math.max(0, ...collections.flatMap(c => c.watches.map(w => w.id))) + 1;
    const newWatch: Watch = { ...newWatchData, id: newId };
    
    const newCollections = collections.map(collection => {
        if (collection.name === collectionName) {
            return {
                ...collection,
                watches: [...collection.watches, newWatch].sort((a,b) => a.id - b.id)
            };
        }
        return collection;
    });
    
    setCollections(newCollections);
    setIsAddingWatch(false);
  };

  const handleDeleteWatch = (watchIdToDelete: number) => {
    if (window.confirm('Tem certeza de que deseja excluir este relógio? Esta ação não pode ser desfeita.')) {
        const newCollections = collections.map(collection => ({
            ...collection,
            watches: collection.watches.filter(w => w.id !== watchIdToDelete)
        }));
        setCollections(newCollections);
        setEditingWatch(null);
    }
  };

  const handleEditRequest = (watch: Watch, collectionName: string) => {
    setPasswordRequest({ watch, collectionName });
  };
  
  const handleAddWatchRequest = () => {
    setIsRequestingPasswordForAdd(true);
  };

  const handlePasswordCheck = (password: string): boolean => {
    if (password === '29101980') {
      if (passwordRequest) {
        setEditingWatch(passwordRequest);
        setPasswordRequest(null);
      }
      if (isRequestingPasswordForAdd) {
        setIsAddingWatch(true);
        setIsRequestingPasswordForAdd(false);
      }
      return true;
    }
    return false;
  };

  const allCollectionNames = collections.map(c => c.name);
  const collectionNamesForFilter = displayCollections.map(c => c.name);

  const filteredCollections = activeFilter === 'All'
    ? displayCollections
    : displayCollections.filter(c => c.name === activeFilter);

  return (
    <div className="bg-brand-dark text-brand-light font-sans">
      <Header />
      <main>
        <Hero />
        <WatchShowcase
          collections={filteredCollections}
          onSelectImage={setSelectedImage}
          onEditWatch={handleEditRequest}
          onAddWatchRequest={handleAddWatchRequest}
          collectionNames={collectionNamesForFilter}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
        <About />
      </main>
      <Footer />

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 backdrop-blur-sm"
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
        isOpen={!!passwordRequest || isRequestingPasswordForAdd}
        onClose={() => {
          setPasswordRequest(null);
          setIsRequestingPasswordForAdd(false);
        }}
        onCheckPassword={handlePasswordCheck}
      />

      <Modal isOpen={isAddingWatch} onClose={() => setIsAddingWatch(false)}>
        <AddWatchForm
          allCollectionNames={allCollectionNames}
          onSave={handleAddNewWatch}
          onCancel={() => setIsAddingWatch(false)}
        />
      </Modal>

      <Modal isOpen={!!editingWatch} onClose={() => setEditingWatch(null)}>
        {editingWatch && (
          <EditWatchForm
            watch={editingWatch.watch}
            currentCollectionName={editingWatch.collectionName}
            allCollectionNames={allCollectionNames}
            onSave={handleUpdateWatch}
            onCancel={() => setEditingWatch(null)}
            onDelete={handleDeleteWatch}
          />
        )}
      </Modal>
    </div>
  );
};

export default App;

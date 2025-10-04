import React, { useState } from 'react';
import type { Watch } from '../types';

interface EditWatchFormProps {
  watch: Watch;
  currentCollectionName: string;
  allCollectionNames: string[];
  onSave: (watch: Watch, collectionName: string) => void;
  onCancel: () => void;
  onDelete: (watchId: number) => void;
}

const EditWatchForm: React.FC<EditWatchFormProps> = ({ watch, currentCollectionName, allCollectionNames, onSave, onCancel, onDelete }) => {
  const [formData, setFormData] = useState({ ...watch, collectionName: currentCollectionName });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { collectionName, ...watchData } = formData;
    onSave(watchData as Watch, collectionName);
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
          <label htmlFor="tagline" className="block text-sm font-medium text-gray-300 mb-1">Slogan</label>
          <input
            type="text"
            id="tagline"
            name="tagline"
            value={formData.tagline}
            onChange={handleChange}
            className="w-full bg-brand-dark border border-brand-gray text-white rounded-md p-2 focus:ring-brand-gold focus:border-brand-gold transition-colors"
            aria-label="Tagline"
          />
        </div>
         <div>
          <label htmlFor="collectionName" className="block text-sm font-medium text-gray-300 mb-1">Coleção</label>
          <select
            id="collectionName"
            name="collectionName"
            value={formData.collectionName}
            onChange={handleChange}
            className="w-full bg-brand-dark border border-brand-gray text-white rounded-md p-2 focus:ring-brand-gold focus:border-brand-gold transition-colors"
            aria-label="Collection"
          >
            {allCollectionNames.map(name => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
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
      <div className="mt-6 flex justify-between items-center">
        <button
          type="button"
          onClick={() => onDelete(watch.id)}
          className="p-2 rounded-md text-red-500 hover:bg-red-500/10 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-gray focus:ring-red-500"
          aria-label="Deletar relógio"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
        <div className="space-x-4">
          <button type="button" onClick={onCancel} className="px-4 py-2 rounded-md text-gray-300 hover:bg-brand-dark/50 transition-colors">Cancelar</button>
          <button type="submit" className="px-4 py-2 rounded-md bg-brand-gold text-brand-dark font-bold hover:bg-yellow-500 transition-colors">Salvar</button>
        </div>
      </div>
    </form>
  )
};

export default EditWatchForm;

import React, { useState } from 'react';
import type { Watch } from '../types';

interface AddWatchFormProps {
  allCollectionNames: string[];
  onSave: (watch: Omit<Watch, 'id'>, collectionName: string) => void;
  onCancel: () => void;
}

const AddWatchForm: React.FC<AddWatchFormProps> = ({ allCollectionNames, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    description: '',
    imageUrl: '',
    collectionName: 'Mechanica Art',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { collectionName, ...watchData } = formData;
    onSave(watchData, collectionName);
  };

  return (
    <form onSubmit={handleSubmit} className="pt-8">
      <h2 className="text-2xl font-serif text-brand-gold mb-6 text-center">Adicionar Novo Relógio</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="add-imageUrl" className="block text-sm font-medium text-gray-300 mb-1">URL da Imagem</label>
          <input
            type="text"
            id="add-imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full bg-brand-dark border border-brand-gray text-white rounded-md p-2 focus:ring-brand-gold focus:border-brand-gold transition-colors"
            aria-label="Image URL"
            placeholder="https://i.imgur.com/..."
            required
          />
        </div>
        <div>
          <label htmlFor="add-name" className="block text-sm font-medium text-gray-300 mb-1">Nome do Relógio</label>
          <input
            type="text"
            id="add-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-brand-dark border border-brand-gray text-white rounded-md p-2 focus:ring-brand-gold focus:border-brand-gold transition-colors"
            aria-label="Watch Name"
            required
          />
        </div>
        <div>
          <label htmlFor="add-tagline" className="block text-sm font-medium text-gray-300 mb-1">Slogan</label>
          <input
            type="text"
            id="add-tagline"
            name="tagline"
            value={formData.tagline}
            onChange={handleChange}
            className="w-full bg-brand-dark border border-brand-gray text-white rounded-md p-2 focus:ring-brand-gold focus:border-brand-gold transition-colors"
            aria-label="Tagline"
            required
          />
        </div>
         <div>
          <label htmlFor="add-collectionName" className="block text-sm font-medium text-gray-300 mb-1">Coleção</label>
          <select
            id="add-collectionName"
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
          <label htmlFor="add-description" className="block text-sm font-medium text-gray-300 mb-1">Descrição</label>
          <textarea
            id="add-description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full bg-brand-dark border border-brand-gray text-white rounded-md p-2 focus:ring-brand-gold focus:border-brand-gold transition-colors"
            aria-label="Description"
            required
          ></textarea>
        </div>
      </div>
      <div className="mt-6 flex justify-end space-x-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded-md text-gray-300 hover:bg-brand-dark/50 transition-colors">Cancelar</button>
        <button type="submit" className="px-4 py-2 rounded-md bg-brand-gold text-brand-dark font-bold hover:bg-yellow-500 transition-colors">Salvar</button>
      </div>
    </form>
  )
};

export default AddWatchForm;

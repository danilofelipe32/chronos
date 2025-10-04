import React, { useState, useEffect, useRef } from 'react';
import Modal from './Modal';

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckPassword: (password: string) => boolean;
}

const PasswordModal: React.FC<PasswordModalProps> = ({ isOpen, onClose, onCheckPassword }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPassword('');
      setError('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError('Por favor, insira a senha.');
      return;
    }
    const isCorrect = onCheckPassword(password);
    if (!isCorrect) {
      setError('Senha incorreta. Tente novamente.');
      setPassword('');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="pt-8">
        <h2 className="text-2xl font-serif text-brand-gold mb-4 text-center">Acesso Restrito</h2>
        <p className="text-center text-gray-400 mb-6">Por favor, insira a senha para continuar.</p>
        <div className="space-y-4">
          <div>
            <label htmlFor="password-input" className="sr-only">Senha</label>
            <input
              ref={inputRef}
              type="password"
              id="password-input"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-brand-dark border border-brand-gray text-white rounded-md p-3 text-center focus:ring-brand-gold focus:border-brand-gold transition-colors"
              aria-label="Password"
              placeholder="********"
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </div>
        <div className="mt-6 flex justify-end">
          <button type="submit" className="w-full px-4 py-3 rounded-md bg-brand-gold text-brand-dark font-bold hover:bg-yellow-500 transition-colors">
            Desbloquear
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default PasswordModal;

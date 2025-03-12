'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { FiUser, FiLock, FiSave } from 'react-icons/fi';

export default function ProfilePage() {
  const { data: session } = useSession();
  const [username, setUsername] = useState('admin');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    
    // Validação básica
    if (!currentPassword) {
      setMessage({ type: 'error', text: 'A senha atual é obrigatória' });
      return;
    }
    
    if (newPassword && newPassword.length < 6) {
      setMessage({ type: 'error', text: 'A nova senha deve ter pelo menos 6 caracteres' });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'As senhas não coincidem' });
      return;
    }
    
    setIsLoading(true);
    
    // Simulação de atualização de senha
    setTimeout(() => {
      setIsLoading(false);
      setMessage({ 
        type: 'success', 
        text: 'Perfil atualizado com sucesso! (Esta é uma simulação, a senha não foi alterada de fato)' 
      });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }, 1500);
    
    // Em uma implementação real, você enviaria os dados para a API
    // try {
    //   const response = await fetch('/api/profile', {
    //     method: 'PUT',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ currentPassword, newPassword }),
    //   });
    //   
    //   if (!response.ok) {
    //     const error = await response.json();
    //     throw new Error(error.message || 'Erro ao atualizar perfil');
    //   }
    //   
    //   setMessage({ type: 'success', text: 'Perfil atualizado com sucesso!' });
    //   setCurrentPassword('');
    //   setNewPassword('');
    //   setConfirmPassword('');
    // } catch (error) {
    //   setMessage({ type: 'error', text: error.message || 'Erro ao atualizar perfil' });
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Perfil do Administrador</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Nome de Usuário
            </label>
            <div className="flex">
              <div className="flex items-center justify-center bg-gray-100 px-3 rounded-l-md border border-r-0 border-gray-300">
                <FiUser className="text-gray-500" />
              </div>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-nmalls-primary"
                disabled
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">O nome de usuário não pode ser alterado</p>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="currentPassword">
              Senha Atual
            </label>
            <div className="flex">
              <div className="flex items-center justify-center bg-gray-100 px-3 rounded-l-md border border-r-0 border-gray-300">
                <FiLock className="text-gray-500" />
              </div>
              <input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-nmalls-primary"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
              Nova Senha
            </label>
            <div className="flex">
              <div className="flex items-center justify-center bg-gray-100 px-3 rounded-l-md border border-r-0 border-gray-300">
                <FiLock className="text-gray-500" />
              </div>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-nmalls-primary"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirmar Nova Senha
            </label>
            <div className="flex">
              <div className="flex items-center justify-center bg-gray-100 px-3 rounded-l-md border border-r-0 border-gray-300">
                <FiLock className="text-gray-500" />
              </div>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-nmalls-primary"
              />
            </div>
          </div>
          
          {message && (
            <div className={`p-3 mb-4 rounded-md ${
              message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {message.text}
            </div>
          )}
          
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary flex items-center justify-center"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
            ) : (
              <FiSave className="mr-2" />
            )}
            Salvar Alterações
          </button>
        </form>
      </div>
    </div>
  );
} 
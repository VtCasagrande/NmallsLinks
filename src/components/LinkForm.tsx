'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiSave, FiTrash2 } from 'react-icons/fi';
import { ILink } from '@/models/Link';

interface LinkFormProps {
  link?: ILink;
  isEditing?: boolean;
}

const LinkForm = ({ link, isEditing = false }: LinkFormProps) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    icon: '',
    image: '',
    featured: false,
    order: 0,
    category: 'geral',
    active: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (link) {
      setFormData({
        title: link.title,
        url: link.url,
        icon: link.icon,
        image: link.image || '',
        featured: link.featured,
        order: link.order,
        category: link.category,
        active: link.active,
      });
    }
  }, [link]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.url) {
      setError('Por favor, preencha os campos obrigatórios');
      return;
    }
    
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const url = isEditing ? `/api/links/${link?._id}` : '/api/links';
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao salvar link');
      }
      
      setSuccess(isEditing ? 'Link atualizado com sucesso!' : 'Link criado com sucesso!');
      
      if (!isEditing) {
        setFormData({
          title: '',
          url: '',
          icon: '',
          image: '',
          featured: false,
          order: 0,
          category: 'geral',
          active: true,
        });
      }
      
      setTimeout(() => {
        router.push('/admin/links');
        router.refresh();
      }, 1500);
    } catch (error) {
      console.error('Erro ao salvar link:', error);
      setError((error as Error).message || 'Erro ao salvar link');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!link?._id) return;
    
    if (!confirm('Tem certeza que deseja excluir este link?')) {
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch(`/api/links/${link._id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao excluir link');
      }
      
      setSuccess('Link excluído com sucesso!');
      
      setTimeout(() => {
        router.push('/admin/links');
        router.refresh();
      }, 1500);
    } catch (error) {
      console.error('Erro ao excluir link:', error);
      setError((error as Error).message || 'Erro ao excluir link');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">
        {isEditing ? 'Editar Link' : 'Novo Link'}
      </h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1">
            <label htmlFor="title" className="block text-gray-700 text-sm font-medium mb-2">
              Título *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input-field"
              placeholder="Nome do link"
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="col-span-1">
            <label htmlFor="url" className="block text-gray-700 text-sm font-medium mb-2">
              URL *
            </label>
            <input
              type="url"
              id="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              className="input-field"
              placeholder="https://exemplo.com"
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="col-span-1">
            <label htmlFor="icon" className="block text-gray-700 text-sm font-medium mb-2">
              Ícone *
            </label>
            <input
              type="text"
              id="icon"
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              className="input-field"
              placeholder="Nome do ícone ou HTML"
              required
              disabled={isLoading}
            />
            <p className="text-xs text-gray-500 mt-1">
              Insira o nome do ícone (ex: 'instagram') ou código HTML
            </p>
          </div>
          
          <div className="col-span-1">
            <label htmlFor="image" className="block text-gray-700 text-sm font-medium mb-2">
              Imagem (opcional)
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="input-field"
              placeholder="URL da imagem"
              disabled={isLoading}
            />
          </div>
          
          <div className="col-span-1">
            <label htmlFor="category" className="block text-gray-700 text-sm font-medium mb-2">
              Categoria
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input-field"
              placeholder="Categoria do link"
              disabled={isLoading}
            />
          </div>
          
          <div className="col-span-1">
            <label htmlFor="order" className="block text-gray-700 text-sm font-medium mb-2">
              Ordem
            </label>
            <input
              type="number"
              id="order"
              name="order"
              value={formData.order}
              onChange={handleChange}
              className="input-field"
              min="0"
              disabled={isLoading}
            />
          </div>
          
          <div className="col-span-1 flex items-center">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="h-4 w-4 text-nmalls-primary focus:ring-nmalls-primary border-gray-300 rounded"
              disabled={isLoading}
            />
            <label htmlFor="featured" className="ml-2 block text-gray-700 text-sm font-medium">
              Destacar link
            </label>
          </div>
          
          <div className="col-span-1 flex items-center">
            <input
              type="checkbox"
              id="active"
              name="active"
              checked={formData.active}
              onChange={handleChange}
              className="h-4 w-4 text-nmalls-primary focus:ring-nmalls-primary border-gray-300 rounded"
              disabled={isLoading}
            />
            <label htmlFor="active" className="ml-2 block text-gray-700 text-sm font-medium">
              Link ativo
            </label>
          </div>
        </div>
        
        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={() => router.push('/admin/links')}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors duration-300"
            disabled={isLoading}
          >
            Cancelar
          </button>
          
          <div className="flex space-x-4">
            {isEditing && (
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors duration-300 flex items-center"
                disabled={isLoading}
              >
                <FiTrash2 className="mr-2" />
                Excluir
              </button>
            )}
            
            <button
              type="submit"
              className="btn-primary flex items-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Salvando...
                </span>
              ) : (
                <>
                  <FiSave className="mr-2" />
                  Salvar
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LinkForm; 
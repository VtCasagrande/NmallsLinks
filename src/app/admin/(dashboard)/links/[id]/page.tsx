'use client';

import { useState, useEffect } from 'react';
import LinkForm from '@/components/LinkForm';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import { ILink } from '@/models/Link';

export default function EditLink({ params }: { params: { id: string } }) {
  const [link, setLink] = useState<ILink | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLink = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/links/${params.id}`);
        
        if (!res.ok) {
          throw new Error('Erro ao buscar link');
        }
        
        const data = await res.json();
        setLink(data);
      } catch (error) {
        console.error('Erro ao buscar link:', error);
        setError('Erro ao carregar link. Por favor, tente novamente.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLink();
  }, [params.id]);

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/links" className="text-gray-600 hover:text-gray-900 flex items-center">
          <FiArrowLeft className="mr-2" />
          Voltar para a lista de links
        </Link>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-nmalls-primary"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      ) : link ? (
        <LinkForm link={link} isEditing={true} />
      ) : (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          Link não encontrado.
        </div>
      )}
    </div>
  );
} 
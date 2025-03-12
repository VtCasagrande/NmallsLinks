'use client';

import { useState, useEffect } from 'react';
import SocialLinkForm from '@/components/SocialLinkForm';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import { ISocialLink } from '@/models/SocialLink';

export default function EditSocialLink({ params }: { params: { id: string } }) {
  const [socialLink, setSocialLink] = useState<ISocialLink | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSocialLink = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/social-links/${params.id}`);
        
        if (!res.ok) {
          throw new Error('Erro ao buscar link de rede social');
        }
        
        const data = await res.json();
        setSocialLink(data);
      } catch (error) {
        console.error('Erro ao buscar link de rede social:', error);
        setError('Erro ao carregar link de rede social. Por favor, tente novamente.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSocialLink();
  }, [params.id]);

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/social-links" className="text-gray-600 hover:text-gray-900 flex items-center">
          <FiArrowLeft className="mr-2" />
          Voltar para a lista de redes sociais
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
      ) : socialLink ? (
        <SocialLinkForm socialLink={socialLink} isEditing={true} />
      ) : (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          Link de rede social não encontrado.
        </div>
      )}
    </div>
  );
} 
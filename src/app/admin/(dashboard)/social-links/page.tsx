'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiPlus, FiEdit2 } from 'react-icons/fi';
import { ISocialLink } from '@/models/SocialLink';

export default function SocialLinks() {
  const [socialLinks, setSocialLinks] = useState<ISocialLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('/api/social-links');
        
        if (!res.ok) {
          throw new Error('Erro ao buscar links de redes sociais');
        }
        
        const data = await res.json();
        setSocialLinks(data);
      } catch (error) {
        console.error('Erro ao buscar links de redes sociais:', error);
        setError('Erro ao carregar links de redes sociais. Por favor, tente novamente.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSocialLinks();
  }, []);

  const getPlatformLabel = (platform: string) => {
    const platforms: Record<string, string> = {
      instagram: 'Instagram',
      facebook: 'Facebook',
      whatsapp: 'WhatsApp',
      email: 'Email',
      linkedin: 'LinkedIn',
      tiktok: 'TikTok',
      youtube: 'YouTube',
    };
    
    return platforms[platform] || platform.charAt(0).toUpperCase() + platform.slice(1);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Redes Sociais</h1>
        <Link
          href="/admin/social-links/new"
          className="btn-primary flex items-center"
        >
          <FiPlus className="mr-2" />
          Nova Rede Social
        </Link>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-nmalls-primary"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {socialLinks.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <p>Nenhum link de rede social encontrado.</p>
              <Link href="/admin/social-links/new" className="text-nmalls-primary hover:underline mt-2 inline-block">
                Adicionar a primeira rede social
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Plataforma
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      URL
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ordem
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {socialLinks.map((socialLink) => (
                    <tr key={socialLink._id.toString()}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-nmalls-secondary rounded-md text-nmalls-primary">
                            <span dangerouslySetInnerHTML={{ __html: socialLink.icon }} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {getPlatformLabel(socialLink.platform)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 max-w-xs truncate">
                          {socialLink.url}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {socialLink.order}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {socialLink.active ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Ativo
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Inativo
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link
                          href={`/admin/social-links/${socialLink._id}`}
                          className="text-nmalls-primary hover:text-nmalls-primary/80 mr-4"
                        >
                          <FiEdit2 className="inline-block" /> Editar
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 
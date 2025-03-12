'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiPlus, FiEdit2, FiEye, FiEyeOff } from 'react-icons/fi';
import { ILink } from '@/models/Link';

export default function Links() {
  const [links, setLinks] = useState<ILink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('/api/links');
        
        if (!res.ok) {
          throw new Error('Erro ao buscar links');
        }
        
        const data = await res.json();
        setLinks(data);
      } catch (error) {
        console.error('Erro ao buscar links:', error);
        setError('Erro ao carregar links. Por favor, tente novamente.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLinks();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Links</h1>
        <Link
          href="/admin/links/new"
          className="btn-primary flex items-center"
        >
          <FiPlus className="mr-2" />
          Novo Link
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
          {links.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <p>Nenhum link encontrado.</p>
              <Link href="/admin/links/new" className="text-nmalls-primary hover:underline mt-2 inline-block">
                Adicionar o primeiro link
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Título
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      URL
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Categoria
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
                  {links.map((link) => (
                    <tr key={link._id.toString()}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-nmalls-secondary rounded-md text-nmalls-primary">
                            <span dangerouslySetInnerHTML={{ __html: link.icon }} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {link.title}
                            </div>
                            {link.featured && (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                Destaque
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 max-w-xs truncate">
                          {link.url}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {link.category.charAt(0).toUpperCase() + link.category.slice(1)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {link.order}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {link.active ? (
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
                          href={`/admin/links/${link._id}`}
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
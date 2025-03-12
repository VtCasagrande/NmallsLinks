'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiLink, FiBarChart2, FiPlus } from 'react-icons/fi';
import { FaInstagram } from 'react-icons/fa';
import AdminLayout from '@/components/AdminLayout';
import { IStats } from '@/types';

export default function AdminDashboard() {
  const [stats, setStats] = useState<IStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/stats');
      
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-700 mb-2">Total de Visitas</h2>
            {isLoading ? (
              <div className="animate-pulse h-8 bg-gray-200 rounded"></div>
            ) : (
              <p className="text-3xl font-bold text-primary">{stats?.totalVisits || 0}</p>
            )}
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-700 mb-2">Total de Cliques</h2>
            {isLoading ? (
              <div className="animate-pulse h-8 bg-gray-200 rounded"></div>
            ) : (
              <p className="text-3xl font-bold text-primary">{stats?.totalClicks || 0}</p>
            )}
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-700 mb-2">Taxa de Cliques</h2>
            {isLoading ? (
              <div className="animate-pulse h-8 bg-gray-200 rounded"></div>
            ) : (
              <p className="text-3xl font-bold text-primary">{stats?.clickRate || 0}%</p>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-700">Links</h2>
              <div className="flex space-x-2">
                <Link
                  href="/admin/links"
                  className="px-3 py-1 text-sm bg-gray-100 rounded-md hover:bg-gray-200 flex items-center"
                >
                  <FiLink className="mr-1" /> Ver todos
                </Link>
                <Link
                  href="/admin/links/new"
                  className="px-3 py-1 text-sm bg-primary text-white rounded-md hover:bg-primary-dark flex items-center"
                >
                  <FiPlus className="mr-1" /> Novo
                </Link>
              </div>
            </div>
            <div>
              {isLoading ? (
                <div className="space-y-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse h-12 bg-gray-200 rounded"></div>
                  ))}
                </div>
              ) : stats?.topLinks && stats.topLinks.length > 0 ? (
                <div className="space-y-2">
                  {stats.topLinks.slice(0, 5).map((link) => (
                    <div key={link.linkId} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                      <span className="font-medium truncate max-w-[200px]">{link.title}</span>
                      <span className="text-sm text-gray-500">{link.count} cliques</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Nenhum link encontrado.</p>
              )}
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-700">Redes Sociais</h2>
              <div className="flex space-x-2">
                <Link
                  href="/admin/social-links"
                  className="px-3 py-1 text-sm bg-gray-100 rounded-md hover:bg-gray-200 flex items-center"
                >
                  <FaInstagram className="mr-1" /> Ver todas
                </Link>
                <Link
                  href="/admin/social-links/new"
                  className="px-3 py-1 text-sm bg-primary text-white rounded-md hover:bg-primary-dark flex items-center"
                >
                  <FiPlus className="mr-1" /> Nova
                </Link>
              </div>
            </div>
            <div>
              {isLoading ? (
                <div className="space-y-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse h-12 bg-gray-200 rounded"></div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                    <span className="font-medium">Instagram</span>
                    <Link
                      href="/admin/social-links"
                      className="text-sm text-primary hover:underline"
                    >
                      Editar
                    </Link>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                    <span className="font-medium">Facebook</span>
                    <Link
                      href="/admin/social-links"
                      className="text-sm text-primary hover:underline"
                    >
                      Editar
                    </Link>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                    <span className="font-medium">Twitter</span>
                    <Link
                      href="/admin/social-links"
                      className="text-sm text-primary hover:underline"
                    >
                      Editar
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm md:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-700">Estatísticas</h2>
              <Link
                href="/admin/stats"
                className="px-3 py-1 text-sm bg-gray-100 rounded-md hover:bg-gray-200 flex items-center"
              >
                <FiBarChart2 className="mr-1" /> Ver detalhes
              </Link>
            </div>
            <div>
              {isLoading ? (
                <div className="animate-pulse h-40 bg-gray-200 rounded"></div>
              ) : stats?.visitsPerSource && stats.visitsPerSource.length > 0 ? (
                <div className="space-y-2">
                  {stats.visitsPerSource.map((source) => (
                    <div key={source.source} className="flex items-center">
                      <span className="w-24 text-sm text-gray-600 capitalize">{source.source}</span>
                      <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{
                            width: `${(source.count / stats.totalVisits) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm text-gray-600">{source.count}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Nenhuma estatística disponível.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
} 
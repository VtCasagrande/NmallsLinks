'use client';

import { useState, useEffect } from 'react';
import { IStats } from '@/types';
import AdminLayout from '@/components/AdminLayout';

export default function StatsPage() {
  const [stats, setStats] = useState<IStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState('7d');

  // Dados de demonstração
  const demoStats: IStats = {
    totalVisits: 1245,
    totalClicks: 876,
    clickRate: 70.4,
    visitsPerSource: [
      { source: 'google', count: 450 },
      { source: 'direct', count: 320 },
      { source: 'facebook', count: 210 },
      { source: 'instagram', count: 180 },
      { source: 'outros', count: 85 }
    ],
    topLinks: [
      { linkId: '1', title: 'Produtos para Cães', count: 245 },
      { linkId: '2', title: 'Produtos para Gatos', count: 198 },
      { linkId: '3', title: 'Acessórios', count: 156 },
      { linkId: '4', title: 'Promoções', count: 132 },
      { linkId: '5', title: 'Contato', count: 98 }
    ]
  };

  useEffect(() => {
    // Simular carregamento
    const timer = setTimeout(() => {
      setStats(demoStats);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [period]);

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Estatísticas</h1>
          <div className="flex space-x-2">
            <button
              onClick={() => setPeriod('24h')}
              className={`px-3 py-1 text-sm rounded-md ${
                period === '24h' ? 'bg-primary text-white' : 'bg-gray-100'
              }`}
            >
              24h
            </button>
            <button
              onClick={() => setPeriod('7d')}
              className={`px-3 py-1 text-sm rounded-md ${
                period === '7d' ? 'bg-primary text-white' : 'bg-gray-100'
              }`}
            >
              7 dias
            </button>
            <button
              onClick={() => setPeriod('30d')}
              className={`px-3 py-1 text-sm rounded-md ${
                period === '30d' ? 'bg-primary text-white' : 'bg-gray-100'
              }`}
            >
              30 dias
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 p-4 rounded-md text-red-500">{error}</div>
        ) : stats ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium text-gray-700 mb-2">Total de Visitas</h2>
              <p className="text-3xl font-bold text-primary">{stats.totalVisits}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium text-gray-700 mb-2">Total de Cliques</h2>
              <p className="text-3xl font-bold text-primary">{stats.totalClicks}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium text-gray-700 mb-2">Taxa de Cliques</h2>
              <p className="text-3xl font-bold text-primary">{stats.clickRate}%</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm md:col-span-3">
              <h2 className="text-lg font-medium text-gray-700 mb-4">Visitas por Origem</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b text-left">Origem</th>
                      <th className="py-2 px-4 border-b text-left">Visitas</th>
                      <th className="py-2 px-4 border-b text-left">Porcentagem</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.visitsPerSource.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                        <td className="py-2 px-4 border-b">{item.source}</td>
                        <td className="py-2 px-4 border-b">{item.count}</td>
                        <td className="py-2 px-4 border-b">
                          {((item.count / stats.totalVisits) * 100).toFixed(1)}%
                          <div className="w-full bg-gray-200 h-2 mt-1 rounded-full">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: `${(item.count / stats.totalVisits) * 100}%` }}
                            ></div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm md:col-span-3">
              <h2 className="text-lg font-medium text-gray-700 mb-4">Links Mais Clicados</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b text-left">Link</th>
                      <th className="py-2 px-4 border-b text-left">Cliques</th>
                      <th className="py-2 px-4 border-b text-left">Porcentagem</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.topLinks.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                        <td className="py-2 px-4 border-b">{item.title}</td>
                        <td className="py-2 px-4 border-b">{item.count}</td>
                        <td className="py-2 px-4 border-b">
                          {((item.count / stats.totalClicks) * 100).toFixed(1)}%
                          <div className="w-full bg-gray-200 h-2 mt-1 rounded-full">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${(item.count / stats.totalClicks) * 100}%` }}
                            ></div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-yellow-50 p-4 rounded-md text-yellow-700">
            Nenhuma estatística disponível.
          </div>
        )}
      </div>
    </AdminLayout>
  );
} 
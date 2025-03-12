'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiLink, FiShare2, FiEye, FiBarChart2 } from 'react-icons/fi';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalLinks: 0,
    totalSocialLinks: 0,
    totalVisitors: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Buscar links
        const linksRes = await fetch('/api/links');
        const links = await linksRes.json();
        
        // Buscar links de redes sociais
        const socialLinksRes = await fetch('/api/social-links');
        const socialLinks = await socialLinksRes.json();
        
        // Buscar estatísticas
        const statsRes = await fetch('/api/stats');
        const statsData = await statsRes.json();
        
        setStats({
          totalLinks: links.length,
          totalSocialLinks: socialLinks.length,
          totalVisitors: statsData.totalVisitors || 0,
        });
      } catch (error) {
        console.error('Erro ao buscar estatísticas:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  const cards = [
    {
      title: 'Links',
      value: stats.totalLinks,
      icon: <FiLink className="w-8 h-8" />,
      href: '/admin/links',
      color: 'bg-blue-500',
    },
    {
      title: 'Redes Sociais',
      value: stats.totalSocialLinks,
      icon: <FiShare2 className="w-8 h-8" />,
      href: '/admin/social-links',
      color: 'bg-green-500',
    },
    {
      title: 'Visitantes',
      value: stats.totalVisitors,
      icon: <FiEye className="w-8 h-8" />,
      href: '/admin/stats',
      color: 'bg-purple-500',
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-nmalls-primary"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {cards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">{card.title}</p>
                      <h2 className="text-3xl font-bold mt-1">{card.value}</h2>
                    </div>
                    <div className={`${card.color} text-white p-3 rounded-lg`}>
                      {card.icon}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Visão Geral</h2>
              <Link href="/admin/stats" className="text-nmalls-primary hover:underline text-sm">
                Ver Estatísticas Completas
              </Link>
            </div>
            
            <p className="text-gray-600 mb-4">
              Bem-vindo ao painel administrativo do Linktree da Nmalls. Aqui você pode gerenciar seus links, redes sociais e visualizar estatísticas de visitantes.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4">
              <Link
                href="/admin/links/new"
                className="btn-primary flex items-center justify-center"
              >
                <FiLink className="mr-2" />
                Adicionar Novo Link
              </Link>
              
              <Link
                href="/admin/social-links/new"
                className="btn-secondary flex items-center justify-center"
              >
                <FiShare2 className="mr-2" />
                Adicionar Rede Social
              </Link>
              
              <Link
                href="/"
                target="_blank"
                className="btn-secondary flex items-center justify-center"
              >
                <FiEye className="mr-2" />
                Visualizar Linktree
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
} 
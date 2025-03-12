'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import LinkCard from '@/components/LinkCard';
import SocialLinks from '@/components/SocialLinks';
import Footer from '@/components/Footer';
import { ILink, ISocialLink } from '@/types';

export default function Home() {
  const [links, setLinks] = useState<ILink[]>([]);
  const [socialLinks, setSocialLinks] = useState<ISocialLink[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Registrar visita
    const referrer = document.referrer;
    let source = 'direct';
    
    if (referrer) {
      // Extrair o domínio do referrer
      try {
        const referrerUrl = new URL(referrer);
        const referrerDomain = referrerUrl.hostname;
        
        // Identificar a fonte com base no domínio
        if (referrerDomain.includes('google')) {
          source = 'google';
        } else if (referrerDomain.includes('facebook')) {
          source = 'facebook';
        } else if (referrerDomain.includes('instagram')) {
          source = 'instagram';
        } else if (referrerDomain.includes('twitter')) {
          source = 'twitter';
        } else if (referrerDomain.includes('linkedin')) {
          source = 'linkedin';
        } else {
          source = 'outros';
        }
      } catch (error) {
        console.error('Erro ao processar referrer:', error);
      }
    }
    
    // Registrar a visita na nova API
    fetch('/api/track/visit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ source }),
    }).catch(error => {
      console.error('Erro ao registrar visita:', error);
    });

    // Buscar links
    fetchLinks();
    
    // Buscar links de redes sociais
    fetch('/api/social-links')
      .then(res => res.json())
      .then(data => {
        setSocialLinks(data);
      })
      .catch(error => console.error('Erro ao buscar links de redes sociais:', error));
  }, []);

  const fetchLinks = async (category?: string) => {
    setIsLoading(true);
    try {
      const url = category && category !== 'all' 
        ? `/api/links?category=${category}` 
        : '/api/links';
      
      const res = await fetch(url);
      const data = await res.json();
      
      setLinks(data);
      
      // Extrair categorias únicas
      if (!category || category === 'all') {
        const uniqueCategories = Array.from(new Set(data.map((link: ILink) => link.category)));
        setCategories(uniqueCategories);
      }
    } catch (error) {
      console.error('Erro ao buscar links:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'all') {
      fetchLinks();
    } else {
      fetchLinks(category);
    }
  };

  const trackClick = (url: string) => {
    // Nota: O registro de cliques agora é feito diretamente no componente LinkCard
    // Esta função é mantida para compatibilidade com o código existente
  };

  // Filtrar links em destaque
  const featuredLinks = links.filter(link => link.featured);
  const regularLinks = links.filter(link => !link.featured);

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        title="Nmalls" 
        subtitle="N Possibilidades para o seu Pet🐾🐶" 
        logoUrl="/images/logo.png" 
      />
      
      {categories.length > 1 && (
        <div className="px-4 mb-6">
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-3 py-1 text-sm rounded-full ${
                selectedCategory === 'all'
                  ? 'bg-nmalls-primary text-white'
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              Todos
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-3 py-1 text-sm rounded-full ${
                  selectedCategory === category
                    ? 'bg-nmalls-primary text-white'
                    : 'bg-white text-gray-700 border border-gray-300'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <main className="flex-grow px-4 pb-8 max-w-md mx-auto w-full">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-nmalls-primary"></div>
          </div>
        ) : (
          <>
            {featuredLinks.length > 0 && (
              <div className="mb-8">
                {featuredLinks.map(link => (
                  <LinkCard key={link._id.toString()} link={link} trackClick={trackClick} />
                ))}
              </div>
            )}
            
            {regularLinks.map(link => (
              <LinkCard key={link._id.toString()} link={link} trackClick={trackClick} />
            ))}
            
            {links.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                Nenhum link disponível no momento.
              </div>
            )}
          </>
        )}
        
        {socialLinks.length > 0 && (
          <SocialLinks socialLinks={socialLinks} trackClick={trackClick} />
        )}
      </main>
      
      <Footer />
    </div>
  );
} 
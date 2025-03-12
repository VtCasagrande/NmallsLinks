'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiChevronRight } from 'react-icons/fi';
import { ILink } from '@/types';
import { FaExternalLinkAlt } from 'react-icons/fa';

interface LinkCardProps {
  link: ILink;
  trackClick: (id: string, type: 'link') => void;
}

const LinkCard = ({ link, trackClick }: LinkCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (isLoading) return;
    setIsLoading(true);
    
    try {
      if (link._id) {
        trackClick(String(link._id), 'link');
      }
      
      // Abrir o link em uma nova aba
      window.open(link.url, '_blank');
    } catch (error) {
      console.error('Erro ao registrar clique:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full mb-4 p-4 rounded-lg flex items-center transition-all duration-300 ${
        link.featured
          ? 'bg-gradient-to-r from-nmalls-primary to-nmalls-secondary text-white shadow-lg hover:shadow-xl'
          : 'bg-white text-gray-800 border border-gray-200 hover:border-nmalls-primary hover:shadow-md'
      }`}
      disabled={isLoading}
    >
      <div className="flex-1 flex items-center">
        {link.imageUrl && (
          <div className="mr-4 relative w-12 h-12 flex-shrink-0">
            <Image
              src={link.imageUrl}
              alt={link.title}
              fill
              sizes="48px"
              className="rounded-md object-cover"
            />
          </div>
        )}
        
        <div className="flex-1 text-left">
          <h3 className={`font-medium ${link.featured ? 'text-white' : 'text-gray-800'}`}>
            {link.title}
          </h3>
          {link.description && (
            <p className={`text-sm ${link.featured ? 'text-gray-100' : 'text-gray-600'}`}>
              {link.description}
            </p>
          )}
        </div>
      </div>
      
      <div className="ml-2">
        <FaExternalLinkAlt className={link.featured ? 'text-white' : 'text-gray-500'} />
      </div>
    </button>
  );
};

export default LinkCard; 
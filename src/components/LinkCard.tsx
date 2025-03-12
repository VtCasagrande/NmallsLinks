import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiChevronRight } from 'react-icons/fi';
import { ILink } from '@/types';

interface LinkCardProps {
  link: ILink;
  trackClick?: (url: string) => void;
}

const LinkCard = ({ link, trackClick }: LinkCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleClick = async () => {
    // Se houver uma função de rastreamento externa, use-a
    if (trackClick) {
      trackClick(link.url);
    }
    
    try {
      // Registrar o clique na API
      await fetch('/api/track/click', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          linkId: link._id,
          linkTitle: link.title,
        }),
      });
    } catch (error) {
      console.error('Erro ao registrar clique:', error);
    }
  };

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`link-card flex items-center p-4 mb-4 ${
        link.featured ? 'border-2 border-nmalls-primary' : ''
      }`}
    >
      <div className="flex-shrink-0 mr-4">
        {link.image ? (
          <Image
            src={link.image}
            alt={link.title}
            width={40}
            height={40}
            className="rounded-md"
          />
        ) : (
          <div className="w-10 h-10 bg-nmalls-secondary rounded-md flex items-center justify-center text-nmalls-primary">
            <span dangerouslySetInnerHTML={{ __html: link.icon }} />
          </div>
        )}
      </div>
      <div className="flex-grow">
        <h3 className="font-medium text-gray-800">{link.title}</h3>
      </div>
      <FiChevronRight
        className={`text-gray-400 transition-transform duration-300 ${
          isHovered ? 'transform translate-x-1' : ''
        }`}
      />
    </a>
  );
};

export default LinkCard; 
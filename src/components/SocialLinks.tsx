'use client';

import { useState } from 'react';
import { FaInstagram, FaFacebook, FaTwitter, FaYoutube, FaTiktok, FaLinkedin, FaLink } from 'react-icons/fa';
import { ISocialLink } from '@/types';

interface SocialLinksProps {
  socialLinks: ISocialLink[];
  trackClick: (id: string, type: 'social') => void;
}

export default function SocialLinks({ socialLinks, trackClick }: SocialLinksProps) {
  const [isLoading, setIsLoading] = useState(false);

  const getIconComponent = (platform?: string) => {
    if (!platform) return <FaLink />;
    
    switch (platform.toLowerCase()) {
      case 'instagram':
        return <FaInstagram />;
      case 'facebook':
        return <FaFacebook />;
      case 'twitter':
        return <FaTwitter />;
      case 'youtube':
        return <FaYoutube />;
      case 'tiktok':
        return <FaTiktok />;
      case 'linkedin':
        return <FaLinkedin />;
      default:
        return <FaLink />;
    }
  };

  const handleClick = async (social: ISocialLink) => {
    if (isLoading) return;
    setIsLoading(true);
    
    try {
      if (social._id) {
        trackClick(String(social._id), 'social');
      }
      
      // Abrir o link em uma nova aba
      window.open(social.url, '_blank');
    } catch (error) {
      console.error('Erro ao registrar clique:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center space-x-4 mt-8 mb-4">
      {socialLinks.map((social) => (
        <button
          key={String(social._id)}
          onClick={() => handleClick(social)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-nmalls-primary text-white hover:bg-nmalls-secondary transition-colors"
          aria-label={`Visite nosso ${social.platform || 'link social'}`}
        >
          {getIconComponent(social.icon || social.platform)}
        </button>
      ))}
    </div>
  );
} 
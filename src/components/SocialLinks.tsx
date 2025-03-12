import { ISocialLink } from '@/types';
import { FaInstagram, FaFacebook, FaWhatsapp, FaEnvelope, FaLinkedin, FaTiktok, FaYoutube } from 'react-icons/fa';

interface SocialLinksProps {
  socialLinks: ISocialLink[];
  trackClick?: (url: string) => void;
}

const SocialLinks = ({ socialLinks, trackClick }: SocialLinksProps) => {
  const getIconComponent = (platform: string) => {
    if (!platform) {
      return <span className="w-full h-full">🔗</span>;
    }
    
    try {
      switch (platform.toLowerCase()) {
        case 'instagram':
          return <FaInstagram className="w-full h-full" />;
        case 'facebook':
          return <FaFacebook className="w-full h-full" />;
        case 'whatsapp':
          return <FaWhatsapp className="w-full h-full" />;
        case 'email':
          return <FaEnvelope className="w-full h-full" />;
        case 'linkedin':
          return <FaLinkedin className="w-full h-full" />;
        case 'tiktok':
          return <FaTiktok className="w-full h-full" />;
        case 'youtube':
          return <FaYoutube className="w-full h-full" />;
        default:
          return <span dangerouslySetInnerHTML={{ __html: platform }} />;
      }
    } catch (error) {
      console.error('Erro ao processar ícone:', error);
      return <span className="w-full h-full">🔗</span>;
    }
  };

  const handleClick = async (social: ISocialLink) => {
    // Se houver uma função de rastreamento externa, use-a
    if (trackClick) {
      trackClick(social.url);
    }
    
    try {
      // Registrar o clique na API
      await fetch('/api/track/click', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          linkId: social._id,
          linkTitle: social.platform,
        }),
      });
    } catch (error) {
      console.error('Erro ao registrar clique em link social:', error);
    }
  };

  return (
    <div className="flex justify-center space-x-4 my-6">
      {socialLinks.map((social) => (
        <a
          key={social._id.toString()}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleClick(social)}
          className="social-icon"
          aria-label={social.platform || 'link social'}
        >
          {getIconComponent(social.icon || social.platform || '')}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks; 
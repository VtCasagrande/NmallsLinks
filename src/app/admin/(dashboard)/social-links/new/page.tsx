'use client';

import SocialLinkForm from '@/components/SocialLinkForm';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';

export default function NewSocialLink() {
  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/social-links" className="text-gray-600 hover:text-gray-900 flex items-center">
          <FiArrowLeft className="mr-2" />
          Voltar para a lista de redes sociais
        </Link>
      </div>
      
      <SocialLinkForm />
    </div>
  );
} 
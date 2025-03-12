'use client';

import LinkForm from '@/components/LinkForm';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';

export default function NewLink() {
  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/links" className="text-gray-600 hover:text-gray-900 flex items-center">
          <FiArrowLeft className="mr-2" />
          Voltar para a lista de links
        </Link>
      </div>
      
      <LinkForm />
    </div>
  );
} 
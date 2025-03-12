'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import AdminProtected from '@/components/AdminProtected';

export default function AdminLayout({ children }: { children: ReactNode }) {
  // Modo de teste: não usa SessionProvider
  return (
    <AdminProtected>
      {children}
    </AdminProtected>
  );
  
  /* Código original comentado para uso futuro
  return (
    <SessionProvider>
      <AdminProtected>
        {children}
      </AdminProtected>
    </SessionProvider>
  );
  */
} 
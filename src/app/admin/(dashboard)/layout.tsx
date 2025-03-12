'use client';

import { ReactNode } from 'react';
import AdminNav from '@/components/AdminNav';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <AdminNav />
      <main className="flex-grow p-6 md:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
} 
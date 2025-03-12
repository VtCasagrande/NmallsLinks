'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiLink, FiBarChart2, FiSettings, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { FaInstagram } from 'react-icons/fa';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: <FiHome className="mr-3" /> },
    { path: '/admin/links', label: 'Links', icon: <FiLink className="mr-3" /> },
    { path: '/admin/social-links', label: 'Redes Sociais', icon: <FaInstagram className="mr-3" /> },
    { path: '/admin/stats', label: 'Estatísticas', icon: <FiBarChart2 className="mr-3" /> },
  ];

  const handleSignOut = async () => {
    // Modo de teste: redireciona para a página inicial
    window.location.href = '/';
    
    /* Código original comentado para uso futuro
    await signOut({ callbackUrl: '/admin/login' });
    */
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar para desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 bg-white border-r">
          <div className="flex items-center justify-center h-16 border-b">
            <Link href="/admin" className="text-xl font-bold text-primary">
              NMALLS Admin
            </Link>
          </div>
          <div className="flex flex-col flex-grow p-4">
            <nav className="flex-1 space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center px-4 py-2 rounded-md ${
                    pathname === item.path
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto">
              <button
                onClick={handleSignOut}
                className="flex items-center w-full px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
              >
                <FiLogOut className="mr-3" />
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar para mobile */}
      <div
        className={`fixed inset-0 z-20 transition-opacity duration-300 ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-gray-600 opacity-75" onClick={toggleSidebar}></div>
        <div className="fixed inset-y-0 left-0 flex flex-col z-40 w-64 bg-white">
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <Link href="/admin" className="text-xl font-bold text-primary">
              NMALLS Admin
            </Link>
            <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-700">
              <FiX size={24} />
            </button>
          </div>
          <div className="flex flex-col flex-grow p-4">
            <nav className="flex-1 space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center px-4 py-2 rounded-md ${
                    pathname === item.path
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={toggleSidebar}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto">
              <button
                onClick={handleSignOut}
                className="flex items-center w-full px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
              >
                <FiLogOut className="mr-3" />
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="flex items-center justify-between h-16 px-6 bg-white border-b md:hidden">
          <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-700">
            <FiMenu size={24} />
          </button>
          <Link href="/admin" className="text-xl font-bold text-primary">
            NMALLS Admin
          </Link>
          <div className="w-6"></div> {/* Espaçador para centralizar o título */}
        </header>
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 
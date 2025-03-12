'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { FiHome, FiLink, FiShare2, FiBarChart2, FiUser, FiLogOut, FiMenu, FiX } from 'react-icons/fi';

const AdminNav = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/admin/login' });
  };

  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: <FiHome className="w-5 h-5" /> },
    { href: '/admin/links', label: 'Links', icon: <FiLink className="w-5 h-5" /> },
    { href: '/admin/social-links', label: 'Redes Sociais', icon: <FiShare2 className="w-5 h-5" /> },
    { href: '/admin/stats', label: 'Estatísticas', icon: <FiBarChart2 className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex flex-col w-64 bg-white h-screen shadow-md">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-nmalls-primary">NMALLS Admin</h1>
        </div>
        <div className="flex-grow p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center p-3 rounded-lg ${
                    pathname.includes(item.href)
                      ? 'bg-nmalls-primary text-white'
                      : 'text-gray-700 hover:bg-nmalls-secondary'
                  }`}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-4 border-t">
          <button
            onClick={handleSignOut}
            className="flex items-center w-full p-3 text-gray-700 hover:bg-red-100 rounded-lg"
          >
            <FiLogOut className="w-5 h-5" />
            <span className="ml-3">Sair</span>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="flex items-center justify-between p-4 bg-white shadow-md">
          <h1 className="text-xl font-bold text-nmalls-primary">NMALLS Admin</h1>
          <button
            onClick={toggleMobileMenu}
            className="p-2 text-gray-700 rounded-md hover:bg-gray-100"
          >
            {isMobileMenuOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <nav className="bg-white shadow-md">
            <ul className="py-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-3 ${
                      pathname.includes(item.href)
                        ? 'bg-nmalls-primary text-white'
                        : 'text-gray-700 hover:bg-nmalls-secondary'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={handleSignOut}
                  className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-red-100"
                >
                  <FiLogOut className="w-5 h-5" />
                  <span className="ml-3">Sair</span>
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </>
  );
};

export default AdminNav; 
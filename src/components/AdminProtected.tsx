'use client';

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, ReactNode } from 'react';

interface AdminProtectedProps {
  children: ReactNode;
}

const AdminProtected = ({ children }: AdminProtectedProps) => {
  // Modo de teste: sempre permite acesso
  return <>{children}</>;
  
  /* Código original comentado para uso futuro
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Não redirecionar se estiver na página de login
    if (pathname === '/admin/login') {
      return;
    }

    // Aguardar o carregamento da sessão
    if (status === 'loading') {
      return;
    }

    // Redirecionar para a página de login se não estiver autenticado
    if (!session) {
      console.log('Usuário não autenticado, redirecionando para login');
      router.push('/admin/login');
      return;
    }

    // Verificar se o usuário tem a role de admin
    if (session?.user?.role !== 'admin') {
      console.log('Usuário não é admin, redirecionando para login');
      router.push('/admin/login');
      return;
    }
  }, [session, status, router, pathname]);

  // Mostrar tela de carregamento enquanto verifica a autenticação
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-nmalls-secondary">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-nmalls-primary"></div>
      </div>
    );
  }

  // Se estiver na página de login, mostrar a página de login
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Se não estiver autenticado ou não for admin, não mostrar nada
  if (!session || session?.user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-nmalls-secondary">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-nmalls-primary"></div>
      </div>
    );
  }

  // Se estiver autenticado e for admin, mostrar o conteúdo
  return <>{children}</>;
  */
};

export default AdminProtected; 
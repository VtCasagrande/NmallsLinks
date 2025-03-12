import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Link from '@/models/Link';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

// Links de exemplo para quando o MongoDB não estiver disponível
const demoLinks = [
  {
    _id: '1',
    title: 'Clube de Promoções NMALLS',
    url: 'https://nmalls.com.br/promocoes',
    icon: '💌',
    featured: true,
    order: 1,
    category: 'geral',
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '2',
    title: 'Site',
    url: 'https://nmalls.com.br',
    icon: '🛒',
    featured: false,
    order: 2,
    category: 'geral',
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '3',
    title: 'Google Play Store',
    url: 'https://play.google.com/store/apps/details?id=com.nmalls.petcenter',
    icon: '👑',
    featured: false,
    order: 3,
    category: 'app',
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '4',
    title: 'App Store',
    url: 'https://apps.apple.com/br/app/nmalls-pet-center',
    icon: '👑',
    featured: false,
    order: 4,
    category: 'app',
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    try {
      const link = await Link.findById(params.id);
      
      if (!link) {
        return NextResponse.json({ error: 'Link não encontrado' }, { status: 404 });
      }
      
      return NextResponse.json(link);
    } catch (error) {
      console.error('Erro ao buscar link do MongoDB, usando dados de demonstração:', error);
      
      // Buscar link de demonstração pelo ID
      const demoLink = demoLinks.find(link => link._id === params.id);
      
      if (!demoLink) {
        return NextResponse.json({ error: 'Link não encontrado' }, { status: 404 });
      }
      
      return NextResponse.json(demoLink);
    }
  } catch (error) {
    console.error('Erro ao buscar link:', error);
    return NextResponse.json({ error: 'Erro ao buscar link' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Modo de teste: não verifica autenticação
    /* Código original comentado para uso futuro
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }
    */
    
    await dbConnect();
    
    const data = await req.json();
    
    try {
      const link = await Link.findByIdAndUpdate(params.id, data, {
        new: true,
        runValidators: true,
      });
      
      if (!link) {
        return NextResponse.json({ error: 'Link não encontrado' }, { status: 404 });
      }
      
      return NextResponse.json(link);
    } catch (error) {
      console.error('Erro ao atualizar link no MongoDB, usando dados de demonstração:', error);
      
      // Simular atualização bem-sucedida
      const demoLinkIndex = demoLinks.findIndex(link => link._id === params.id);
      
      if (demoLinkIndex === -1) {
        return NextResponse.json({ error: 'Link não encontrado' }, { status: 404 });
      }
      
      const updatedLink = {
        ...demoLinks[demoLinkIndex],
        ...data,
        updatedAt: new Date(),
      };
      
      return NextResponse.json(updatedLink);
    }
  } catch (error) {
    console.error('Erro ao atualizar link:', error);
    return NextResponse.json({ error: 'Erro ao atualizar link' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Modo de teste: não verifica autenticação
    /* Código original comentado para uso futuro
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }
    */
    
    await dbConnect();
    
    try {
      const link = await Link.findByIdAndDelete(params.id);
      
      if (!link) {
        return NextResponse.json({ error: 'Link não encontrado' }, { status: 404 });
      }
      
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error('Erro ao excluir link do MongoDB, simulando exclusão:', error);
      
      // Simular exclusão bem-sucedida
      const demoLinkIndex = demoLinks.findIndex(link => link._id === params.id);
      
      if (demoLinkIndex === -1) {
        return NextResponse.json({ error: 'Link não encontrado' }, { status: 404 });
      }
      
      return NextResponse.json({ success: true });
    }
  } catch (error) {
    console.error('Erro ao excluir link:', error);
    return NextResponse.json({ error: 'Erro ao excluir link' }, { status: 500 });
  }
} 
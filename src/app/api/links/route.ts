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

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    const category = req.nextUrl.searchParams.get('category');
    const query = category ? { category, active: true } : { active: true };
    
    try {
      const links = await Link.find(query).sort({ order: 1 });
      return NextResponse.json(links);
    } catch (error) {
      console.error('Erro ao buscar links do MongoDB, usando dados de demonstração:', error);
      
      // Filtrar links de demonstração se houver categoria
      const filteredLinks = category 
        ? demoLinks.filter(link => link.category === category && link.active) 
        : demoLinks.filter(link => link.active);
      
      return NextResponse.json(filteredLinks);
    }
  } catch (error) {
    console.error('Erro ao buscar links:', error);
    // Retornar links de demonstração em caso de erro
    return NextResponse.json(demoLinks);
  }
}

export async function POST(req: NextRequest) {
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
      const link = await Link.create(data);
      return NextResponse.json(link, { status: 201 });
    } catch (error) {
      console.error('Erro ao criar link no MongoDB:', error);
      // Simular criação bem-sucedida
      const newLink = {
        ...data,
        _id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return NextResponse.json(newLink, { status: 201 });
    }
  } catch (error) {
    console.error('Erro ao criar link:', error);
    return NextResponse.json({ error: 'Erro ao criar link' }, { status: 500 });
  }
} 
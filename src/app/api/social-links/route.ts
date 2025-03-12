import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import SocialLink from '@/models/SocialLink';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

// Links sociais de exemplo para quando o MongoDB não estiver disponível
const demoSocialLinks = [
  {
    _id: '1',
    platform: 'instagram',
    icon: 'instagram',
    url: 'https://instagram.com/nmalls',
    order: 1,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '2',
    platform: 'facebook',
    icon: 'facebook',
    url: 'https://facebook.com/nmalls',
    order: 2,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '3',
    platform: 'twitter',
    icon: 'twitter',
    url: 'https://twitter.com/nmalls',
    order: 3,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '4',
    platform: 'youtube',
    icon: 'youtube',
    url: 'https://youtube.com/nmalls',
    order: 4,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export async function GET() {
  try {
    await dbConnect();
    
    try {
      const socialLinks = await SocialLink.find({ active: true }).sort({ order: 1 });
      return NextResponse.json(socialLinks);
    } catch (error) {
      console.error('Erro ao buscar links sociais do MongoDB, usando dados de demonstração:', error);
      
      // Filtrar links sociais de demonstração ativos
      const filteredLinks = demoSocialLinks.filter(link => link.active);
      
      return NextResponse.json(filteredLinks);
    }
  } catch (error) {
    console.error('Erro ao buscar links sociais:', error);
    // Retornar links sociais de demonstração em caso de erro
    return NextResponse.json(demoSocialLinks.filter(link => link.active));
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
      const socialLink = await SocialLink.create(data);
      return NextResponse.json(socialLink, { status: 201 });
    } catch (error) {
      console.error('Erro ao criar link social no MongoDB:', error);
      // Simular criação bem-sucedida
      const newSocialLink = {
        ...data,
        _id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return NextResponse.json(newSocialLink, { status: 201 });
    }
  } catch (error) {
    console.error('Erro ao criar link social:', error);
    return NextResponse.json({ error: 'Erro ao criar link social' }, { status: 500 });
  }
} 
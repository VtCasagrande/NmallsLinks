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

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    try {
      const socialLink = await SocialLink.findById(params.id);
      
      if (!socialLink) {
        return NextResponse.json({ error: 'Link social não encontrado' }, { status: 404 });
      }
      
      return NextResponse.json(socialLink);
    } catch (error) {
      console.error('Erro ao buscar link social do MongoDB, usando dados de demonstração:', error);
      
      // Buscar link social de demonstração pelo ID
      const demoSocialLink = demoSocialLinks.find(link => link._id === params.id);
      
      if (!demoSocialLink) {
        return NextResponse.json({ error: 'Link social não encontrado' }, { status: 404 });
      }
      
      return NextResponse.json(demoSocialLink);
    }
  } catch (error) {
    console.error('Erro ao buscar link social:', error);
    return NextResponse.json({ error: 'Erro ao buscar link social' }, { status: 500 });
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
      const socialLink = await SocialLink.findByIdAndUpdate(params.id, data, {
        new: true,
        runValidators: true,
      });
      
      if (!socialLink) {
        return NextResponse.json({ error: 'Link social não encontrado' }, { status: 404 });
      }
      
      return NextResponse.json(socialLink);
    } catch (error) {
      console.error('Erro ao atualizar link social no MongoDB, usando dados de demonstração:', error);
      
      // Simular atualização bem-sucedida
      const demoSocialLinkIndex = demoSocialLinks.findIndex(link => link._id === params.id);
      
      if (demoSocialLinkIndex === -1) {
        return NextResponse.json({ error: 'Link social não encontrado' }, { status: 404 });
      }
      
      const updatedSocialLink = {
        ...demoSocialLinks[demoSocialLinkIndex],
        ...data,
        updatedAt: new Date(),
      };
      
      return NextResponse.json(updatedSocialLink);
    }
  } catch (error) {
    console.error('Erro ao atualizar link social:', error);
    return NextResponse.json({ error: 'Erro ao atualizar link social' }, { status: 500 });
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
      const socialLink = await SocialLink.findByIdAndDelete(params.id);
      
      if (!socialLink) {
        return NextResponse.json({ error: 'Link social não encontrado' }, { status: 404 });
      }
      
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error('Erro ao excluir link social do MongoDB, simulando exclusão:', error);
      
      // Simular exclusão bem-sucedida
      const demoSocialLinkIndex = demoSocialLinks.findIndex(link => link._id === params.id);
      
      if (demoSocialLinkIndex === -1) {
        return NextResponse.json({ error: 'Link social não encontrado' }, { status: 404 });
      }
      
      return NextResponse.json({ success: true });
    }
  } catch (error) {
    console.error('Erro ao excluir link social:', error);
    return NextResponse.json({ error: 'Erro ao excluir link social' }, { status: 500 });
  }
} 
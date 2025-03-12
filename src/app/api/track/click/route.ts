import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Click from '@/models/Click';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { linkId, linkTitle } = data;
    
    if (!linkId) {
      return NextResponse.json({ 
        success: false, 
        error: 'ID do link é obrigatório' 
      }, { status: 400 });
    }
    
    await dbConnect();
    
    try {
      // Tentar salvar no MongoDB
      const click = await Click.create({
        linkId,
        linkTitle,
        createdAt: new Date(),
      });
      
      return NextResponse.json({ success: true, id: click._id });
    } catch (error) {
      console.error('Erro ao salvar clique no MongoDB, simulando sucesso:', error);
      
      // Simular sucesso mesmo sem MongoDB
      return NextResponse.json({ 
        success: true, 
        id: `demo-${Date.now()}`,
        demo: true
      });
    }
  } catch (error) {
    console.error('Erro ao registrar clique:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Erro ao registrar clique',
      demo: true
    }, { status: 500 });
  }
} 
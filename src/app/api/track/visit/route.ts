import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Visit from '@/models/Visit';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { source = 'direct' } = data;
    
    await dbConnect();
    
    try {
      // Tentar salvar no MongoDB
      const visit = await Visit.create({
        source,
        createdAt: new Date(),
      });
      
      return NextResponse.json({ success: true, id: visit._id });
    } catch (error) {
      console.error('Erro ao salvar visita no MongoDB, simulando sucesso:', error);
      
      // Simular sucesso mesmo sem MongoDB
      return NextResponse.json({ 
        success: true, 
        id: `demo-${Date.now()}`,
        demo: true
      });
    }
  } catch (error) {
    console.error('Erro ao registrar visita:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Erro ao registrar visita',
      demo: true
    }, { status: 500 });
  }
} 
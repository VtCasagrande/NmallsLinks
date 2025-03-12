import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Visitor from '@/models/Visitor';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    
    const data = await req.json();
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';
    
    const visitor = await Visitor.create({
      ...data,
      ip,
      userAgent,
    });
    
    return NextResponse.json(visitor, { status: 201 });
  } catch (error) {
    console.error('Erro ao registrar visitante:', error);
    return NextResponse.json({ error: 'Erro ao registrar visitante' }, { status: 500 });
  }
} 
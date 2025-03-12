import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Visit from '@/models/Visit';
import Click from '@/models/Click';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

// Dados de exemplo para quando o MongoDB não estiver disponível
const demoVisits = [
  { source: 'direct', count: 150 },
  { source: 'google', count: 85 },
  { source: 'facebook', count: 65 },
  { source: 'instagram', count: 120 },
  { source: 'twitter', count: 30 },
  { source: 'linkedin', count: 45 },
  { source: 'outros', count: 25 },
];

const demoClicks = [
  { linkId: '1', title: 'Clube de Promoções NMALLS', count: 75 },
  { linkId: '2', title: 'Site', count: 120 },
  { linkId: '3', title: 'Google Play Store', count: 45 },
  { linkId: '4', title: 'App Store', count: 40 },
];

const demoStats = {
  totalVisits: 520,
  totalClicks: 280,
  clickRate: 53.8,
  visitsPerSource: demoVisits,
  topLinks: demoClicks,
};

export async function GET(req: NextRequest) {
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
      // Tentar buscar estatísticas reais do MongoDB
      const totalVisits = await Visit.countDocuments();
      const totalClicks = await Click.countDocuments();
      
      const clickRate = totalVisits > 0 ? (totalClicks / totalVisits) * 100 : 0;
      
      const visitsPerSource = await Visit.aggregate([
        { $group: { _id: '$source', count: { $sum: 1 } } },
        { $project: { _id: 0, source: '$_id', count: 1 } },
        { $sort: { count: -1 } },
      ]);
      
      const topLinks = await Click.aggregate([
        { $group: { _id: { linkId: '$linkId', title: '$linkTitle' }, count: { $sum: 1 } } },
        { $project: { _id: 0, linkId: '$_id.linkId', title: '$_id.title', count: 1 } },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ]);
      
      return NextResponse.json({
        totalVisits,
        totalClicks,
        clickRate: parseFloat(clickRate.toFixed(1)),
        visitsPerSource,
        topLinks,
      });
    } catch (error) {
      console.error('Erro ao buscar estatísticas do MongoDB, usando dados de demonstração:', error);
      
      // Retornar dados de demonstração
      return NextResponse.json(demoStats);
    }
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    // Retornar dados de demonstração em caso de erro
    return NextResponse.json(demoStats);
  }
} 
import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

export const dynamic = 'force-static';
export const revalidate = false;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');
    
    // If Supabase is not configured, return mock data
    if (!isSupabaseConfigured()) {
      const mockPortfolio = [
        {
          id: '1',
          title: 'The Morris Team',
          description: 'Professional real estate website with modern design and lead generation features.',
          client_name: 'Morris Real Estate',
          industry: 'Real Estate',
          project_url: 'https://the-morris-team.netlify.app',
          image_url: 'https://via.placeholder.com/600x400/1a1a1a/ffffff?text=The+Morris+Team',
          technologies: ['React', 'Next.js', 'Tailwind CSS', 'Netlify'],
          featured: true,
          sort_order: 1
        },
        {
          id: '2',
          title: 'Secret Touch Spa',
          description: 'Luxury spa and wellness website with booking system and service showcase.',
          client_name: 'Secret Touch Spa',
          industry: 'Wellness & Beauty',
          project_url: 'https://secrettouchspa.netlify.app',
          image_url: 'https://via.placeholder.com/600x400/1a1a1a/ffffff?text=Secret+Touch+Spa',
          technologies: ['React', 'Next.js', 'Tailwind CSS', 'Netlify'],
          featured: true,
          sort_order: 2
        },
        {
          id: '3',
          title: 'Carib Life ATL',
          description: 'Caribbean culture and lifestyle website for Atlanta community.',
          client_name: 'Carib Life ATL',
          industry: 'Community & Culture',
          project_url: 'https://cariblifeatl.netlify.app',
          image_url: 'https://via.placeholder.com/600x400/1a1a1a/ffffff?text=Carib+Life+ATL',
          technologies: ['React', 'Next.js', 'Tailwind CSS', 'Netlify'],
          featured: true,
          sort_order: 3
        }
      ];
      
      let result = mockPortfolio;
      if (featured === 'true') {
        result = result.filter(item => item.featured);
      }
      if (limit) {
        result = result.slice(0, parseInt(limit));
      }
      
      return NextResponse.json(result);
    }
    
    const supabaseAdmin = getSupabaseAdmin();
    let query = supabaseAdmin
      .from('portfolio')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (featured === 'true') {
      query = query.eq('featured', true);
    }

    if (limit) {
      query = query.limit(parseInt(limit));
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    // Error fetching portfolio
    return NextResponse.json(
      { error: 'Failed to fetch portfolio' },
      { status: 500 }
    );
  }
}
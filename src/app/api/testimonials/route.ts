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
      const mockTestimonials = [
        {
          id: '1',
          client_name: 'Jamal Williams',
          company: 'Urban Threads',
          role: 'CEO',
          content: 'DOJMARK transformed our online presence completely. Our sales increased by 150% in just three months after launching our new site.',
          rating: 5,
          featured: true,
          approved: true,
          sort_order: 1
        },
        {
          id: '2',
          client_name: 'Aisha Johnson',
          company: 'Bloom Wellness',
          role: 'Founder',
          content: 'The team at DOJMARK understood our vision perfectly. They delivered a brand identity that truly represents our values and mission.',
          rating: 5,
          featured: true,
          approved: true,
          sort_order: 2
        },
        {
          id: '3',
          client_name: 'Marcus Thompson',
          company: 'TechForward Solutions',
          role: 'Owner',
          content: 'Working with DOJMARK was the best business decision I made this year. Their expertise in digital strategy is unmatched.',
          rating: 5,
          featured: true,
          approved: true,
          sort_order: 3
        }
      ];
      
      let result = mockTestimonials;
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
      .from('testimonials')
      .select('*')
      .eq('approved', true)
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
    // Error fetching testimonials
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { client_name, company, role, content, rating } = body;

    if (!client_name || !content || !rating) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // If Supabase is not configured, return a mock success response
    if (!isSupabaseConfigured()) {
      // Testimonial submission (demo mode)
      return NextResponse.json(
        { message: 'Testimonial submitted successfully (demo mode)', data: { id: 'demo-id', client_name, company, role, content, rating, approved: false } },
        { status: 201 }
      );
    }

    const supabaseAdmin = getSupabaseAdmin();
    const { data, error } = await supabaseAdmin
      .from('testimonials')
      .insert([
        {
          client_name,
          company,
          role,
          content,
          rating: parseInt(rating),
          approved: false // Requires approval
        }
      ])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    // Error creating testimonial
    return NextResponse.json(
      { error: 'Failed to create testimonial' },
      { status: 500 }
    );
  }
}
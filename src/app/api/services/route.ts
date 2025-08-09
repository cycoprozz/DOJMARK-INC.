import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { getAllServices } from '@/lib/cms';

export const dynamic = 'force-static';
export const revalidate = false;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    
    // Try to get services from Supabase first
    if (isSupabaseConfigured()) {
      try {
        const supabaseAdmin = getSupabaseAdmin();
        let query = supabaseAdmin
          .from('services')
          .select('*')
          .order('sort_order', { ascending: true });

        if (featured === 'true') {
          query = query.eq('is_featured', true).limit(3);
        }

        const { data: services, error } = await query;

        if (!error && services && services.length > 0) {
          return NextResponse.json({ 
            services,
            source: 'database'
          });
        }
      } catch (supabaseError) {
        // Supabase error, fall back to other sources
      }
    }

    // Try to get services from CMS
    try {
      const cmsServices = await getAllServices();
      if (cmsServices.length > 0) {
        const formattedServices = cmsServices.map((service: any) => ({
          id: service.slug,
          slug: service.slug,
          name: service.title || service.name,
          description: service.description,
          short_description: service.shortDescription || service.excerpt,
          price_range: service.priceRange,
          features: service.features || [],
          category: service.category,
          is_featured: service.featured || false,
          sort_order: service.order || 0,
          created_at: service.date || new Date().toISOString(),
          updated_at: service.date || new Date().toISOString(),
        }));

        let filteredServices = formattedServices;
        if (featured === 'true') {
          filteredServices = formattedServices.filter(s => s.is_featured).slice(0, 3);
        }

        return NextResponse.json({ 
          services: filteredServices,
          source: 'cms'
        });
      }
    } catch (cmsError) {
      // CMS error, fall back to mock data
    }

    // Return services data that matches database
    const mockServices = [
      {
        id: 'web-development',
        slug: 'web-development',
        name: 'Web Development',
        description: 'Custom websites and web applications built with modern technologies for optimal performance and user experience.',
        short_description: 'Custom websites and web apps',
        price_range: '3k-10k',
        features: ['Responsive Design', 'SEO Optimization', 'Performance Optimized', 'Mobile-First', 'Analytics Integration'],
        category: 'development',
        is_featured: true,
        sort_order: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 'digital-marketing',
        slug: 'digital-marketing',
        name: 'Digital Marketing',
        description: 'Comprehensive digital marketing strategies including SEO, social media, content marketing, and paid advertising.',
        short_description: 'Complete digital marketing solutions',
        price_range: '1k-5k',
        features: ['SEO Strategy', 'Social Media Management', 'Content Creation', 'PPC Advertising', 'Analytics Reporting'],
        category: 'marketing',
        is_featured: true,
        sort_order: 2,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 'brand-identity',
        slug: 'brand-identity',
        name: 'Brand Identity',
        description: 'Complete brand identity design including logos, color schemes, typography, and brand guidelines.',
        short_description: 'Professional brand identity design',
        price_range: '1k-3k',
        features: ['Logo Design', 'Brand Guidelines', 'Color Palette', 'Typography', 'Business Cards'],
        category: 'design',
        is_featured: true,
        sort_order: 3,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 'photography',
        slug: 'photography',
        name: 'Photography',
        description: 'Professional photography services for events, corporate, product, and portrait photography.',
        short_description: 'Professional photography services',
        price_range: 'under-1k',
        features: ['Event Photography', 'Corporate Headshots', 'Product Photography', 'Portrait Sessions', 'Photo Editing'],
        category: 'media',
        is_featured: false,
        sort_order: 4,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 'video-production',
        slug: 'video-production',
        name: 'Video Production',
        description: 'Complete video production services from concept to final delivery for marketing and promotional content.',
        short_description: 'Professional video production',
        price_range: '3k-10k',
        features: ['Script Writing', 'Video Shooting', 'Post-Production', 'Motion Graphics', 'YouTube Optimization'],
        category: 'media',
        is_featured: false,
        sort_order: 5,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 'content-strategy',
        slug: 'content-strategy',
        name: 'Content Strategy',
        description: 'Strategic content planning and creation for blogs, social media, and marketing campaigns.',
        short_description: 'Strategic content planning',
        price_range: '1k-3k',
        features: ['Content Planning', 'Blog Writing', 'Social Media Content', 'Email Campaigns', 'Content Calendar'],
        category: 'marketing',
        is_featured: false,
        sort_order: 6,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    ];

    let filteredServices = mockServices;
    if (featured === 'true') {
      filteredServices = mockServices.filter(s => s.is_featured).slice(0, 3);
    }

    return NextResponse.json({ 
      services: filteredServices,
      source: 'mock'
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}
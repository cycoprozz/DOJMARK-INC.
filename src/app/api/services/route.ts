import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { getAllServices } from '@/lib/cms';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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

    // Return enhanced mock data as fallback
    const mockServices = [
      {
        id: 'web-development',
        slug: 'web-development',
        name: 'Web Development',
        description: 'Custom websites and web applications built with modern technologies for optimal performance and user experience.',
        short_description: 'Custom websites & web apps',
        price_range: '$3,000 - $15,000',
        features: ['Responsive Design', 'Modern Tech Stack', 'SEO Optimized', 'Performance Focused', 'CMS Integration', 'Analytics Setup'],
        category: 'development',
        is_featured: true,
        sort_order: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 'brand-identity',
        slug: 'brand-identity',
        name: 'Brand Identity',
        description: 'Complete brand identity packages including logo design, color palettes, typography, and brand guidelines.',
        short_description: 'Logo design & brand guidelines',
        price_range: '$1,500 - $5,000',
        features: ['Logo Design', 'Brand Guidelines', 'Color Palette', 'Typography', 'Business Cards', 'Brand Assets'],
        category: 'design',
        is_featured: true,
        sort_order: 2,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 'content-creation',
        slug: 'content-creation',
        name: 'Content Creation',
        description: 'Strategic content creation for social media, blogs, and marketing materials that engage your audience.',
        short_description: 'Social media & marketing content',
        price_range: '$800 - $3,000/month',
        features: ['Social Media Posts', 'Blog Writing', 'Marketing Copy', 'Content Strategy', 'Brand Voice', 'Content Calendar'],
        category: 'marketing',
        is_featured: true,
        sort_order: 3,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 'photography',
        slug: 'photography',
        name: 'Photography',
        description: 'Professional photography services for events, products, portraits, and commercial use.',
        short_description: 'Event, product & commercial photography',
        price_range: '$500 - $3,000/session',
        features: ['Event Photography', 'Product Photography', 'Portrait Sessions', 'Commercial Photography', 'Photo Editing', 'High-Resolution Delivery'],
        category: 'media',
        is_featured: false,
        sort_order: 4,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 'videography',
        slug: 'videography',
        name: 'Videography',
        description: 'High-quality video production for marketing, events, and promotional content.',
        short_description: 'Marketing & promotional videos',
        price_range: '$1,000 - $5,000/project',
        features: ['Marketing Videos', 'Event Coverage', 'Promotional Content', 'Video Editing', 'Motion Graphics', '4K Quality'],
        category: 'media',
        is_featured: false,
        sort_order: 5,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 'digital-strategy',
        slug: 'digital-strategy',
        name: 'Digital Strategy',
        description: 'Comprehensive digital marketing strategy and consulting to grow your online presence.',
        short_description: 'Marketing strategy & consulting',
        price_range: '$2,000 - $8,000',
        features: ['Market Analysis', 'Strategy Development', 'Competitor Research', 'Growth Planning', 'Performance Metrics', 'Ongoing Consulting'],
        category: 'consulting',
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
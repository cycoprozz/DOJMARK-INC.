import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { getAllBlogPosts, getBlogPost, getFeaturedBlogPosts } from '@/lib/cms';

export const dynamic = 'force-static';
export const revalidate = false;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');

    // Try to get content from CMS first
    try {
      if (slug) {
        const post = await getBlogPost(slug);
        if (post) return NextResponse.json(post);
      }
      
      if (featured === 'true') {
        const featuredPosts = await getFeaturedBlogPosts(limit ? parseInt(limit) : 3);
        return NextResponse.json(featuredPosts);
      }
      
      const allPosts = await getAllBlogPosts();
      const limitedPosts = limit ? allPosts.slice(0, parseInt(limit)) : allPosts;
      return NextResponse.json(limitedPosts);
      
    } catch (cmsError) {
      console.warn('CMS not available, falling back to database/mock data');
    }

    // If Supabase is not configured, return mock data
    if (!isSupabaseConfigured()) {
      const mockBlogPosts = [
        {
          id: '1',
          title: 'The Power of Authentic Brand Storytelling for Black-Owned Businesses',
          slug: 'authentic-brand-storytelling',
          excerpt: 'Discover how authentic storytelling can differentiate your brand.',
          content: '',
          author_id: '1',
          published: true,
          published_at: '2024-01-15T00:00:00Z',
          created_at: '2024-01-15T00:00:00Z',
          profiles: {
            full_name: 'Marcus Johnson',
            avatar_url: null
          }
        }
      ];
      
      if (slug) {
        const post = mockBlogPosts.find(p => p.slug === slug);
        return NextResponse.json(post || null);
      }
      
      return NextResponse.json(mockBlogPosts);
    }
    
    if (slug) {
      // Get single blog post by slug
      const supabaseAdmin = getSupabaseAdmin();
      const { data, error } = await supabaseAdmin
        .from('blog_posts')
        .select(`
          *,
          profiles:author_id (full_name, avatar_url)
        `)
        .eq('slug', slug)
        .eq('published', true)
        .single();

      if (error) {
        throw error;
      }

      return NextResponse.json(data);
    }

    // Get all blog posts  
    const supabaseAdmin = getSupabaseAdmin();
    let query = supabaseAdmin
      .from('blog_posts')
      .select(`
        *,
        profiles:author_id (full_name, avatar_url)
      `)
      .eq('published', true)
      .order('published_at', { ascending: false })
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
    // Error fetching blog posts
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}
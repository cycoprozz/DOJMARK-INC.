import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');
    
    if (slug) {
      // Get single blog post by slug
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
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}
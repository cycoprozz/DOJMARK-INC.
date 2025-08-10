import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    // Validate environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({
        error: 'Authentication service not configured'
      }, { status: 500 });
    }

    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false
      }
    });

    // Get session from cookies
    const cookieStore = await cookies();
    const supabaseAccessToken = cookieStore.get('sb-access-token')?.value;
    const supabaseRefreshToken = cookieStore.get('sb-refresh-token')?.value;

    if (!supabaseAccessToken) {
      return NextResponse.json({
        error: 'Authentication required'
      }, { status: 401 });
    }

    // Set session manually
    const { data: { session }, error: sessionError } = await supabase.auth.setSession({
      access_token: supabaseAccessToken,
      refresh_token: supabaseRefreshToken || ''
    });

    if (sessionError || !session) {
      return NextResponse.json({
        error: 'Invalid session'
      }, { status: 401 });
    }

    // Get user ID
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({
        error: 'User not found'
      }, { status: 401 });
    }

    // Get URL parameters for pagination
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    // Fetch user's projects (RLS will enforce user_id = auth.uid())
    const { data: projects, error: projectsError, count } = await supabase
      .from('projects')
      .select(`
        id,
        title,
        description,
        status,
        service_type,
        budget_range,
        timeline,
        created_at,
        updated_at,
        deliverables (
          id,
          title,
          status,
          due_date
        )
      `, { count: 'exact' })
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (projectsError) {
      console.error('Projects fetch error:', projectsError);
      return NextResponse.json({
        error: 'Failed to fetch projects'
      }, { status: 500 });
    }

    // Calculate pagination info
    const totalPages = count ? Math.ceil(count / limit) : 0;
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return NextResponse.json({
      projects: projects || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages,
        hasNextPage,
        hasPrevPage
      }
    });

  } catch (error: any) {
    console.error('Projects API error:', error);
    
    return NextResponse.json({
      error: 'Internal server error'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Validate environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({
        error: 'Authentication service not configured'
      }, { status: 500 });
    }

    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false
      }
    });

    // Get session from cookies
    const cookieStore = await cookies();
    const supabaseAccessToken = cookieStore.get('sb-access-token')?.value;
    const supabaseRefreshToken = cookieStore.get('sb-refresh-token')?.value;

    if (!supabaseAccessToken) {
      return NextResponse.json({
        error: 'Authentication required'
      }, { status: 401 });
    }

    // Set session manually
    const { data: { session }, error: sessionError } = await supabase.auth.setSession({
      access_token: supabaseAccessToken,
      refresh_token: supabaseRefreshToken || ''
    });

    if (sessionError || !session) {
      return NextResponse.json({
        error: 'Invalid session'
      }, { status: 401 });
    }

    // Get user ID
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({
        error: 'User not found'
      }, { status: 401 });
    }

    // Parse request body
    const body = await request.json();
    const { title, description, service_type, budget_range, timeline } = body;

    // Validate required fields
    if (!title || !service_type) {
      return NextResponse.json({
        error: 'Title and service type are required'
      }, { status: 400 });
    }

    // Create new project
    const { data: project, error: createError } = await supabase
      .from('projects')
      .insert({
        user_id: user.id,
        title,
        description,
        service_type,
        budget_range,
        timeline,
        status: 'pending'
      })
      .select()
      .single();

    if (createError) {
      console.error('Project creation error:', createError);
      return NextResponse.json({
        error: 'Failed to create project'
      }, { status: 500 });
    }

    return NextResponse.json({
      project
    }, { status: 201 });

  } catch (error: any) {
    console.error('Project creation API error:', error);
    
    return NextResponse.json({
      error: 'Internal server error'
    }, { status: 500 });
  }
}

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
        error: 'No session found'
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

    // Get user profile
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({
        error: 'User not found'
      }, { status: 401 });
    }

    // Return minimal user profile
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        email_confirmed_at: user.email_confirmed_at,
        created_at: user.created_at,
        updated_at: user.updated_at
      },
      session: {
        expires_at: session.expires_at,
        refresh_token: session.refresh_token ? 'present' : 'missing'
      }
    });

  } catch (error: any) {
    console.error('Session check failed:', error);
    
    return NextResponse.json({
      error: 'Session check failed'
    }, { status: 500 });
  }
}

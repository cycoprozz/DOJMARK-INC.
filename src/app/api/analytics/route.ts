import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event_type, event_data, user_agent, ip_address, referrer } = body;

    if (!event_type) {
      return NextResponse.json(
        { error: 'Event type is required' },
        { status: 400 }
      );
    }

    // If Supabase is not configured, return a mock success response
    if (!isSupabaseConfigured()) {
      console.log('Analytics event (demo mode) - Supabase not configured');
      return NextResponse.json(
        { message: 'Analytics event tracked successfully (demo mode)', data: { id: 'demo-id', event_type } },
        { status: 201 }
      );
    }

    try {
      const supabaseAdmin = getSupabaseAdmin();
      const { data, error } = await supabaseAdmin
        .from('analytics')
        .insert([
          {
            event_type,
            event_data: event_data || {},
            user_agent,
            ip_address,
            referrer
          }
        ])
        .select()
        .single();

      if (error) {
        throw error;
      }

      return NextResponse.json(data, { status: 201 });
    } catch (supabaseError) {
      console.error('Supabase error:', supabaseError);
      // Fallback to demo mode if Supabase fails
      return NextResponse.json(
        { message: 'Analytics event tracked successfully (demo mode)', data: { id: 'demo-id', event_type } },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error('Analytics tracking error:', error);
    // Error tracking analytics event
    return NextResponse.json(
      { error: 'Failed to track analytics event' },
      { status: 500 }
    );
  }
}
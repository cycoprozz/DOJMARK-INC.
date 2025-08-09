import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

export const dynamic = 'force-static';
export const revalidate = false;

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
      // Analytics event (demo mode)
      return NextResponse.json(
        { message: 'Analytics event tracked successfully (demo mode)', data: { id: 'demo-id', event_type } },
        { status: 201 }
      );
    }

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
  } catch (error) {
    // Error tracking analytics event
    return NextResponse.json(
      { error: 'Failed to track analytics event' },
      { status: 500 }
    );
  }
}
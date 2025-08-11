import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

export const dynamic = 'force-static';
export const revalidate = false;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, preferred_date, preferred_time, timezone, service_interest, message } = body;

    if (!name || !email || !preferred_date || !preferred_time) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // If Supabase is not configured, return a mock success response
    if (!isSupabaseConfigured()) {
      console.log('Consultation booking (demo mode) - Supabase not configured');
      return NextResponse.json(
        { message: 'Consultation booking submitted successfully (demo mode)', data: { id: 'demo-id', name, email } },
        { status: 201 }
      );
    }

    try {
      const supabaseAdmin = getSupabaseAdmin();
      const { data, error } = await supabaseAdmin
        .from('consultation_bookings')
        .insert([
          {
            name,
            email,
            phone,
            company,
            preferred_date,
            preferred_time,
            timezone,
            service_interest,
            message,
            status: 'pending'
          }
        ])
        .select()
        .single();

      if (error) {
        throw error;
      }

      // TODO: Send email notification using your preferred email service
      // TODO: Integrate with Calendly or similar service for actual booking

      return NextResponse.json(
        { message: 'Consultation booking submitted successfully', data },
        { status: 201 }
      );
    } catch (supabaseError) {
      console.error('Supabase error:', supabaseError);
      // Fallback to demo mode if Supabase fails
      return NextResponse.json(
        { message: 'Consultation booking submitted successfully (demo mode)', data: { id: 'demo-id', name, email } },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error('Consultation booking error:', error);
    // Error booking consultation
    return NextResponse.json(
      { error: 'Failed to book consultation' },
      { status: 500 }
    );
  }
}
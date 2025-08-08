import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

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
  } catch (error) {
    console.error('Error booking consultation:', error);
    return NextResponse.json(
      { error: 'Failed to book consultation' },
      { status: 500 }
    );
  }
}
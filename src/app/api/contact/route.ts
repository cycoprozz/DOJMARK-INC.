import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

export const dynamic = 'force-static';
export const revalidate = false;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, service_interest, budget, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // If Supabase is not configured, return a mock success response
    if (!isSupabaseConfigured()) {
      // Contact form submission (demo mode)
      return NextResponse.json(
        { message: 'Contact form submitted successfully (demo mode)', data: { id: 'demo-id', name, email } },
        { status: 201 }
      );
    }

    const supabaseAdmin = getSupabaseAdmin();
    const { data, error } = await supabaseAdmin
      .from('contact_submissions')
      .insert([
        {
          name,
          email,
          phone,
          company,
          service_interest,
          budget,
          message,
          status: 'new'
        }
      ])
      .select()
      .single();

    if (error) {
      throw error;
    }

    // TODO: Send email notification using your preferred email service
    // For example: SendGrid, Resend, or AWS SES

    return NextResponse.json(
      { message: 'Contact form submitted successfully', data },
      { status: 201 }
    );
  } catch (error) {
    // Error submitting contact form
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    );
  }
}
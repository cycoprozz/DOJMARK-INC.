import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

export const dynamic = 'force-static';
export const revalidate = false;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // If Supabase is not configured, return a mock success response
    if (!isSupabaseConfigured()) {
      // Newsletter subscription (demo mode)
      return NextResponse.json(
        { message: 'Subscription successful (demo mode)', data: { id: 'demo-id', email, name } },
        { status: 201 }
      );
    }

    // Check if email already exists
    const supabaseAdmin = getSupabaseAdmin();
    const { data: existingSubscription } = await supabaseAdmin
      .from('newsletter_subscriptions')
      .select('id, status')
      .eq('email', email)
      .single();

    if (existingSubscription) {
      if (existingSubscription.status === 'active') {
        return NextResponse.json(
          { message: 'Email already subscribed' },
          { status: 200 }
        );
      } else {
        // Reactivate subscription
        const { data, error } = await supabaseAdmin
          .from('newsletter_subscriptions')
          .update({ status: 'active' })
          .eq('id', existingSubscription.id)
          .select()
          .single();

        if (error) {
          throw error;
        }

        return NextResponse.json(
          { message: 'Subscription reactivated successfully', data },
          { status: 200 }
        );
      }
    }

    // Create new subscription
    const { data, error } = await supabaseAdmin
      .from('newsletter_subscriptions')
      .insert([
        {
          email,
          name,
          status: 'active'
        }
      ])
      .select()
      .single();

    if (error) {
      throw error;
    }

    // TODO: Integrate with Mailchimp, ConvertKit, or other email service
    // TODO: Send welcome email

    return NextResponse.json(
      { message: 'Subscription successful', data },
      { status: 201 }
    );
  } catch (error) {
    // Error subscribing to newsletter
    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const supabaseAdmin = getSupabaseAdmin();
    const { data, error } = await supabaseAdmin
      .from('newsletter_subscriptions')
      .update({ status: 'unsubscribed' })
      .eq('email', email)
      .select()
      .single();

    if (error) {
      throw error;
    }

    // TODO: Remove from Mailchimp, ConvertKit, or other email service

    return NextResponse.json(
      { message: 'Unsubscribed successfully', data },
      { status: 200 }
    );
  } catch (error) {
    // Error unsubscribing from newsletter
    return NextResponse.json(
      { error: 'Failed to unsubscribe from newsletter' },
      { status: 500 }
    );
  }
}
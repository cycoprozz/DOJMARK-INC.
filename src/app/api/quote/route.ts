import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { QuoteFormSchema } from '@/lib/validation';
import { z } from 'zod';

export const dynamic = 'force-static';
export const revalidate = false;

// Define the request body schema
const QuoteRequestSchema = QuoteFormSchema.extend({
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request data
    const validationResult = QuoteRequestSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          ok: false, 
          error: 'Validation failed',
          details: validationResult.error.flatten()
        },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;
    
    // Get client IP for tracking
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // If Supabase is configured, save to database
    if (isSupabaseConfigured()) {
      try {
        const supabaseAdmin = getSupabaseAdmin();
        
        // Start a transaction-like operation
        // First, upsert the lead (find existing by email or create new)
        const { data: existingLead, error: leadSearchError } = await supabaseAdmin
          .from('leads')
          .select('id')
          .eq('email', validatedData.email)
          .maybeSingle();

        let leadId: string;

        if (existingLead) {
          // Update existing lead
          const { data: updatedLead, error: updateError } = await supabaseAdmin
            .from('leads')
            .update({
              full_name: validatedData.full_name,
              phone: validatedData.phone || null,
              company: validatedData.company || null,
              source: validatedData.source,
              utm_source: validatedData.utm_source || null,
              utm_medium: validatedData.utm_medium || null,
              utm_campaign: validatedData.utm_campaign || null,
              ip_address: ip,
              user_agent: userAgent,
              updated_at: new Date().toISOString(),
            })
            .eq('id', existingLead.id)
            .select('id')
            .single();

          if (updateError) throw updateError;
          leadId = updatedLead.id;
        } else {
          // Create new lead
          const { data: newLead, error: createError } = await supabaseAdmin
            .from('leads')
            .insert({
              full_name: validatedData.full_name,
              email: validatedData.email,
              phone: validatedData.phone || null,
              company: validatedData.company || null,
              source: validatedData.source,
              utm_source: validatedData.utm_source || null,
              utm_medium: validatedData.utm_medium || null,
              utm_campaign: validatedData.utm_campaign || null,
              ip_address: ip,
              user_agent: userAgent,
            })
            .select('id')
            .single();

          if (createError) throw createError;
          leadId = newLead.id;
        }

        // Create the quote
        const { data: quote, error: quoteError } = await supabaseAdmin
          .from('quotes')
          .insert({
            lead_id: leadId,
            service_slug: validatedData.service,
            project_type: validatedData.project_type,
            budget_range: validatedData.budget_range,
            timeline: validatedData.timeline,
            scope_details: validatedData.scope_details,
            assets_ready: validatedData.assets_ready,
            ref_links: validatedData.ref_links,
            source: validatedData.source,
            status: 'new',
            priority: getPriorityFromBudget(validatedData.budget_range),
          })
          .select('id')
          .single();

        if (quoteError) throw quoteError;

        // Trigger external integrations (CRM, email, etc.)
        await Promise.allSettled([
          // CRM integration
          syncToCRM(validatedData, leadId, quote.id),
          // Email notifications
          sendEmailNotifications(validatedData, quote.id),
          // Internal notifications (Slack, etc.)
          sendInternalNotifications(validatedData, quote.id),
        ]);

        return NextResponse.json({
          ok: true,
          quote_id: quote.id,
          lead_id: leadId,
          next: `/thank-you?qid=${quote.id}`,
          message: 'Quote request submitted successfully'
        });

      } catch (dbError) {
        // Database error, but still try to send notifications
        const mockQuoteId = `mock-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        // Send email notifications even if DB fails
        await Promise.allSettled([
          sendEmailNotifications(validatedData, mockQuoteId),
          sendInternalNotifications(validatedData, mockQuoteId),
        ]);

        return NextResponse.json({
          ok: true,
          quote_id: mockQuoteId,
          next: `/thank-you?qid=${mockQuoteId}`,
          message: 'Quote request submitted successfully (backup mode)',
          note: 'Request processed via backup system'
        });
      }
    } else {
      // Supabase not configured - use backup processing
      const mockQuoteId = `demo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      // Send email notifications
      await Promise.allSettled([
        sendEmailNotifications(validatedData, mockQuoteId),
        sendInternalNotifications(validatedData, mockQuoteId),
      ]);

      return NextResponse.json({
        ok: true,
        quote_id: mockQuoteId,
        next: `/thank-you?qid=${mockQuoteId}`,
        message: 'Quote request submitted successfully (demo mode)',
        note: 'Running in demo mode - contact will be processed manually'
      });
    }

  } catch (error) {
    console.error('Quote submission error:', error);
    
    return NextResponse.json(
      { 
        ok: false,
        error: 'Failed to process quote request',
        message: 'We encountered an issue processing your request. Please try again or contact us directly.'
      },
      { status: 500 }
    );
  }
}

// Helper function to determine priority based on budget
function getPriorityFromBudget(budgetRange: string): string {
  const priorities: { [key: string]: string } = {
    'under-1k': 'normal',
    '1k-3k': 'normal',
    '3k-5k': 'high',
    '5k-10k': 'high',
    '10k-plus': 'urgent',
  };
  return priorities[budgetRange] || 'normal';
}

// CRM Integration (placeholder - implement based on your CRM)
async function syncToCRM(data: any, leadId: string, quoteId: string) {
  try {
    // Example: HubSpot integration
    if (process.env.HUBSPOT_API_KEY) {
      const hubspotData = {
        properties: {
          email: data.email,
          firstname: data.full_name.split(' ')[0],
          lastname: data.full_name.split(' ').slice(1).join(' '),
          phone: data.phone,
          company: data.company,
          hs_lead_status: 'NEW',
          lead_source: data.source,
          project_type: data.project_type,
          budget_range: data.budget_range,
          timeline: data.timeline,
          project_details: data.scope_details,
        }
      };

      const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(hubspotData),
      });

      if (!response.ok) {
        throw new Error(`HubSpot API error: ${response.statusText}`);
      }
    }

    // Example: Pipedrive integration
    if (process.env.PIPEDRIVE_API_TOKEN) {
      // Implement Pipedrive contact and deal creation
    }

    return { success: true };
  } catch (error) {
    console.error('CRM sync error:', error);
    return { success: false, error };
  }
}

// Email Notifications
async function sendEmailNotifications(data: any, quoteId: string) {
  try {
    // Client confirmation email
    await sendClientConfirmationEmail(data, quoteId);
    
    // Internal notification email
    await sendInternalNotificationEmail(data, quoteId);
    
    return { success: true };
  } catch (error) {
    console.error('Email notification error:', error);
    return { success: false, error };
  }
}

async function sendClientConfirmationEmail(data: any, quoteId: string) {
  // Example: Using SendGrid
  if (process.env.SENDGRID_API_KEY) {
    const emailData = {
      to: data.email,
      from: process.env.FROM_EMAIL || 'hello@dojmark.com',
      subject: 'Quote Request Received - DOJMARK',
      html: generateClientEmailTemplate(data, quoteId),
    };

    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      throw new Error(`SendGrid API error: ${response.statusText}`);
    }
  }
}

async function sendInternalNotificationEmail(data: any, quoteId: string) {
  // Internal team notification
  if (process.env.SENDGRID_API_KEY && process.env.INTERNAL_EMAIL) {
    const emailData = {
      to: process.env.INTERNAL_EMAIL,
      from: process.env.FROM_EMAIL || 'hello@dojmark.com',
      subject: `New Quote Request: ${data.service} - ${data.budget_range}`,
      html: generateInternalEmailTemplate(data, quoteId),
    };

    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      throw new Error(`SendGrid API error: ${response.statusText}`);
    }
  }
}

// Internal Notifications (Slack, Discord, etc.)
async function sendInternalNotifications(data: any, quoteId: string) {
  try {
    // Slack webhook
    if (process.env.SLACK_WEBHOOK_URL) {
      const slackMessage = {
        text: `🎯 New Quote Request`,
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `*New Quote Request Received*\n\n*Service:* ${data.service}\n*Budget:* ${data.budget_range}\n*Timeline:* ${data.timeline}\n*Client:* ${data.full_name} (${data.email})\n*Company:* ${data.company || 'Not specified'}`
            }
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `*Project Details:*\n${data.scope_details.substring(0, 200)}${data.scope_details.length > 200 ? '...' : ''}`
            }
          },
          {
            type: 'actions',
            elements: [
              {
                type: 'button',
                text: {
                  type: 'plain_text',
                  text: 'View Quote'
                },
                url: `${process.env.NEXT_PUBLIC_SITE_URL}/admin/quotes/${quoteId}`
              }
            ]
          }
        ]
      };

      await fetch(process.env.SLACK_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slackMessage),
      });
    }

    return { success: true };
  } catch (error) {
    console.error('Internal notification error:', error);
    return { success: false, error };
  }
}

// Email Templates
function generateClientEmailTemplate(data: any, quoteId: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quote Request Received</title>
</head>
<body style="font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #0F2C55 0%, #F46A25 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">Thank You, ${data.full_name}!</h1>
    <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 16px;">Your quote request has been received</p>
  </div>
  
  <div style="background: white; padding: 40px 30px; border: 1px solid #e1e5e9; border-radius: 0 0 10px 10px;">
    <h2 style="color: #0F2C55; margin-top: 0;">What's Next?</h2>
    
    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3 style="margin: 0 0 10px; color: #0F2C55;">Your Request Details:</h3>
      <p style="margin: 5px 0;"><strong>Service:</strong> ${data.service}</p>
      <p style="margin: 5px 0;"><strong>Project Type:</strong> ${data.project_type}</p>
      <p style="margin: 5px 0;"><strong>Budget Range:</strong> ${data.budget_range}</p>
      <p style="margin: 5px 0;"><strong>Timeline:</strong> ${data.timeline}</p>
      <p style="margin: 5px 0;"><strong>Quote ID:</strong> ${quoteId}</p>
    </div>
    
    <ol style="color: #666; padding-left: 20px;">
      <li style="margin: 10px 0;"><strong>Review (24 hours):</strong> Our team will review your project requirements</li>
      <li style="margin: 10px 0;"><strong>Proposal (2-3 days):</strong> We'll prepare a detailed proposal with timeline and pricing</li>
      <li style="margin: 10px 0;"><strong>Discovery Call:</strong> We'll schedule a call to discuss your project in detail</li>
    </ol>
    
    <div style="background: #e8f4fd; padding: 20px; border-radius: 8px; margin: 30px 0;">
      <h3 style="margin: 0 0 10px; color: #0F2C55;">💡 Pro Tip</h3>
      <p style="margin: 0; color: #666;">While you wait, check out our <a href="${process.env.NEXT_PUBLIC_SITE_URL}/portfolio" style="color: #F46A25;">recent work</a> and follow us on <a href="https://www.instagram.com/cycoprozz" style="color: #F46A25;">Instagram</a> for design inspiration!</p>
    </div>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="${process.env.NEXT_PUBLIC_SITE_URL}/contact" style="background: #F46A25; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600;">Contact Us</a>
    </div>
    
    <hr style="border: none; border-top: 1px solid #e1e5e9; margin: 30px 0;">
    
    <p style="color: #666; font-size: 14px; text-align: center; margin: 0;">
      DOJMARK - Empowering Black Excellence Through Digital Innovation<br>
      <a href="mailto:hello@dojmark.com" style="color: #F46A25;">hello@dojmark.com</a> | 
      <a href="${process.env.NEXT_PUBLIC_SITE_URL}" style="color: #F46A25;">dojmark.com</a>
    </p>
  </div>
</body>
</html>
  `;
}

function generateInternalEmailTemplate(data: any, quoteId: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Quote Request - ${data.service}</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h1 style="color: #0F2C55;">🎯 New Quote Request</h1>
  
  <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <h2 style="margin-top: 0;">Client Information</h2>
    <p><strong>Name:</strong> ${data.full_name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
    <p><strong>Company:</strong> ${data.company || 'Not provided'}</p>
  </div>
  
  <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <h2 style="margin-top: 0;">Project Details</h2>
    <p><strong>Service:</strong> ${data.service}</p>
    <p><strong>Project Type:</strong> ${data.project_type}</p>
    <p><strong>Budget Range:</strong> ${data.budget_range}</p>
    <p><strong>Timeline:</strong> ${data.timeline}</p>
    <p><strong>Assets Ready:</strong> ${data.assets_ready ? 'Yes' : 'No'}</p>
    <p><strong>Marketing Consent:</strong> ${data.consent_marketing ? 'Yes' : 'No'}</p>
  </div>
  
  <div style="background: #d4edda; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <h2 style="margin-top: 0;">Project Requirements</h2>
    <p>${data.scope_details}</p>
    
    ${data.ref_links && data.ref_links.length > 0 ? `
    <h3>Reference Links:</h3>
    <ul>
      ${data.ref_links.map((link: string) => `<li><a href="${link}" target="_blank">${link}</a></li>`).join('')}
    </ul>
    ` : ''}
  </div>
  
  <div style="background: #f8d7da; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <h2 style="margin-top: 0;">Next Steps</h2>
    <ol>
      <li>Review project requirements</li>
      <li>Research client and company</li>
      <li>Prepare initial proposal</li>
      <li>Schedule discovery call</li>
      <li>Send detailed quote within 2-3 business days</li>
    </ol>
  </div>
  
  <p style="text-align: center; margin: 30px 0;">
    <strong>Quote ID:</strong> ${quoteId}
  </p>
</body>
</html>
  `;
}

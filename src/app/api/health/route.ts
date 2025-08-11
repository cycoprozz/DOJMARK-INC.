import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

export async function GET() {
  try {
    // Check if Supabase is properly configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    // If not configured, return demo mode response
    if (!supabaseUrl || !serviceRoleKey || supabaseUrl === 'https://demo.supabase.co') {
      return NextResponse.json({ 
        ok: true, 
        time: new Date().toISOString(),
        mode: 'demo'
      });
    }
    
    const db = createClient(supabaseUrl, serviceRoleKey);
    const { error } = await db.from('projects').select('id').limit(1);
    if (error) throw error;
    return NextResponse.json({ 
      ok: true, 
      time: new Date().toISOString(),
      mode: 'production'
    });
  } catch (e: any) {
    return NextResponse.json({ 
      ok: false, 
      error: e.message,
      time: new Date().toISOString()
    }, { status: 500 });
  }
}

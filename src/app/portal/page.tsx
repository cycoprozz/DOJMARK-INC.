import { redirect } from 'next/navigation';
import { supabaseServer } from '@/lib/supabaseServer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PortalPage() {
  // Check if Supabase is properly configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  // If Supabase is not configured, redirect to login (demo mode)
  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'https://demo.supabase.co') {
    console.log('Supabase not configured, redirecting to login (demo mode)');
    redirect('/login?next=/portal');
  }
  
  const supabase = supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login?next=/portal');
  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="text-2xl font-semibold">Client Portal</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <section className="rounded-2xl border p-4">Projects</section>
        <section className="rounded-2xl border p-4">Messages</section>
      </div>
    </main>
  );
}

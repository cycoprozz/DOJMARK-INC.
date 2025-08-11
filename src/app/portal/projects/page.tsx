import { supabaseServer } from '@/lib/supabaseServer';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';
export default async function Projects() {
  const supabase = supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login?next=/portal/projects');
  const { data: projects } = await supabase.from('projects')
    .select('id,name,updated_at').order('updated_at', { ascending: false });
  return (
    <main className="mx-auto max-w-4xl p-6">
      <h2 className="text-xl font-semibold">Your Projects</h2>
      <ul className="mt-4 space-y-2">
        {(projects ?? []).map(p => (
          <li key={p.id} className="rounded-xl border p-3">{p.name}</li>
        ))}
      </ul>
    </main>
  );
}

import { redirect } from 'next/navigation';
import { supabaseServer } from '@/lib/supabaseServer';
import PortalDashboard from '@/components/PortalDashboard';

export default async function PortalPage() {
  const supabase = supabaseServer();
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    redirect('/portal/login?next=/portal');
  }

  return <PortalDashboard userId={user.id} />;
}

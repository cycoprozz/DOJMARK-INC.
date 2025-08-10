import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export const supabaseServer = () =>
  createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://demo.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'demo-key',
    { 
      cookies: { 
        get: async (name) => (await cookies()).get(name)?.value,
        set: async (name, value, options) => {
          (await cookies()).set(name, value, options);
        },
        remove: async (name, options) => {
          (await cookies()).set(name, '', { ...options, maxAge: 0 });
        },
      } 
    }
  );

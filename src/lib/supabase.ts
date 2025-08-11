import { createClient } from '@supabase/supabase-js'
import { env, isEnvironmentConfigured } from './env'

// Client for browser/frontend use
export const supabase = env.supabaseUrl && env.supabaseAnonKey 
  ? createClient(env.supabaseUrl, env.supabaseAnonKey)
  : null

// Admin client for server-side use (only create if service role key exists)
export const supabaseAdmin = env.supabaseUrl && env.supabaseServiceRoleKey 
  ? createClient(env.supabaseUrl, env.supabaseServiceRoleKey)
  : null

// Helper to check if Supabase is configured
export const isSupabaseConfigured = () => isEnvironmentConfigured()

// Type-safe Supabase admin client
export function getSupabaseAdmin() {
  if (!supabaseAdmin) {
    throw new Error('Supabase admin client is not configured. Missing SUPABASE_SERVICE_ROLE_KEY or invalid URL.');
  }
  return supabaseAdmin;
}
/**
 * Environment validation utility
 * Validates required environment variables at runtime
 */

export interface EnvironmentConfig {
  supabaseUrl: string;
  supabaseAnonKey: string;
  supabaseServiceRoleKey?: string;
  nodeEnv: string;
  isDevelopment: boolean;
  isProduction: boolean;
}

const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
] as const;

const optionalEnvVars = [
  'SUPABASE_SERVICE_ROLE_KEY',
  'DATABASE_URL',
] as const;

/**
 * Validates environment variables and returns configuration
 */
export function validateEnvironment(): EnvironmentConfig {
  const nodeEnv = process.env.NODE_ENV || 'development';
  const isDevelopment = nodeEnv === 'development';
  const isProduction = nodeEnv === 'production';

  // Check required environment variables
  const missingVars: string[] = [];
  
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar] || process.env[envVar] === `placeholder-${envVar.toLowerCase()}`) {
      missingVars.push(envVar);
    }
  }

  // Allow demo mode during builds and development
  // Only warn about missing vars in production builds
  if (isProduction && missingVars.length > 0) {
    console.warn(
      `⚠️  Missing environment variables (using demo mode): ${missingVars.join(', ')}`
    );
  }

  // In development, warn about missing vars
  if (isDevelopment && missingVars.length > 0) {
    console.warn(
      `⚠️  Missing environment variables (demo mode): ${missingVars.join(', ')}`
    );
  }

  // Use empty strings instead of placeholder URLs to prevent invalid URL errors
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  return {
    supabaseUrl,
    supabaseAnonKey,
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    nodeEnv,
    isDevelopment,
    isProduction,
  };
}

/**
 * Check if all required environment variables are properly configured
 */
export function isEnvironmentConfigured(): boolean {
  try {
    const config = validateEnvironment();
    return (
      config.supabaseUrl !== '' &&
      config.supabaseAnonKey !== '' &&
      config.supabaseUrl !== 'https://placeholder.supabase.co' &&
      config.supabaseAnonKey !== 'placeholder-anon-key'
    );
  } catch {
    return false;
  }
}

// Validate environment on module load
export const env = validateEnvironment();

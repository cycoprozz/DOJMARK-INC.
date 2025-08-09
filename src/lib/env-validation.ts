/**
 * Environment validation utility
 * Validates required environment variables at runtime with clear error messages
 */

export interface EnvironmentValidation {
  isValid: boolean;
  missingVars: string[];
  errors: string[];
}

const REQUIRED_ENV_VARS = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY'
] as const;

const OPTIONAL_ENV_VARS = [
  'SUPABASE_SERVICE_ROLE_KEY',
  'HUBSPOT_TOKEN',
  'SHOPIFY_STOREFRONT_TOKEN',
  'STRIPE_SECRET_KEY',
  'NEXT_PUBLIC_SITE_URL'
] as const;

/**
 * Validates that all required environment variables are present and properly formatted
 */
export function validateEnvironment(): EnvironmentValidation {
  const missingVars: string[] = [];
  const errors: string[] = [];

  // Check required environment variables
  for (const envVar of REQUIRED_ENV_VARS) {
    const value = process.env[envVar];
    
    if (!value || value.startsWith('placeholder-') || value === '') {
      missingVars.push(envVar);
    }
  }

  // Validate Supabase URL format
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (supabaseUrl && !supabaseUrl.includes('supabase.co')) {
    errors.push('NEXT_PUBLIC_SUPABASE_URL must be a valid Supabase URL');
  }

  // Validate Supabase key format
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (supabaseKey && !supabaseKey.startsWith('eyJ')) {
    errors.push('NEXT_PUBLIC_SUPABASE_ANON_KEY must be a valid JWT token');
  }

  return {
    isValid: missingVars.length === 0 && errors.length === 0,
    missingVars,
    errors
  };
}

/**
 * Validates environment on import and logs warnings in development
 */
export function initializeEnvironmentValidation(): void {
  const validation = validateEnvironment();
  
  if (!validation.isValid) {
    const isDevelopment = process.env.NODE_ENV === 'development';
    const isProduction = process.env.NODE_ENV === 'production';
    
    if (validation.missingVars.length > 0) {
      const message = `Missing required environment variables: ${validation.missingVars.join(', ')}`;
      
      if (isProduction) {
        console.error('🚨 PRODUCTION ERROR:', message);
      } else if (isDevelopment) {
        console.warn('⚠️  DEVELOPMENT WARNING:', message);
      }
    }
    
    if (validation.errors.length > 0) {
      validation.errors.forEach(error => {
        if (isProduction) {
          console.error('🚨 PRODUCTION ERROR:', error);
        } else if (isDevelopment) {
          console.warn('⚠️  DEVELOPMENT WARNING:', error);
        }
      });
    }
  }
}

/**
 * Checks if Supabase is properly configured
 */
export function isSupabaseConfigured(): boolean {
  const validation = validateEnvironment();
  return validation.isValid && 
         !!process.env.NEXT_PUBLIC_SUPABASE_URL && 
         !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
}

/**
 * Gets environment configuration with fallbacks
 */
export function getEnvironmentConfig() {
  return {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || (typeof window !== 'undefined' ? window.location.origin : ''),
    nodeEnv: process.env.NODE_ENV || 'development',
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production'
  };
}

// Initialize validation on module load
if (typeof window === 'undefined') {
  // Only run on server-side
  initializeEnvironmentValidation();
}

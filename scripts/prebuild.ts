#!/usr/bin/env tsx

/**
 * Prebuild script to validate environment variables
 * Ensures all required environment variables are valid absolute URLs
 */

function safeEnvUrl(envVar: string | undefined, name: string): string {
  if (!envVar) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  
  try {
    const url = new URL(envVar);
    if (!url.protocol || !url.hostname) {
      throw new Error(`Invalid URL format for ${name}: ${envVar}`);
    }
    return url.toString();
  } catch (error) {
    throw new Error(`Invalid URL for ${name}: ${envVar} - ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

function validateEnvironmentVariables() {
  console.log('🔍 Validating environment variables...');
  
  const requiredEnvVars = [
    'NEXT_PUBLIC_SITE_URL',
    'NEXT_PUBLIC_SUPABASE_URL',
  ];
  
  const optionalEnvVars = [
    'SUPABASE_SERVICE_ROLE_KEY',
    'SENTRY_DSN',
    'SLACK_WEBHOOK_URL',
    'SENDGRID_API_KEY',
    'HUBSPOT_API_KEY',
  ];
  
  // Validate required environment variables
  for (const envVar of requiredEnvVars) {
    const value = process.env[envVar];
    if (value) {
      try {
        const url = safeEnvUrl(value, envVar);
        console.log(`✅ ${envVar}: ${url}`);
      } catch (error) {
        console.error(`❌ ${envVar}: ${error instanceof Error ? error.message : 'Invalid URL'}`);
        process.exit(1);
      }
    } else {
      console.warn(`⚠️  ${envVar}: Not set (will use demo mode)`);
    }
  }
  
  // Validate optional environment variables
  for (const envVar of optionalEnvVars) {
    const value = process.env[envVar];
    if (value) {
      try {
        // For non-URL env vars, just check they're not empty
        if (envVar.includes('URL') || envVar.includes('DSN')) {
          const url = safeEnvUrl(value, envVar);
          console.log(`✅ ${envVar}: ${url}`);
        } else {
          console.log(`✅ ${envVar}: Set`);
        }
      } catch (error) {
        console.error(`❌ ${envVar}: ${error instanceof Error ? error.message : 'Invalid URL'}`);
        process.exit(1);
      }
    } else {
      console.log(`ℹ️  ${envVar}: Not set (optional)`);
    }
  }
  
  console.log('🎉 Environment validation completed successfully!');
}

// Run validation
validateEnvironmentVariables();

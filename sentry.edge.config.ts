import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  
  // Set sample rates for edge runtime
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.05 : 1.0,
  
  // Environment configuration
  environment: process.env.NODE_ENV,
  
  // Filter out sensitive information
  beforeSend(event) {
    // Don't send events in demo mode
    if (!process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN.includes('placeholder')) {
      return null;
    }
    
    return event;
  },
  
  // Tag releases
  release: process.env.VERCEL_GIT_COMMIT_SHA || 'development',
});

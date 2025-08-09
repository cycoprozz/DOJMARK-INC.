import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  
  // Set sample rates for server-side
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  
  // Environment configuration
  environment: process.env.NODE_ENV,
  
  // Filter out sensitive information
  beforeSend(event) {
    // Don't send events in demo mode
    if (!process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN.includes('placeholder')) {
      return null;
    }
    
    // Remove sensitive data from server errors
    if (event.request) {
      delete event.request.cookies;
      delete event.request.headers?.['authorization'];
      delete event.request.headers?.['cookie'];
    }
    
    return event;
  },
  
  // Tag releases
  release: process.env.VERCEL_GIT_COMMIT_SHA || 'development',
  
  // Server-specific integrations
  integrations: [
    // Add server-specific integrations here
  ],
});

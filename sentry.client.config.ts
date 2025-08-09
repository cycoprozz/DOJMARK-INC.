import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  
  // Set sample rates
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  
  // Capture Replay for Sessions
  replaysSessionSampleRate: process.env.NODE_ENV === 'production' ? 0.01 : 0.1,
  
  // Capture Replay for Errors
  replaysOnErrorSampleRate: 1.0,
  
  // Performance monitoring
  integrations: [
    // Replay integration if available
    ...(typeof window !== 'undefined' ? [] : [])
  ],
  
  // Environment configuration
  environment: process.env.NODE_ENV,
  
  // Filter out sensitive information
  beforeSend(event) {
    // Don't send events in demo mode
    if (!process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN.includes('placeholder')) {
      return null;
    }
    
    // Filter out demo/development noise
    if (event.exception) {
      const error = event.exception.values?.[0];
      if (error?.value?.includes('demo mode') || error?.value?.includes('placeholder')) {
        return null;
      }
    }
    
    return event;
  },
  
  // Tag releases
  release: process.env.VERCEL_GIT_COMMIT_SHA || 'development',
  
  // Performance configuration
  beforeSendTransaction(transaction) {
    // Don't track demo API calls
    if (transaction.transaction?.includes('/api/') && !process.env.NEXT_PUBLIC_SENTRY_DSN) {
      return null;
    }
    
    return transaction;
  },
});

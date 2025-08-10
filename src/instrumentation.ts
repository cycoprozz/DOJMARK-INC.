import * as Sentry from "@sentry/nextjs";

export async function register() {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 0.2,
    debug: false,
    environment: process.env.NODE_ENV,
    
    // Disable telemetry in development
    telemetry: process.env.NODE_ENV === 'production',
    
    // Configure integrations
    integrations: [
      // Add any specific integrations here if needed
    ],
    
    // Configure beforeSend to filter out certain errors
    beforeSend(event, hint) {
      // Don't send errors in development
      if (process.env.NODE_ENV === 'development') {
        return null;
      }
      return event;
    },
  });
}

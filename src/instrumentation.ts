import * as Sentry from "@sentry/nextjs";

export async function register() {
  Sentry.init({
    dsn: process.env.SENTRY_DSN || undefined,
    tracesSampleRate: 0.2,
    debug: false,
  });
  
  // Capture nested RSC/route errors
  globalThis.onRequestError = (e: unknown) => {
    Sentry.captureException(e);
  };
}

'use client';
import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { Sentry.captureException(error); }, [error]);
  return (
    <html><body className="grid min-h-dvh place-items-center p-6">
      <div className="rounded-2xl border p-6 bg-black/60 text-white">
        <h1 className="text-xl font-semibold">Something went wrong</h1>
        <button onClick={() => reset()} className="mt-4 rounded bg-white/10 px-4 py-2">Try again</button>
      </div>
    </body></html>
  );
}

'use client';
import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';
import Link from 'next/link';
import { ArrowLeft, RefreshCw } from 'lucide-react';

export default function PortalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { Sentry.captureException(error); }, [error]);
  return (
    <div className="grid min-h-dvh place-items-center p-6">
      <div className="rounded-2xl border p-6 bg-black/60 text-white max-w-md text-center">
        <div className="text-4xl mb-4">⚠️</div>
        <h1 className="text-xl font-semibold mb-2">Portal Error</h1>
        <p className="text-sm text-gray-300 mb-6">
          We encountered an issue loading your portal dashboard. This might be a temporary problem.
        </p>
        <div className="flex gap-3 justify-center mb-4">
          <button onClick={reset} className="flex items-center gap-2 rounded bg-white/10 px-4 py-2 text-sm">
            <RefreshCw className="w-4 h-4" />
            Try again
          </button>
          <Link href="/portal/login" className="flex items-center gap-2 rounded bg-white/10 px-4 py-2 text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to login
          </Link>
        </div>
        <Link href="/" className="text-sm text-gray-400 hover:text-white">
          Return to homepage
        </Link>
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-4 text-left">
            <summary className="cursor-pointer text-sm text-gray-400">Error details (development only)</summary>
            <pre className="mt-2 text-xs bg-black/20 p-2 rounded overflow-auto">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

interface AuthState {
  isAuthenticated: boolean | null;
  isLoading: boolean;
  error: string | null;
  hasTimedOut: boolean;
}

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: null,
    isLoading: true,
    error: null,
    hasTimedOut: false
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let isAborted = false;

    const checkAuth = async () => {
      try {
        console.log('🔍 Starting auth check...');
        
        // Validate environment variables first
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseKey) {
          console.error('❌ Missing Supabase environment variables');
          throw new Error('Authentication service not configured');
        }

        // Create Supabase client
        const supabase = createClient(supabaseUrl, supabaseKey);
        
        // Check authentication status with timeout
        console.log('🔐 Checking session...');
        const { data: { session }, error } = await supabase.auth.getSession();

        if (isAborted) return; // Component unmounted

        if (error) {
          console.error('❌ Session check error:', error);
          throw error;
        }

        const isAuthenticated = !!session;
        console.log('✅ Auth check complete:', { isAuthenticated, userId: session?.user?.id });

        // If not authenticated and not on login page, redirect
        if (!isAuthenticated && pathname !== '/portal/login' && pathname !== '/portal/signup' && pathname !== '/portal/reset') {
          console.log('🔄 Redirecting to login...');
          router.replace('/portal/login');
          return;
        }

        setAuthState({
          isAuthenticated,
          isLoading: false,
          error: null,
          hasTimedOut: false
        });

      } catch (error: any) {
        console.error('❌ Auth check failed:', error);
        
        if (isAborted) return;

        setAuthState({
          isAuthenticated: false,
          isLoading: false,
          error: error.message || 'Authentication failed',
          hasTimedOut: false
        });

        // Redirect to login on auth failure (unless already on auth pages)
        if (pathname !== '/portal/login' && pathname !== '/portal/signup' && pathname !== '/portal/reset') {
          router.replace('/portal/login');
        }
      }
    };

    // Set up timeout to prevent infinite loading (reduced to 6 seconds)
    timeoutId = setTimeout(() => {
      if (!isAborted) {
        console.warn('⏰ Auth check timed out after 6 seconds');
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          hasTimedOut: true,
          error: 'Authentication check timed out'
        }));

        // Redirect to login on timeout
        if (pathname !== '/portal/login') {
          router.replace('/portal/login');
        }
      }
    }, 6000); // 6 second timeout

    checkAuth();

    // Cleanup function
    return () => {
      isAborted = true;
      clearTimeout(timeoutId);
    };
  }, [pathname, router]);

  // Always render login page directly
  if (pathname === '/portal/login' || pathname === '/portal/signup' || pathname === '/portal/reset') {
    return <>{children}</>;
  }

  // Show loading while checking auth (with timeout protection)
  if (authState.isLoading && !authState.hasTimedOut) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0F2C55 0%, #1E2026 50%, #0a1f3d 100%)'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '20px',
          padding: '40px',
          textAlign: 'center',
          maxWidth: '400px'
        }}>
          <img 
            src="/dojmark-logo.svg" 
            alt="DOJMARK" 
            style={{
              height: '60px',
              width: 'auto',
              filter: 'brightness(0) invert(1) drop-shadow(0 0 20px rgba(255, 255, 255, 0.5))',
              marginBottom: '20px'
            }}
          />
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid rgba(255, 255, 255, 0.3)',
            borderTop: '3px solid #F46A25',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '20px auto'
          }} />
          <p style={{
            color: '#ffffff',
            fontSize: '16px',
            fontFamily: 'Inter, sans-serif',
            margin: '10px 0 0'
          }}>
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

  // Show error state if authentication failed or timed out
  if (authState.error || authState.hasTimedOut) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0F2C55 0%, #1E2026 50%, #0a1f3d 100%)'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '20px',
          padding: '40px',
          textAlign: 'center',
          maxWidth: '400px'
        }}>
          <img 
            src="/dojmark-logo.svg" 
            alt="DOJMARK" 
            style={{
              height: '60px',
              width: 'auto',
              filter: 'brightness(0) invert(1) drop-shadow(0 0 20px rgba(255, 255, 255, 0.5))',
              marginBottom: '20px'
            }}
          />
          <p style={{
            color: '#EF4444',
            fontSize: '16px',
            fontFamily: 'Inter, sans-serif',
            marginBottom: '20px'
          }}>
            {authState.hasTimedOut ? 'Connection timeout' : 'Authentication error'}
          </p>
          <p style={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '14px',
            fontFamily: 'Inter, sans-serif',
            marginBottom: '20px'
          }}>
            {authState.error || 'Please try again or contact support.'}
          </p>
          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => window.location.reload()}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                padding: '12px 20px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              Retry
            </button>
            <button
              onClick={() => router.replace('/portal/login')}
              style={{
                background: '#F46A25',
                color: 'white',
                border: 'none',
                padding: '12px 20px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#E55A1F';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#F46A25';
              }}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render children only if authenticated
  return <>{children}</>;
}

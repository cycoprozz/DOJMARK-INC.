'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check authentication status
    const checkAuth = async () => {
      try {
        // TODO: Replace with actual Supabase auth check
        // const { data: { session } } = await supabase.auth.getSession();
        
        // For now, simulate auth check
        let mockSession: string | null = null;
        if (typeof window !== 'undefined') {
          mockSession = localStorage.getItem('dojmark-session');
        }
        
        if (!mockSession && pathname !== '/portal/login') {
          router.replace('/portal/login');
          return;
        }
        
        setIsAuthenticated(!!mockSession);
      } catch (error) {
        // Auth check failed - redirect to login
        if (pathname !== '/portal/login') {
          router.replace('/portal/login');
        }
      }
    };

    checkAuth();
  }, [pathname, router]);

  // Show loading while checking auth
  if (isAuthenticated === null && pathname !== '/portal/login') {
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
          textAlign: 'center'
        }}>
          <img 
            src="/dojmark-main-logo.png" 
            alt="DOJMARK" 
            style={{
              height: '60px',
              width: 'auto',
              filter: 'brightness(0) invert(1) drop-shadow(0 0 20px rgba(255, 255, 255, 0.5))',
              marginBottom: '20px'
            }}
          />
          <p style={{
            color: '#ffffff',
            fontSize: '16px',
            fontFamily: 'Inter, sans-serif'
          }}>
            Loading portal...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

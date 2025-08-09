'use client';

import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import * as Sentry from '@sentry/nextjs';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; retry: () => void }>;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ error, errorInfo });
    
    // Log error to Sentry
    Sentry.withScope((scope) => {
      scope.setTag('errorBoundary', true);
      scope.setContext('errorInfo', {
        componentStack: errorInfo.componentStack,
      });
      scope.setLevel('error');
      Sentry.captureException(error);
    });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      const { fallback: Fallback } = this.props;
      
      if (Fallback && this.state.error) {
        return <Fallback error={this.state.error} retry={this.handleRetry} />;
      }

      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0F2C55 0%, #1E2026 50%, #0a1f3d 100%)',
          padding: '20px'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: 'clamp(30px, 5vw, 50px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            textAlign: 'center',
            maxWidth: '500px',
            width: '100%'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '20px'
            }}>
              <div style={{
                background: '#FF6B6B',
                borderRadius: '50%',
                padding: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <AlertTriangle 
                  size={32} 
                  color="#FFFFFF"
                />
              </div>
            </div>

            <h2 style={{
              fontSize: 'clamp(20px, 4vw, 24px)',
              fontWeight: '600',
              color: '#1E2026',
              marginBottom: '15px',
              fontFamily: 'Poppins, sans-serif'
            }}>
              Oops! Something went wrong
            </h2>

            <p style={{
              fontSize: 'clamp(14px, 3vw, 16px)',
              color: '#666666',
              marginBottom: '30px',
              lineHeight: '1.5',
              fontFamily: 'Inter, sans-serif'
            }}>
              We encountered an unexpected error. Our team has been notified and is working on a fix.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details style={{
                textAlign: 'left',
                marginBottom: '30px',
                background: '#F8F9FA',
                padding: '15px',
                borderRadius: '8px',
                fontSize: '12px',
                fontFamily: 'monospace',
                color: '#666'
              }}>
                <summary style={{ cursor: 'pointer', fontWeight: '600', marginBottom: '10px' }}>
                  Error Details (Development Only)
                </summary>
                <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>
                  {this.state.error.message}
                  {this.state.error.stack}
                </pre>
              </details>
            )}

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              alignItems: 'center'
            }}>
              <button
                onClick={this.handleRetry}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: 'linear-gradient(135deg, #F46A25 0%, #E55A1F 100%)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px 24px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontFamily: 'Inter, sans-serif',
                  minHeight: '48px',
                  width: '200px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(244, 106, 37, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <RefreshCw size={18} />
                Try Again
              </button>

              <button
                onClick={() => window.location.href = '/'}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: 'rgba(15, 44, 85, 0.1)',
                  color: '#0F2C55',
                  border: '1px solid rgba(15, 44, 85, 0.2)',
                  borderRadius: '12px',
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontFamily: 'Inter, sans-serif',
                  minHeight: '44px',
                  width: '200px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(15, 44, 85, 0.15)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(15, 44, 85, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Home size={16} />
                Go Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Smaller error boundary for individual components
export function ComponentErrorBoundary({ 
  children, 
  componentName = 'Component' 
}: { 
  children: React.ReactNode; 
  componentName?: string;
}) {
  return (
    <ErrorBoundary
      fallback={({ error, retry }) => (
        <div style={{
          background: 'rgba(255, 107, 107, 0.1)',
          border: '1px solid rgba(255, 107, 107, 0.3)',
          borderRadius: '8px',
          padding: '20px',
          textAlign: 'center',
          margin: '10px 0'
        }}>
          <AlertTriangle size={24} color="#FF6B6B" style={{ marginBottom: '10px' }} />
          <p style={{ 
            color: '#666', 
            fontSize: '14px', 
            margin: '0 0 15px 0',
            fontFamily: 'Inter, sans-serif'
          }}>
            {componentName} failed to load
          </p>
          <button
            onClick={retry}
            style={{
              background: '#FF6B6B',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 16px',
              fontSize: '12px',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif'
            }}
          >
            Retry
          </button>
        </div>
      )}
    >
      {children}
    </ErrorBoundary>
  );
}

'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

// Main loading spinner
export function LoadingSpinner({ size = 24, className = '' }: { size?: number; className?: string }) {
  return (
    <Loader2 
      size={size} 
      className={`animate-spin ${className}`}
      style={{ 
        color: '#F46A25',
        animation: 'spin 1s linear infinite'
      }}
    />
  );
}

// Full page loading state
export function PageLoading({ message = 'Loading...' }: { message?: string }) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0F2C55 0%, #1E2026 50%, #0a1f3d 100%)',
      gap: '20px'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '40px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        textAlign: 'center'
      }}>
        <LoadingSpinner size={40} />
        <p style={{
          color: '#FFFFFF',
          marginTop: '20px',
          fontSize: '16px',
          fontFamily: 'Inter, sans-serif',
          fontWeight: '500'
        }}>
          {message}
        </p>
      </div>
    </div>
  );
}

// Card loading skeleton
export function SkeletonCard() {
  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.12)',
      borderRadius: '16px',
      padding: '20px',
      animation: 'pulse 2s ease-in-out infinite'
    }}>
      {/* Header skeleton */}
      <div style={{
        height: '20px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '4px',
        marginBottom: '15px',
        width: '70%'
      }} />
      
      {/* Content skeleton */}
      <div style={{
        height: '14px',
        background: 'rgba(255, 255, 255, 0.08)',
        borderRadius: '4px',
        marginBottom: '8px',
        width: '100%'
      }} />
      <div style={{
        height: '14px',
        background: 'rgba(255, 255, 255, 0.08)',
        borderRadius: '4px',
        marginBottom: '8px',
        width: '85%'
      }} />
      <div style={{
        height: '14px',
        background: 'rgba(255, 255, 255, 0.08)',
        borderRadius: '4px',
        marginBottom: '15px',
        width: '60%'
      }} />
      
      {/* Button skeleton */}
      <div style={{
        height: '36px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '8px',
        width: '120px'
      }} />
    </div>
  );
}

// Text skeleton
export function SkeletonText({ 
  lines = 3, 
  className = '' 
}: { 
  lines?: number; 
  className?: string; 
}) {
  return (
    <div className={className}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          style={{
            height: '14px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '4px',
            marginBottom: '8px',
            width: i === lines - 1 ? '70%' : '100%',
            animation: `pulse 2s ease-in-out infinite ${i * 0.2}s`
          }}
        />
      ))}
    </div>
  );
}

// Button loading state
export function LoadingButton({ 
  children, 
  isLoading = false, 
  disabled = false,
  onClick,
  style = {},
  ...props 
}: {
  children: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
  [key: string]: any;
}) {
  return (
    <button
      onClick={isLoading ? undefined : onClick}
      disabled={disabled || isLoading}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        background: isLoading 
          ? 'rgba(244, 106, 37, 0.6)' 
          : 'linear-gradient(135deg, #F46A25 0%, #E55A1F 100%)',
        color: '#FFFFFF',
        border: 'none',
        borderRadius: '12px',
        padding: '12px 24px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: isLoading ? 'not-allowed' : 'pointer',
        transition: 'all 0.3s ease',
        fontFamily: 'Inter, sans-serif',
        minHeight: '48px',
        opacity: disabled ? 0.6 : 1,
        ...style
      }}
      {...props}
    >
      {isLoading && <LoadingSpinner size={18} />}
      {children}
    </button>
  );
}

// Dashboard skeleton
export function DashboardSkeleton() {
  return (
    <div style={{
      padding: '20px',
      background: 'linear-gradient(135deg, #0F2C55 0%, #1E2026 50%, #0a1f3d 100%)',
      minHeight: '100vh'
    }}>
      {/* Header skeleton */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px'
      }}>
        <div style={{
          height: '32px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '8px',
          width: '200px'
        }} />
        <div style={{
          height: '40px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '8px',
          width: '120px'
        }} />
      </div>
      
      {/* Cards grid skeleton */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px'
      }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}

// CSS for pulse animation
const pulseKeyframes = `
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

// Inject CSS if not already present
if (typeof document !== 'undefined' && !document.querySelector('#loading-animations')) {
  const style = document.createElement('style');
  style.id = 'loading-animations';
  style.textContent = pulseKeyframes;
  document.head.appendChild(style);
}

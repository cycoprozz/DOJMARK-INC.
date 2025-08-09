'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function PortalLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'reset'>('login');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      alert('Please enter your email');
      return;
    }

    if (authMode !== 'reset' && !password.trim()) {
      alert('Please enter your password');
      return;
    }

    setIsLoading(true);
    
    try {
      // Validate environment variables
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseKey) {
        throw new Error('Authentication service not configured');
      }

      // Import and create Supabase client
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(supabaseUrl, supabaseKey);

      if (authMode === 'login') {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password
        });

        if (error) throw error;

        if (data.user) {
          // Successful login - redirect to portal
          window.location.href = '/portal';
        }
      } else if (authMode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password: password,
          options: {
            emailRedirectTo: `${window.location.origin}/portal`
          }
        });

        if (error) throw error;

        alert('Check your email for the confirmation link!');
        setAuthMode('login');
      } else if (authMode === 'reset') {
        const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
          redirectTo: `${window.location.origin}/portal/reset`
        });

        if (error) throw error;

        alert('Password reset link sent to your email!');
        setAuthMode('login');
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      alert(error.message || 'Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      // Validate environment variables
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseKey) {
        throw new Error('Authentication service not configured');
      }

      // Import and create Supabase client
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(supabaseUrl, supabaseKey);

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/portal`
        }
      });

      if (error) {
        console.error('Google auth error:', error);
        alert('Google sign-in failed. Please try again or use email login.');
      }
      
      // Note: If successful, user will be redirected automatically
    } catch (error: any) {
      console.error('Google auth error:', error);
      alert('Google sign-in is not available. Please use email login.');
    }
  };

  return (
    <div className="portal-login-bg" style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0F2C55 0%, #1E2026 50%, #0a1f3d 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        width: '100%',
        position: 'relative'
      }}>
      {/* Glass Panel */}
      <div className="portal-glass" style={{
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '20px',
        padding: '40px',
        width: '100%',
        maxWidth: '450px',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        position: 'relative',
        minHeight: '600px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        {/* DOJMARK Logo */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px'
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
          <h1 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#ffffff',
            fontFamily: 'Poppins, sans-serif',
            marginBottom: '8px'
          }}>
            Client Portal
          </h1>
          <p style={{
            fontSize: '16px',
            color: 'rgba(255, 255, 255, 0.7)',
            fontFamily: 'Inter, sans-serif'
          }}>
            {authMode === 'login' && 'Welcome back! Sign in to your account'}
            {authMode === 'signup' && 'Create your client account'}
            {authMode === 'reset' && 'Reset your password'}
          </p>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} style={{marginBottom: '30px'}}>
          {/* Email Field */}
          <div style={{marginBottom: '16px'}}>
            <label style={{
              display: 'block',
              fontSize: 'clamp(14px, 3.5vw, 16px)',
              fontWeight: '500',
              color: '#ffffff',
              fontFamily: 'Inter, sans-serif',
              marginBottom: '8px'
            }}>
              Email Address
            </label>
            <div style={{
              position: 'relative',
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '16px',
              overflow: 'hidden'
            }}>
              <Mail 
                className="w-5 h-5" 
                style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(255, 255, 255, 0.6)',
                  zIndex: 2
                }} 
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  minHeight: '48px',
                  padding: '16px 16px 16px 52px',
                  background: 'transparent',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '16px',
                  fontFamily: 'Inter, sans-serif',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  if (e.target.parentElement) {
                    e.target.parentElement.style.borderColor = '#22C4FF';
                    e.target.parentElement.style.boxShadow = '0 0 0 3px rgba(34, 196, 255, 0.15)';
                    e.target.parentElement.style.background = 'rgba(255, 255, 255, 0.12)';
                  }
                }}
                onBlur={(e) => {
                  if (e.target.parentElement) {
                    e.target.parentElement.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                    e.target.parentElement.style.boxShadow = 'none';
                    e.target.parentElement.style.background = 'rgba(255, 255, 255, 0.08)';
                  }
                }}
                placeholder="your@email.com"
              />
            </div>
          </div>

          {/* Password Field (only for login/signup) */}
          {authMode !== 'reset' && (
            <div style={{marginBottom: '16px'}}>
              <label style={{
                display: 'block',
                fontSize: 'clamp(14px, 3.5vw, 16px)',
                fontWeight: '500',
                color: '#ffffff',
                fontFamily: 'Inter, sans-serif',
                marginBottom: '8px'
              }}>
                Password
              </label>
              <div style={{
                position: 'relative',
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '16px',
                overflow: 'hidden'
              }}>
                <Lock 
                  className="w-5 h-5" 
                  style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'rgba(255, 255, 255, 0.6)',
                    zIndex: 2
                  }} 
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    minHeight: '48px',
                    padding: '16px 52px 16px 52px',
                    background: 'transparent',
                    border: 'none',
                    color: '#ffffff',
                    fontSize: '16px',
                    fontFamily: 'Inter, sans-serif',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    if (e.target.parentElement) {
                      e.target.parentElement.style.borderColor = '#22C4FF';
                      e.target.parentElement.style.boxShadow = '0 0 0 3px rgba(34, 196, 255, 0.15)';
                      e.target.parentElement.style.background = 'rgba(255, 255, 255, 0.12)';
                    }
                  }}
                  onBlur={(e) => {
                    if (e.target.parentElement) {
                      e.target.parentElement.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                      e.target.parentElement.style.boxShadow = 'none';
                      e.target.parentElement.style.background = 'rgba(255, 255, 255, 0.08)';
                    }
                  }}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255, 255, 255, 0.6)',
                    cursor: 'pointer',
                    minHeight: '44px',
                    minWidth: '44px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2
                  }}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              minHeight: '48px',
              padding: '16px',
              background: isLoading 
                ? 'rgba(244, 106, 37, 0.6)' 
                : 'linear-gradient(135deg, #F46A25 0%, #E55A1F 100%)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '16px',
              fontSize: 'clamp(14px, 3.5vw, 16px)',
              fontWeight: '600',
              fontFamily: 'Inter, sans-serif',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '12px',
              touchAction: 'manipulation'
            }}
            onTouchStart={(e) => {
              if (!isLoading) {
                e.currentTarget.style.transform = 'scale(0.98)';
              }
            }}
            onTouchEnd={(e) => {
              if (!isLoading) {
                e.currentTarget.style.transform = 'scale(1)';
              }
            }}
            onMouseEnter={(e) => {
              if (!isLoading && window.innerWidth > 640) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(244, 106, 37, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading && window.innerWidth > 640) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          >
            {isLoading ? 'Processing...' : (
              <>
                {authMode === 'login' && 'Sign In'}
                {authMode === 'signup' && 'Create Account'}
                {authMode === 'reset' && 'Send Reset Link'}
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        {/* Google Auth */}
        <button
          onClick={handleGoogleAuth}
          style={{
            width: '100%',
            minHeight: '48px',
            padding: '16px',
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '16px',
            color: '#ffffff',
            fontSize: 'clamp(14px, 3.5vw, 16px)',
            fontWeight: '500',
            fontFamily: 'Inter, sans-serif',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            marginBottom: '30px',
            touchAction: 'manipulation'
          }}
          onTouchStart={(e) => {
            e.currentTarget.style.transform = 'scale(0.98)';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
          }}
          onTouchEnd={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
          }}
          onMouseEnter={(e) => {
            if (window.innerWidth > 640) {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
            }
          }}
          onMouseLeave={(e) => {
            if (window.innerWidth > 640) {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
            }
          }}
        >
          Continue with Google
        </button>

        {/* Auth Mode Switch */}
        <div style={{
          textAlign: 'center',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: '20px'
        }}>
          {authMode === 'login' && (
            <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
              <p style={{
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.7)',
                fontFamily: 'Inter, sans-serif'
              }}>
                Don't have an account?{' '}
                <button
                  onClick={() => setAuthMode('signup')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#22C4FF',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    fontFamily: 'Inter, sans-serif'
                  }}
                >
                  Sign up
                </button>
              </p>
              <button
                onClick={() => setAuthMode('reset')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#22C4FF',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  fontSize: '14px',
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                Forgot password?
              </button>
            </div>
          )}
          
          {(authMode === 'signup' || authMode === 'reset') && (
            <p style={{
              fontSize: '14px',
              color: 'rgba(255, 255, 255, 0.7)',
              fontFamily: 'Inter, sans-serif'
            }}>
              Already have an account?{' '}
              <button
                onClick={() => setAuthMode('login')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#22C4FF',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                Sign in
              </button>
            </p>
          )}
        </div>

        {/* Back to Home */}
        <div style={{
          textAlign: 'center',
          marginTop: '20px'
        }}>
          <Link 
            href="/"
            style={{
              fontSize: '14px',
              color: 'rgba(255, 255, 255, 0.5)',
              textDecoration: 'none',
              fontFamily: 'Inter, sans-serif'
            }}
          >
            ← Back to DOJMARK
          </Link>
        </div>

        {/* Mobile CSS */}
        <style jsx>{`
          @media (max-width: 768px) {
            /* Mobile optimizations for portal login */
            div[style*="maxWidth:450px"] {
              max-width: 95vw !important;
              padding: 30px !important;
            }
            
            h1 {
              font-size: 24px !important;
            }
            
            p {
              font-size: 14px !important;
            }
            
            input {
              font-size: 16px !important;
              padding: 12px 15px 12px 45px !important;
            }
            
            button[type="submit"] {
              padding: 14px !important;
              font-size: 14px !important;
            }
            
            img[style*="height:60px"] {
              height: 50px !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
}

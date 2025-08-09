'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  ShoppingBag,
  User
} from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Client Portal', href: '/portal' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

interface DojmarkLayoutProps {
  children: React.ReactNode;
}

export default function DojmarkLayout({ children }: DojmarkLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{
      fontFamily: 'DM Sans, sans-serif',
      color: '#d0c9c9'
    }}>
      
      {/* Mobile-First Header */}
      <header 
        className="main-header main-header-one z-header"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          transition: 'all 0.3s ease',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          minHeight: '110px'
        }}
      >
        <div className="container-mobile" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 16px',
          minHeight: '110px'
        }}>
          {/* Burger Menu Button - Left */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '44px',
              minHeight: '44px',
              borderRadius: '8px',
              transition: 'all 0.3s ease',
              touchAction: 'manipulation'
            }}
            onTouchStart={(e) => {
              e.currentTarget.style.background = 'rgba(15, 44, 85, 0.1)';
            }}
            onTouchEnd={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <Menu
              style={{
                width: '24px',
                height: '24px',
                color: '#1E2026',
                strokeWidth: 2
              }}
            />
          </button>

          {/* Center Logo */}
          <Link href="/" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)'
          }}>
            <img
              src="/dojmark-main-logo.png"
              alt="DOJMARK Digital Marketing"
              style={{
                height: 'clamp(100px, 15vw, 120px)',
                width: 'auto',
                filter: 'drop-shadow(0 0 25px rgba(15, 44, 85, 0.4)) drop-shadow(0 0 50px rgba(244, 106, 37, 0.3))'
              }}
            />
          </Link>

          {/* Client Portal CTA - Right */}
          <Link
            href="/portal"
            style={{
              background: 'linear-gradient(135deg, #F46A25 0%, #E55A1F 100%)',
              color: '#ffffff',
              textDecoration: 'none',
              padding: '8px 16px',
              borderRadius: '12px',
              fontSize: 'clamp(12px, 3vw, 14px)',
              fontWeight: '600',
              fontFamily: 'Inter, sans-serif',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.3s ease',
              touchAction: 'manipulation'
            }}
            onTouchStart={(e) => {
              e.currentTarget.style.transform = 'scale(0.95)';
            }}
            onTouchEnd={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <User style={{ width: '16px', height: '16px' }} />
            <span style={{ display: typeof window !== 'undefined' && window.innerWidth > 480 ? 'block' : 'none' }}>
              Portal
            </span>
          </Link>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.6)',
            zIndex: 60,
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease'
          }}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div 
        className="mobile-menu"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100%',
          width: '85%',
          maxWidth: '320px',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          zIndex: 70,
          padding: '30px',
          transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          overflowY: 'auto',
          boxShadow: '4px 0 20px rgba(0,0,0,0.15)',
          borderRight: '1px solid rgba(244, 106, 37, 0.1)'
        }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '40px'
        }}>
          <img 
            src="/dojmark-main-logo.png" 
            alt="DOJMARK" 
            style={{
              height: '250px', 
              width: 'auto',
              filter: 'drop-shadow(0 0 40px rgba(244, 106, 37, 0.8)) drop-shadow(0 0 80px rgba(15, 44, 85, 0.6))'
            }}
          />
          <button 
            onClick={() => setMobileMenuOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <X className="w-6 h-6" style={{color: '#000000'}} />
          </button>
        </div>

        <nav>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0
          }}>
            {navigation.map((item) => (
              <li key={item.name} style={{marginBottom: '20px'}}>
                <Link 
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    color: pathname === item.href ? '#F46A25' : '#000000',
                    fontSize: '18px',
                    fontWeight: '500',
                    textDecoration: 'none',
                    fontFamily: 'DM Sans, sans-serif'
                  }}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div style={{
          marginTop: '40px',
          paddingTop: '40px',
          borderTop: '1px solid #eee'
        }}>
          <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
            <Link 
              href="/portal/login"
              style={{
                display: 'block',
                background: 'linear-gradient(135deg, #0F2C55 0%, #22C4FF 100%)',
                color: '#ffffff',
                padding: '15px 20px',
                textAlign: 'center',
                fontSize: '14px',
                fontWeight: '600',
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                fontFamily: 'DM Sans, sans-serif',
                borderRadius: '8px'
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Client Login
            </Link>
            
            <Link 
              href="/quote"
              style={{
                display: 'block',
                background: '#F46A25',
                color: '#ffffff',
                padding: '15px 20px',
                textAlign: 'center',
                fontSize: '14px',
                fontWeight: '600',
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                fontFamily: 'DM Sans, sans-serif',
                borderRadius: '8px'
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Quote
            </Link>
          </div>
        </div>
      </div>

      {/* Floating CTA Button */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000
      }}>
        <Link 
          href="/quote"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #F46A25 0%, #E55A1F 100%)',
            color: '#ffffff',
            padding: '16px 24px',
            borderRadius: '50px',
            fontSize: '14px',
            fontWeight: '600',
            textDecoration: 'none',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            fontFamily: 'DM Sans, sans-serif',
            boxShadow: '0 8px 25px rgba(244, 106, 37, 0.4)',
            transition: 'all 0.3s ease',
            minWidth: '120px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 12px 35px rgba(244, 106, 37, 0.6)';
            e.currentTarget.style.background = 'linear-gradient(135deg, #E55A1F 0%, #D54E19 100%)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(244, 106, 37, 0.4)';
            e.currentTarget.style.background = 'linear-gradient(135deg, #F46A25 0%, #E55A1F 100%)';
          }}
        >
          Get Quote
        </Link>
      </div>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer - Minimal Baosh Style */}
      <footer style={{
        background: '#1E2026',
        color: '#ffffff',
        padding: '80px 0 40px'
      }}>
        <div className="auto-container" style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 15px'
        }}>
          
          {/* Footer Content */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '60px',
            marginBottom: '60px'
          }}>
            
            {/* Brand Column */}
            <div>
              <Link href="/" style={{
                display: 'inline-block',
                marginBottom: '30px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.15)';
                e.currentTarget.style.filter = 'drop-shadow(0 0 40px rgba(244, 106, 37, 0.8)) drop-shadow(0 0 80px rgba(34, 196, 255, 0.5))';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.filter = 'none';
              }}
              >
                <img 
                  src="/dojmark-main-logo.png" 
                  alt="DOJMARK" 
                  style={{
                    height: '280px',
                    width: 'auto',
                    filter: 'brightness(0) invert(1) drop-shadow(0 0 40px rgba(255, 255, 255, 0.7)) drop-shadow(0 0 80px rgba(34, 196, 255, 0.6))',
                    transition: 'all 0.3s ease'
                  }}
                />
              </Link>
              
              <p style={{
                fontSize: '16px',
                lineHeight: '1.6em',
                color: 'rgba(255, 255, 255, 0.7)',
                fontFamily: 'DM Sans, sans-serif',
                marginBottom: '30px'
              }}>
                Result-driven digital marketing solutions that empower Black-owned businesses 
                to thrive in the digital landscape.
              </p>

              <div style={{
                display: 'flex',
                gap: '20px'
              }}>
                <Link href="https://www.instagram.com/cycoprozz" style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '16px',
                  fontWeight: '500',
                  textDecoration: 'none'
                }}>
                  Ig.
                </Link>
                <Link href="#" style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '16px',
                  fontWeight: '500',
                  textDecoration: 'none'
                }}>
                  Tw.
                </Link>
                <Link href="#" style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '16px',
                  fontWeight: '500',
                  textDecoration: 'none'
                }}>
                  Li.
                </Link>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#ffffff',
                marginBottom: '30px',
                fontFamily: 'Poppins, sans-serif'
              }}>
                Services
              </h3>
              
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                {['Web Development', 'Brand Identity', 'Content Creation', 'Digital Strategy', 'Photography', 'Videography'].map((service) => (
                  <li key={service} style={{marginBottom: '15px'}}>
                    <Link href="/services" style={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: '16px',
                      textDecoration: 'none',
                      fontFamily: 'DM Sans, sans-serif',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#F46A25';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                    }}
                    >
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#ffffff',
                marginBottom: '30px',
                fontFamily: 'Poppins, sans-serif'
              }}>
                Get in Touch
              </h3>
              
              <div style={{
                fontSize: '16px',
                lineHeight: '1.8em',
                color: 'rgba(255, 255, 255, 0.7)',
                fontFamily: 'DM Sans, sans-serif',
                marginBottom: '30px'
              }}>
                <div style={{marginBottom: '10px'}}>hello@dojmark.com</div>
                <div style={{marginBottom: '10px'}}>Atlanta, GA, USA</div>
                <div>Available for consultation</div>
              </div>

              <Link 
                href="/quote"
                style={{
                  display: 'inline-block',
                  background: '#F46A25',
                  color: '#ffffff',
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  transition: 'background 0.3s ease',
                  fontFamily: 'DM Sans, sans-serif'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#0F2C55';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#F46A25';
                }}
              >
                Start Project
              </Link>
            </div>
          </div>

          {/* Footer Bottom */}
          <div style={{
            paddingTop: '40px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            textAlign: 'center'
          }}>
            <p style={{
              fontSize: '14px',
              color: 'rgba(255, 255, 255, 0.5)',
              fontFamily: 'DM Sans, sans-serif',
              margin: 0
            }}>
              &copy; 2024 DOJMARK. All rights reserved. Empowering Black excellence through digital innovation.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import DojmarkLayout from '@/components/DojmarkLayout';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <DojmarkLayout>
      {/* Mobile-First Hero Section */}
      <section 
        className="main-slider main-slider-one" 
        style={{
          position: 'relative',
          display: 'block',
          zIndex: 5,
          overflow: 'hidden',
          minHeight: '100vh',
          paddingTop: '60px' // Account for fixed header
        }}
      >
        
        {/* Background Layer */}
        <div 
          className="image-layer"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            background: 'linear-gradient(135deg, #0F2C55 0%, #1E2026 50%, #0a1f3d 100%)',
            zIndex: 1
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            background: 'rgba(0, 0, 0, 0.6)',
            zIndex: -1
          }} />
        </div>

        {/* Content Container */}
        <div 
          className="auto-container" 
          style={{
            maxWidth: '1650px',
            width: '100%',
            margin: '0 auto',
            padding: '0 15px',
            position: 'relative',
            zIndex: 2
          }}
        >
          
          {/* Main Content - Mobile First */}
          <div 
            className="main-slider-one__single container-mobile" 
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'clamp(80px, 15vh, 200px) 16px clamp(40px, 10vh, 150px)',
              zIndex: 2,
              minHeight: 'calc(100vh - 60px)',
              textAlign: 'center',
              maxWidth: '100%'
            }}
          >
            
            {/* Social Links - Mobile Optimized */}
            <ul 
              className="social-links"
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 'clamp(20px, 5vw, 30px)',
                listStyle: 'none',
                padding: 0,
                margin: '0 0 clamp(30px, 8vw, 50px) 0',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 1000ms ease',
                transitionDelay: '500ms',
                flexWrap: 'wrap'
              }}
            >
              <li>
                <Link href="https://www.instagram.com/cycoprozz" style={{
                  color: '#ffffff',
                  fontSize: 'clamp(16px, 4vw, 18px)',
                  fontWeight: '500',
                  fontFamily: 'DM Sans, sans-serif',
                  textDecoration: 'none',
                  opacity: 0.8,
                  transition: 'opacity 0.3s ease',
                  padding: '8px 12px',
                  minHeight: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: '8px',
                  touchAction: 'manipulation'
                }}
                onTouchStart={(e) => e.currentTarget.style.opacity = '1'}
                onTouchEnd={(e) => e.currentTarget.style.opacity = '0.8'}
                onMouseEnter={(e) => {
                  if (window.innerWidth > 640) e.currentTarget.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  if (window.innerWidth > 640) e.currentTarget.style.opacity = '0.8';
                }}
                >
                  Ig.
                </Link>
              </li>
              <li>
                <Link href="#" style={{
                  color: '#ffffff',
                  fontSize: '18px',
                  fontWeight: '500',
                  fontFamily: 'DM Sans, sans-serif',
                  textDecoration: 'none',
                  opacity: 0.8,
                  transition: 'opacity 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
                >
                  Tw.
                </Link>
              </li>
              <li>
                <Link href="#" style={{
                  color: '#ffffff',
                  fontSize: '18px',
                  fontWeight: '500',
                  fontFamily: 'DM Sans, sans-serif',
                  textDecoration: 'none',
                  opacity: 0.8,
                  transition: 'opacity 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
                >
                  Li.
                </Link>
              </li>
              <li>
                <Link href="#" style={{
                  color: '#ffffff',
                  fontSize: '18px',
                  fontWeight: '500',
                  fontFamily: 'DM Sans, sans-serif',
                  textDecoration: 'none',
                  opacity: 0.8,
                  transition: 'opacity 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
                >
                  Be.
                </Link>
              </li>
            </ul>

            {/* Main Title - Centered */}
            <div 
              className="title"
              style={{
                textAlign: 'center',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                transition: 'all 1000ms ease',
                transitionDelay: '1000ms',
                marginBottom: '50px'
              }}
            >
              <h1 style={{
                color: '#ffffff',
                fontSize: 'clamp(60px, 10vw, 140px)',
                lineHeight: '1.1em',
                fontWeight: '500',
                fontFamily: 'Poppins, sans-serif',
                margin: 0,
                letterSpacing: '-0.02em'
              }}>
                Result-Driven <br/>
                <span style={{
                  background: 'linear-gradient(135deg, #F46A25 0%, #22C4FF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  Digital
                </span> <br/>
                Marketing
            </h1>
      </div>

            {/* Subtitle - Mobile Optimized */}
            <p style={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: 'clamp(16px, 4vw, 20px)',
              fontFamily: 'DM Sans, sans-serif',
              textAlign: 'center',
              maxWidth: '90%',
              margin: '0 auto clamp(30px, 8vw, 50px)',
              lineHeight: 1.6,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 1000ms ease',
              transitionDelay: '1500ms'
            }}>
              Empowering Black-owned businesses with cutting-edge digital solutions that drive measurable growth.
            </p>

            {/* CTA Buttons - Mobile First */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              width: '100%'
            }}>
              <Link 
                href="/quote"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #F46A25 0%, #22C4FF 100%)',
                  color: '#ffffff',
                  padding: 'clamp(16px, 4vw, 18px) clamp(24px, 8vw, 40px)',
                  fontSize: 'clamp(14px, 3.5vw, 16px)',
                  fontWeight: '600',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  fontFamily: 'DM Sans, sans-serif',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transitionDelay: '2000ms',
                  minHeight: '48px',
                  width: 'clamp(250px, 80vw, 300px)',
                  touchAction: 'manipulation'
                }}
                onTouchStart={(e) => {
                  e.currentTarget.style.transform = 'scale(0.98)';
                }}
                onTouchEnd={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                onMouseEnter={(e) => {
                  if (window.innerWidth > 640) {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(244, 106, 37, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (window.innerWidth > 640) {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                Get Your Quote
                <ArrowRight style={{marginLeft: '8px', width: '18px', height: '18px'}} />
              </Link>
              
              <Link 
                href="/portal"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  color: '#ffffff',
                  padding: 'clamp(14px, 3.5vw, 16px) clamp(20px, 6vw, 32px)',
                  fontSize: 'clamp(12px, 3vw, 14px)',
                  fontWeight: '500',
                  textDecoration: 'none',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  fontFamily: 'DM Sans, sans-serif',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transitionDelay: '2200ms',
                  minHeight: '44px',
                  width: 'clamp(200px, 60vw, 250px)',
                  touchAction: 'manipulation'
                }}
                onTouchStart={(e) => {
                  e.currentTarget.style.transform = 'scale(0.98)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                }}
                onTouchEnd={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                }}
                onMouseEnter={(e) => {
                  if (window.innerWidth > 640) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (window.innerWidth > 640) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                Open Client Portal
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section style={{
        padding: '80px 0',
        background: '#ffffff'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 15px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '40px'
          }}>
            <div style={{
              color: '#1E2026',
              fontSize: '18px',
              fontWeight: '500',
              fontFamily: 'DM Sans, sans-serif',
              opacity: 0.7
            }}>
              Trusted by 200+ Black-owned businesses
      </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '60px',
              opacity: 0.6
            }}>
              <div style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#1E2026',
                fontFamily: 'Poppins, sans-serif'
              }}>
                URBAN LUXE
          </div>
              <div style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#1E2026',
                fontFamily: 'Poppins, sans-serif'
              }}>
                BLOOM WELLNESS
              </div>
              <div style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#1E2026',
                fontFamily: 'Poppins, sans-serif'
              }}>
                TECH FORWARD
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section style={{
        padding: '120px 0',
        background: '#F8F9FA'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 15px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'center'
          }}>
            <div>
              <h2 style={{
                fontSize: 'clamp(40px, 6vw, 80px)',
                fontWeight: '500',
                fontFamily: 'Poppins, sans-serif',
                color: '#1E2026',
                lineHeight: '1.1em',
                margin: '0 0 30px 0'
              }}>
                Digital <br/>
                <span style={{color: '#F46A25'}}>Excellence</span>
            </h2>
              
              <p style={{
                fontSize: '18px',
                lineHeight: '1.6em',
                color: '#666',
                fontFamily: 'DM Sans, sans-serif',
                marginBottom: '40px'
              }}>
                We create result-driven digital solutions that empower Black-owned businesses 
                to achieve unprecedented growth in the digital marketplace.
              </p>

              <Link 
                href="/services"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  color: '#1E2026',
                  fontSize: '18px',
                  fontWeight: '500',
                  fontFamily: 'DM Sans, sans-serif',
                  textDecoration: 'none',
                  borderBottom: '2px solid #F46A25',
                  paddingBottom: '5px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#F46A25';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#1E2026';
                }}
              >
                Explore Services
                <ArrowRight style={{marginLeft: '10px', width: '20px', height: '20px'}} />
              </Link>
          </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '30px'
            }}>
              {[
                {title: 'Web Development', count: '150+'},
                {title: 'Brand Identity', count: '200+'},
                {title: 'Content Creation', count: '300+'},
                {title: 'Digital Strategy', count: '100+'}
              ].map((service, index) => (
                <div 
                  key={index}
                  style={{
                    padding: '40px 30px',
                    background: '#ffffff',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{
                    fontSize: '36px',
                    fontWeight: '600',
                    color: '#F46A25',
                    fontFamily: 'Poppins, sans-serif',
                    marginBottom: '15px'
                  }}>
                    {service.count}
                    </div>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: '500',
                    color: '#1E2026',
                    fontFamily: 'DM Sans, sans-serif'
                  }}>
                    {service.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </DojmarkLayout>
  );
}
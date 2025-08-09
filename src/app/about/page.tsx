'use client';

import { useState, useEffect } from 'react';
import DojmarkLayout from '@/components/DojmarkLayout';
import Link from 'next/link';
import { ArrowRight, Users, Target, Award, Zap } from 'lucide-react';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <DojmarkLayout>
      {/* Hero Section - Baosh Style */}
      <section className="main-slider main-slider-one" style={{
        position: 'relative',
        display: 'block',
        zIndex: 5,
        overflow: 'hidden',
        paddingTop: '120px'
      }}>
        
        {/* Background */}
        <div 
          className="image-layer"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            background: 'linear-gradient(135deg, #1E2026 0%, #0F2C55 50%, #1a1d23 100%)',
            zIndex: 1
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            background: 'rgba(0, 0, 0, 0.3)',
            zIndex: -1
          }} />
        </div>

        {/* Content */}
        <div className="auto-container" style={{
          maxWidth: '1650px',
          width: '100%',
          margin: '0 auto',
          padding: '0 15px'
        }}>
          
          <div className="main-slider-one__single" style={{
            position: 'relative',
            display: 'block',
            padding: '150px 0px 200px',
            zIndex: 2
          }}>
            


            {/* Content */}
            <div className="main-slider-one__content" style={{
              position: 'relative',
              display: 'block',
              zIndex: 5
            }}>
              
              {/* Breadcrumb */}
              <div 
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible 
                    ? 'perspective(400px) rotateY(0deg) translateX(0px)' 
                    : 'perspective(400px) rotateY(0deg) translateX(-80px)',
                  transition: 'all 1000ms ease',
                  transitionDelay: '500ms',
                  marginBottom: '30px'
                }}
              >
                <Link href="/" style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '16px',
                  textDecoration: 'none',
                  fontFamily: 'DM Sans, sans-serif'
                }}>
                  Home
                </Link>
                <span style={{
                  color: 'rgba(255, 255, 255, 0.5)',
                  margin: '0 15px'
                }}>
                  /
                </span>
                <span style={{
                  color: '#F46A25',
                  fontSize: '16px',
                  fontFamily: 'DM Sans, sans-serif'
                }}>
                  About
                </span>
              </div>

              {/* Main Title */}
              <div 
                className="title"
                style={{
                  position: 'relative',
                  display: 'block',
                  paddingLeft: '165px',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible 
                    ? 'perspective(400px) rotateY(0deg) translateX(0px)' 
                    : 'perspective(400px) rotateY(0deg) translateX(80px)',
                  transformOrigin: 'bottom',
                  transition: 'all 1000ms ease',
                  transitionDelay: '1000ms',
                  zIndex: 10
                }}
              >
                <h1 style={{
                  color: '#ffffff',
                  fontSize: 'clamp(60px, 10vw, 120px)',
                  lineHeight: '1.1em',
                  fontWeight: '500',
                  fontFamily: 'Poppins, sans-serif',
                  margin: 0,
                  letterSpacing: '-0.02em'
                }}>
                  Empowering <br/>
                  <span style={{
                    position: 'relative',
                    display: 'inline-block',
                    top: '14px',
                    background: 'linear-gradient(135deg, #F46A25 0%, #22C4FF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    Black
                  </span> <br/>
                  Excellence
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section style={{
        padding: '120px 0',
        background: '#ffffff'
      }}>
        <div className="auto-container" style={{
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
                fontSize: 'clamp(36px, 5vw, 60px)',
                fontWeight: '500',
                fontFamily: 'Poppins, sans-serif',
                color: '#1E2026',
                lineHeight: '1.2em',
                margin: '0 0 30px 0'
              }}>
                Our <br/>
                <span style={{color: '#F46A25'}}>Story</span>
              </h2>
              
              <p style={{
                fontSize: '18px',
                lineHeight: '1.7em',
                color: '#666',
                fontFamily: 'DM Sans, sans-serif',
                marginBottom: '30px'
              }}>
                Founded in Atlanta, DOJMARK was born from a vision to bridge the digital divide 
                and empower Black-owned businesses with cutting-edge marketing solutions that 
                drive real, measurable results.
              </p>

              <p style={{
                fontSize: '18px',
                lineHeight: '1.7em',
                color: '#666',
                fontFamily: 'DM Sans, sans-serif',
                marginBottom: '40px'
              }}>
                We believe in the power of authentic storytelling, innovative design, and 
                strategic digital presence to transform businesses and create lasting impact 
                in communities that matter.
              </p>

              <div style={{
                display: 'flex',
                gap: '40px',
                marginTop: '40px'
              }}>
                <div>
                  <div style={{
                    fontSize: '36px',
                    fontWeight: '600',
                    color: '#F46A25',
                    fontFamily: 'Poppins, sans-serif'
                  }}>
                    200+
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: '#666',
                    fontFamily: 'DM Sans, sans-serif',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Projects Completed
                  </div>
                </div>

                <div>
                  <div style={{
                    fontSize: '36px',
                    fontWeight: '600',
                    color: '#F46A25',
                    fontFamily: 'Poppins, sans-serif'
                  }}>
                    98%
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: '#666',
                    fontFamily: 'DM Sans, sans-serif',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Client Satisfaction
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              position: 'relative'
            }}>
              <div style={{
                width: '100%',
                height: '500px',
                background: 'linear-gradient(135deg, #F46A25 0%, #0F2C55 100%)',
                borderRadius: '0',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                  color: '#ffffff'
                }}>
                  <Target style={{width: '80px', height: '80px', marginBottom: '20px'}} />
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    fontFamily: 'Poppins, sans-serif',
                    margin: 0
                  }}>
                    Mission Driven
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section style={{
        padding: '120px 0',
        background: '#F8F9FA'
      }}>
        <div className="auto-container" style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 15px'
        }}>
          
          {/* Section Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '80px'
          }}>
            <h2 style={{
              fontSize: 'clamp(40px, 6vw, 80px)',
              fontWeight: '500',
              fontFamily: 'Poppins, sans-serif',
              color: '#1E2026',
              lineHeight: '1.1em',
              margin: '0 0 20px 0'
            }}>
              Our <span style={{color: '#F46A25'}}>Values</span>
            </h2>
            
            <p style={{
              fontSize: '18px',
              color: '#666',
              fontFamily: 'DM Sans, sans-serif',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              The principles that guide everything we do
            </p>
          </div>

          {/* Values Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '40px'
          }}>
            {[
              {
                icon: <Award className="w-12 h-12" />,
                title: 'Excellence',
                description: 'We pursue perfection in every project, ensuring exceptional quality and results that exceed expectations.'
              },
              {
                icon: <Users className="w-12 h-12" />,
                title: 'Community',
                description: 'We believe in lifting each other up, creating opportunities, and building lasting relationships within our community.'
              },
              {
                icon: <Zap className="w-12 h-12" />,
                title: 'Innovation',
                description: 'We stay ahead of digital trends, embracing new technologies and creative solutions for maximum impact.'
              },
              {
                icon: <Target className="w-12 h-12" />,
                title: 'Results',
                description: 'We focus on measurable outcomes, delivering strategies that drive real growth and tangible success.'
              }
            ].map((value, index) => (
              <div 
                key={index}
                style={{
                  background: '#ffffff',
                  padding: '50px 40px',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 30px 60px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  color: '#F46A25',
                  marginBottom: '30px',
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  {value.icon}
                </div>
                
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  color: '#1E2026',
                  fontFamily: 'Poppins, sans-serif',
                  marginBottom: '20px'
                }}>
                  {value.title}
                </h3>
                
                <p style={{
                  fontSize: '16px',
                  lineHeight: '1.6em',
                  color: '#666',
                  fontFamily: 'DM Sans, sans-serif',
                  margin: 0
                }}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '120px 0',
        background: '#1E2026'
      }}>
        <div className="auto-container" style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 15px'
        }}>
          <div style={{
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: 'clamp(36px, 5vw, 60px)',
              fontWeight: '500',
              fontFamily: 'Poppins, sans-serif',
              color: '#ffffff',
              lineHeight: '1.2em',
              margin: '0 0 30px 0'
            }}>
              Ready to <span style={{color: '#F46A25'}}>Grow</span> Together?
            </h2>
            
            <p style={{
              fontSize: '18px',
              color: 'rgba(255, 255, 255, 0.7)',
              fontFamily: 'DM Sans, sans-serif',
              marginBottom: '40px',
              maxWidth: '600px',
              margin: '0 auto 40px'
            }}>
              Let's create something extraordinary. Start your digital transformation journey today.
            </p>

            <Link 
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: '#F46A25',
                color: '#ffffff',
                padding: '18px 40px',
                fontSize: '16px',
                fontWeight: '600',
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                transition: 'all 0.3s ease',
                fontFamily: 'DM Sans, sans-serif'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#0F2C55';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(244, 106, 37, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#F46A25';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Start Your Project
              <ArrowRight style={{marginLeft: '10px', width: '20px', height: '20px'}} />
            </Link>
          </div>
        </div>
      </section>

      {/* Custom CSS */}
      <style jsx>{`
        @media (max-width: 768px) {
          .main-slider-one__single {
            padding: 120px 0px 150px !important;
          }
          
          .main-slider-one__img {
            right: 20px !important;
            top: 60px !important;
          }
          
          .title {
            padding-left: 20px !important;
          }
          
          section div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </DojmarkLayout>
  );
}
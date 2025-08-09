'use client';

import { useState, useEffect } from 'react';
import DojmarkLayout from '@/components/DojmarkLayout';
import Link from 'next/link';
import { 
  ArrowRight, 
  Monitor, 
  Palette, 
  Camera, 
  Video, 
  Target, 
  Megaphone,
  Code,
  Sparkles
} from 'lucide-react';

export default function Services() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const services = [
    {
      icon: <Monitor className="w-16 h-16" />,
      title: 'Web Development',
      subtitle: 'Digital Foundations',
      description: 'Custom websites and web applications built with cutting-edge technology for optimal performance and user experience.',
      features: ['Responsive Design', 'E-commerce Solutions', 'CMS Integration', 'Performance Optimization'],
      price: 'From $2,500'
    },
    {
      icon: <Palette className="w-16 h-16" />,
      title: 'Brand Identity',
      subtitle: 'Visual Excellence',
      description: 'Complete brand identity systems that capture your essence and resonate with your target audience.',
      features: ['Logo Design', 'Brand Guidelines', 'Color Palettes', 'Typography Systems'],
      price: 'From $1,800'
    },
    {
      icon: <Camera className="w-16 h-16" />,
      title: 'Photography',
      subtitle: 'Visual Storytelling',
      description: 'Professional photography services that showcase your brand, products, and story with stunning visual impact.',
      features: ['Product Photography', 'Event Coverage', 'Portrait Sessions', 'Commercial Shoots'],
      price: 'From $500'
    },
    {
      icon: <Video className="w-16 h-16" />,
      title: 'Videography',
      subtitle: 'Motion Graphics',
      description: 'Dynamic video content that engages audiences and drives action across all digital platforms.',
      features: ['Promotional Videos', 'Social Media Content', 'Documentary Style', 'Animation'],
      price: 'From $1,200'
    },
    {
      icon: <Target className="w-16 h-16" />,
      title: 'Digital Strategy',
      subtitle: 'Growth Planning',
      description: 'Comprehensive digital strategies that align with your business goals and drive measurable results.',
      features: ['Market Analysis', 'SEO Strategy', 'Content Planning', 'Performance Tracking'],
      price: 'From $800'
    },
    {
      icon: <Megaphone className="w-16 h-16" />,
      title: 'Content Creation',
      subtitle: 'Engaging Stories',
      description: 'Compelling content that tells your story, engages your audience, and builds lasting connections.',
      features: ['Social Media Content', 'Blog Writing', 'Email Campaigns', 'Copy Writing'],
      price: 'From $600'
    }
  ];

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
            background: 'rgba(0, 0, 0, 0.4)',
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
                  Services
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
                  Digital <br/>
                  <span style={{
                    position: 'relative',
                    display: 'inline-block',
                    top: '14px',
                    background: 'linear-gradient(135deg, #F46A25 0%, #22C4FF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    Solutions
                  </span> <br/>
                  That Work
                </h1>
              </div>
                  </div>
                </div>
              </div>
      </section>

      {/* Services Grid - Interactive */}
      <section style={{
        padding: '120px 0',
        background: '#ffffff'
      }}>
        <div className="auto-container" style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 15px'
        }}>
          
          {/* Section Header */}
          <div style={{
            marginBottom: '80px',
            maxWidth: '600px'
          }}>
            <h2 style={{
              fontSize: 'clamp(40px, 6vw, 80px)',
              fontWeight: '500',
              fontFamily: 'Poppins, sans-serif',
              color: '#1E2026',
              lineHeight: '1.1em',
              margin: '0 0 20px 0'
            }}>
              Our <span style={{color: '#F46A25'}}>Services</span>
                  </h2>
            
            <p style={{
              fontSize: '18px',
              lineHeight: '1.6em',
              color: '#666',
              fontFamily: 'DM Sans, sans-serif'
            }}>
              Comprehensive digital solutions designed to elevate your brand and drive measurable growth.
            </p>
                  </div>

          {/* Services Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '40px'
          }}>
            {services.map((service, index) => (
              <div 
                key={index}
                style={{
                  background: '#ffffff',
                  border: '1px solid #f0f0f0',
                  padding: '50px 40px',
                  transition: 'all 0.4s ease',
                  cursor: 'pointer',
                  transform: activeService === index ? 'translateY(-10px)' : 'translateY(0)',
                  boxShadow: activeService === index 
                    ? '0 30px 60px rgba(0,0,0,0.15)' 
                    : '0 5px 20px rgba(0,0,0,0.05)'
                }}
                onMouseEnter={() => setActiveService(index)}
                onMouseLeave={() => setActiveService(-1)}
              >
                {/* Icon */}
                <div style={{
                  color: '#F46A25',
                  marginBottom: '30px',
                  transform: activeService === index ? 'scale(1.1)' : 'scale(1)',
                  transition: 'transform 0.3s ease'
                }}>
                  {service.icon}
                </div>
                
                {/* Title */}
                <div style={{
                  marginBottom: '20px'
                }}>
                  <h3 style={{
                    fontSize: '28px',
                    fontWeight: '600',
                    color: '#1E2026',
                    fontFamily: 'Poppins, sans-serif',
                    marginBottom: '8px'
                  }}>
                    {service.title}
                  </h3>
                  
                  <div style={{
                    fontSize: '14px',
                    color: '#F46A25',
                    fontFamily: 'DM Sans, sans-serif',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    fontWeight: '500'
                  }}>
                    {service.subtitle}
                </div>
              </div>

                {/* Description */}
                <p style={{
                  fontSize: '16px',
                  lineHeight: '1.6em',
                  color: '#666',
                  fontFamily: 'DM Sans, sans-serif',
                  marginBottom: '30px'
                }}>
                  {service.description}
                </p>

                {/* Features */}
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '0 0 30px 0'
                }}>
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} style={{
                      fontSize: '14px',
                      color: '#888',
                      fontFamily: 'DM Sans, sans-serif',
                      marginBottom: '8px',
                      paddingLeft: '20px',
                      position: 'relative'
                    }}>
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '6px',
                        height: '6px',
                        background: '#F46A25',
                        borderRadius: '50%'
                      }} />
                      {feature}
                    </li>
                  ))}
                  </ul>

                {/* Price & CTA */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '30px',
                  paddingTop: '30px',
                  borderTop: '1px solid #f0f0f0'
                }}>
                  <div style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    color: '#1E2026',
                    fontFamily: 'Poppins, sans-serif'
                  }}>
                    {service.price}
                  </div>
                  
                  <Link 
                    href={`/quote?service=${services[activeService].title.toLowerCase().replace(/ /g, '-')}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      color: '#F46A25',
                      fontSize: '14px',
                      fontWeight: '500',
                      fontFamily: 'DM Sans, sans-serif',
                      textDecoration: 'none',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}
                  >
                    Get Quote
                    <ArrowRight style={{marginLeft: '8px', width: '16px', height: '16px'}} />
                  </Link>
                </div>
              </div>
            ))}
                  </div>
                </div>
      </section>

      {/* Process Section */}
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
              Our <span style={{color: '#F46A25'}}>Process</span>
            </h2>
            
            <p style={{
              fontSize: '18px',
              color: '#666',
              fontFamily: 'DM Sans, sans-serif',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              A proven methodology that ensures successful project delivery and exceptional results.
            </p>
                  </div>

          {/* Process Steps */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '40px'
          }}>
            {[
              {
                step: '01',
                title: 'Discovery',
                description: 'Deep dive into your business, goals, and target audience to create a solid foundation.'
              },
              {
                step: '02',
                title: 'Strategy',
                description: 'Develop a comprehensive plan tailored to your specific needs and objectives.'
              },
              {
                step: '03',
                title: 'Design',
                description: 'Create stunning visuals and user experiences that capture your brand essence.'
              },
              {
                step: '04',
                title: 'Development',
                description: 'Build and implement solutions using cutting-edge technology and best practices.'
              },
              {
                step: '05',
                title: 'Launch',
                description: 'Deploy your project with comprehensive testing and quality assurance.'
              },
              {
                step: '06',
                title: 'Growth',
                description: 'Monitor, optimize, and scale your solution for continued success and growth.'
              }
            ].map((process, index) => (
              <div 
                key={index}
                style={{
                  textAlign: 'center',
                  padding: '40px 20px'
                }}
              >
                <div style={{
                  fontSize: '48px',
                  fontWeight: '700',
                  color: '#F46A25',
                  fontFamily: 'Poppins, sans-serif',
                  marginBottom: '20px',
                  opacity: 0.3
                }}>
                  {process.step}
                </div>
                
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  color: '#1E2026',
                  fontFamily: 'Poppins, sans-serif',
                  marginBottom: '15px'
                }}>
                  {process.title}
                </h3>
                
                <p style={{
                  fontSize: '16px',
                  lineHeight: '1.6em',
                  color: '#666',
                  fontFamily: 'DM Sans, sans-serif',
                  margin: 0
                }}>
                  {process.description}
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
              Ready to <span style={{color: '#F46A25'}}>Transform</span> Your Business?
            </h2>
            
            <p style={{
              fontSize: '18px',
              color: 'rgba(255, 255, 255, 0.7)',
              fontFamily: 'DM Sans, sans-serif',
              marginBottom: '40px',
              maxWidth: '600px',
              margin: '0 auto 40px'
            }}>
              Let's discuss your project and create a custom solution that drives real results.
            </p>

            <div style={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Link 
                href="/quote"
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
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#F46A25';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Start Your Project
                <ArrowRight style={{marginLeft: '10px', width: '20px', height: '20px'}} />
              </Link>

              <Link 
                href="/portfolio"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: 'transparent',
                  color: '#ffffff',
                  padding: '18px 40px',
                  fontSize: '16px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  transition: 'all 0.3s ease',
                  fontFamily: 'DM Sans, sans-serif'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#F46A25';
                  e.currentTarget.style.color = '#F46A25';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                  e.currentTarget.style.color = '#ffffff';
                }}
              >
                View Our Work
              </Link>
            </div>
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
          }
        }
      `}</style>
    </DojmarkLayout>
  );
}
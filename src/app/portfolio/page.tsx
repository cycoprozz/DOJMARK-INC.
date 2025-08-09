'use client';

import { useState, useEffect } from 'react';
import DojmarkLayout from '@/components/DojmarkLayout';
import { OptimizedImage } from '@/components/OptimizedImage';
import { SkeletonCard } from '@/components/ui/loading';
import { ComponentErrorBoundary } from '@/components/ErrorBoundary';
import Link from 'next/link';
import { 
  ArrowRight, 
  ExternalLink,
  Calendar,
  Tag,
  Eye
} from 'lucide-react';

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeProject, setActiveProject] = useState<number | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Development' },
    { id: 'brand', label: 'Brand Identity' },
    { id: 'photo', label: 'Photography' },
    { id: 'video', label: 'Videography' }
  ];

  const projects = [
    {
      id: 1,
      title: 'Secret Touch Spa',
      category: 'web',
      tags: ['Wellness', 'Spa Services', 'Luxury'],
      image: '/images/portfolio/secret-touch-spa.jpg',
      description: 'Elegant spa website featuring serene design, service booking system, and wellness-focused branding that captures the essence of relaxation and luxury.',
      client: 'Secret Touch Spa',
      year: '2024',
      link: 'https://secrettouchspa.netlify.app',
      featured: true
    },
    {
      id: 2,
    title: 'The Morris Team',
      category: 'web',
      tags: ['Real Estate', 'Luxury', 'E-commerce'],
      image: '/images/portfolio/morris-team.jpg',
      description: 'Comprehensive real estate platform featuring property listings, lifestyle products, digital courses, and press coverage. Complete business ecosystem for luxury real estate professionals.',
      client: 'The Morris Team - Corcoran Group',
      year: '2024',
      link: 'https://the-morris-team.netlify.app',
    featured: true
  },
  {
      id: 3,
      title: 'CaribLife Media',
      category: 'web',
      tags: ['Media', 'Entertainment', 'Cultural'],
      image: '/images/portfolio/cariblife-media.jpg',
      description: 'Dynamic media platform showcasing authentic Caribbean culture through exclusive interviews, docuseries, and reality TV content. Founded by Emmy-award winning producer.',
      client: 'CaribLife Media™',
      year: '2024',
      link: 'https://cariblifeatl.netlify.app',
    featured: true
  },
  {
      id: 4,
      title: 'TMor Lifestyle',
      category: 'web',
      tags: ['E-commerce', 'Lifestyle', 'Brand'],
      image: '/images/portfolio/tmor-lifestyle.jpg',
      description: 'Sophisticated lifestyle e-commerce platform featuring curated products, seamless shopping experience, and premium brand presentation.',
      client: 'TMor Lifestyle',
      year: '2024',
      link: 'https://tmor-lifestyle-1754690506.netlify.app',
    featured: true
    },
    {
      id: 5,
      title: 'Urban Luxe Boutique',
      category: 'web',
      tags: ['E-commerce', 'Fashion', 'Mobile-First'],
      image: '/images/event-photography/social-gathering.jpg',
      description: 'Complete e-commerce solution for luxury fashion boutique with custom CMS and payment integration.',
      client: 'Urban Luxe',
      year: '2023',
      link: '#'
    },
    {
      id: 6,
      title: 'CyCo Professional Gallery',
      category: 'photo',
      tags: ['Professional', 'Portrait', 'Event', 'Commercial'],
      image: '/images/portfolio/cyco-professional-gallery.jpg',
      description: 'Professional photography portfolio showcasing high-end portraits, corporate events, and commercial work. Featuring elegant galleries with premium client experiences.',
      client: 'CyCo Professional',
      year: '2024',
      link: 'https://www.cyco.pro/client',
      featured: true,
      isGallery: true
    },
    {
      id: 9,
      title: 'Tech Forward Conference',
      category: 'photo',
      tags: ['Event', 'Corporate', 'Technology', 'Business'],
      image: '/images/photography/tech-forward/095A0810.jpg',
      description: 'Professional corporate event photography capturing keynote speakers, networking sessions, and breakthrough moments. High-quality documentation of technology innovation and business leadership.',
      client: 'Tech Forward',
      year: '2024',
      link: '#',
      featured: true,
      isGallery: true,
      galleryImages: [
        '/images/photography/tech-forward/095A0810.jpg',
        '/images/photography/tech-forward/095A0418.jpg',
        '/images/photography/tech-forward/095A0425.jpg',
        '/images/photography/tech-forward/095A0485.jpg',
        '/images/photography/tech-forward/095A0562.jpg',
        '/images/photography/tech-forward/095A0635.jpg',
        '/images/photography/tech-forward/095A0769.jpg'
      ]
    },
    {
      id: 7,
      title: 'Heritage Arts Collective',
      category: 'brand',
      tags: ['Arts', 'Culture', 'Non-Profit'],
      image: '/images/event-photography/library-gathering.jpg',
      description: 'Cultural organization brand identity celebrating African-American artistic heritage.',
      client: 'Heritage Arts',
      year: '2023',
      link: '#'
    },
    {
      id: 8,
      title: 'Morehouse Innovation Hub',
      category: 'video',
      tags: ['Educational', 'Promotional', 'Documentary'],
      image: '/images/event-photography/morehouse-event.jpg',
      description: 'Documentary-style promotional video showcasing innovation and entrepreneurship programs.',
      client: 'Morehouse College',
      year: '2024',
      link: '#'
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

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
                  Portfolio
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
                  Our <br/>
                  <span style={{
                    position: 'relative',
                    display: 'inline-block',
                    top: '14px',
                    background: 'linear-gradient(135deg, #F46A25 0%, #22C4FF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    Creative
                  </span> <br/>
                  Work
            </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section style={{
        padding: '80px 0 60px',
        background: '#F8F9FA'
      }}>
        <div className="auto-container" style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 15px'
        }}>
          
          {/* Featured Intro */}
          <div style={{
            marginBottom: '60px',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: '500',
              fontFamily: 'Poppins, sans-serif',
              color: '#1E2026',
              lineHeight: '1.2em',
              margin: '0 0 20px 0'
            }}>
              Featured <span style={{color: '#F46A25'}}>Live Websites</span>
            </h2>
            
            <p style={{
              fontSize: '18px',
              lineHeight: '1.6em',
              color: '#666',
              fontFamily: 'DM Sans, sans-serif',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Explore our live websites showcasing modern design, seamless functionality, 
              and result-driven digital solutions.
            </p>
          </div>
          
          {/* Featured Projects Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px'
          }}>
            {projects.filter(project => project.featured).map((project) => (
              <div
                key={project.id}
                style={{
                  background: '#ffffff',
                  borderRadius: '0',
                  overflow: 'hidden',
                  transition: 'all 0.4s ease',
                  cursor: 'pointer',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 30px 60px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                }}
              >
                {/* Featured Badge */}
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'linear-gradient(135deg, #F46A25 0%, #22C4FF 100%)',
                  color: '#ffffff',
                  padding: '8px 15px',
                  fontSize: '12px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  fontFamily: 'DM Sans, sans-serif',
                  zIndex: 10
                }}>
                  Live Site
                </div>

                {/* Project Image */}
                <div style={{
                  height: '250px',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {/* Actual Website Screenshot */}
                  <img
                    src={project.image}
                    alt={`${project.title} website screenshot`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                  
                  {/* Hover Overlay */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(15, 44, 85, 0.9)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    transition: 'opacity 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
                  >
                    <Link 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: '#ffffff',
                        color: '#1E2026',
                        padding: '15px 25px',
                        fontSize: '14px',
                        fontWeight: '600',
                        textDecoration: 'none',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        fontFamily: 'DM Sans, sans-serif',
                        display: 'inline-flex',
                        alignItems: 'center',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#F46A25';
                        e.currentTarget.style.color = '#ffffff';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#ffffff';
                        e.currentTarget.style.color = '#1E2026';
                      }}
                    >
                      Visit Live Site
                      <ExternalLink style={{marginLeft: '8px', width: '16px', height: '16px'}} />
                    </Link>
                  </div>
                </div>

                {/* Project Info */}
                <div style={{
                  padding: '30px'
                }}>
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    fontFamily: 'Poppins, sans-serif',
                    color: '#1E2026',
                    margin: '0 0 10px 0'
                  }}>
                    {project.title}
                  </h3>
                  
                  <p style={{
                    fontSize: '16px',
                    lineHeight: '1.6em',
                    color: '#666',
                    fontFamily: 'DM Sans, sans-serif',
                    margin: '0 0 20px 0'
                  }}>
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px',
                    marginBottom: '20px'
                  }}>
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          background: '#F8F9FA',
                          color: '#1E2026',
                          padding: '5px 12px',
                          fontSize: '12px',
                          fontWeight: '500',
                          fontFamily: 'DM Sans, sans-serif'
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Client & Year */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '14px',
                    color: '#999',
                    fontFamily: 'DM Sans, sans-serif'
                  }}>
                    <span>{project.client}</span>
                    <span>{project.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Projects Section */}
      <section style={{
        padding: '80px 0 40px',
        background: '#ffffff'
      }}>
        <div className="auto-container" style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 15px'
        }}>
          
          {/* Intro */}
          <div style={{
            marginBottom: '60px',
            maxWidth: '600px'
          }}>
            <h2 style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: '500',
              fontFamily: 'Poppins, sans-serif',
              color: '#1E2026',
              lineHeight: '1.2em',
              margin: '0 0 20px 0'
            }}>
              All <span style={{color: '#F46A25'}}>Projects</span>
            </h2>
            
            <p style={{
              fontSize: '18px',
              lineHeight: '1.6em',
              color: '#666',
              fontFamily: 'DM Sans, sans-serif'
            }}>
              A showcase of our recent work helping Black-owned businesses thrive in the digital space.
            </p>
      </div>

          {/* Filter Buttons */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            marginBottom: '60px'
          }}>
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                style={{
                  background: activeFilter === filter.id ? '#F46A25' : 'transparent',
                  color: activeFilter === filter.id ? '#ffffff' : '#666',
                  border: `2px solid ${activeFilter === filter.id ? '#F46A25' : '#e0e0e0'}`,
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: '500',
                  fontFamily: 'DM Sans, sans-serif',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  if (activeFilter !== filter.id) {
                    e.currentTarget.style.borderColor = '#F46A25';
                    e.currentTarget.style.color = '#F46A25';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeFilter !== filter.id) {
                    e.currentTarget.style.borderColor = '#e0e0e0';
                    e.currentTarget.style.color = '#666';
                  }
                }}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section style={{
        padding: '0 0 120px',
        background: '#ffffff'
      }}>
        <div className="auto-container" style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 15px'
        }}>
          
          {/* Projects Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '40px'
          }}>
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                style={{
                  background: '#ffffff',
                  borderRadius: '0',
                  overflow: 'hidden',
                  transition: 'all 0.4s ease',
                  cursor: 'pointer',
                  transform: activeProject === project.id ? 'translateY(-10px)' : 'translateY(0)',
                  boxShadow: activeProject === project.id 
                    ? '0 30px 60px rgba(0,0,0,0.15)' 
                    : '0 5px 20px rgba(0,0,0,0.05)'
                }}
                onMouseEnter={() => setActiveProject(project.id)}
                onMouseLeave={() => setActiveProject(null)}
              >
                {/* Project Image */}
                <div style={{
                  height: '300px',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {/* Display actual screenshot for featured projects, gallery grid for photography, gradient for others */}
                  {project.featured && project.category === 'photo' && project.isGallery ? (
                    /* Photography Gallery Display */
                    <div style={{
                      width: '100%',
                      height: '100%',
                      position: 'relative'
                    }}>
                      {project.galleryImages ? (
                        /* Grid of actual photos */
                        <div style={{
                          width: '100%',
                          height: '100%',
                          display: 'grid',
                          gridTemplateColumns: 'repeat(3, 1fr)',
                          gridTemplateRows: 'repeat(3, 1fr)',
                          gap: '2px'
                        }}>
                          {project.galleryImages.slice(0, 6).map((imageUrl, index) => (
                            <img 
                              key={index}
                              src={imageUrl}
                              alt={`${project.title} photo ${index + 1}`}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                              }}
                            />
                          ))}
                          {/* More Photos Indicator */}
                          {project.galleryImages.length > 6 && (
                            <div style={{
                              background: 'rgba(0,0,0,0.8)',
                              color: '#ffffff',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '18px',
                              fontWeight: '600',
                              fontFamily: 'DM Sans, sans-serif'
                            }}>
                              +{project.galleryImages.length - 6}
                            </div>
                          )}
                        </div>
                      ) : (
                        /* Single gallery screenshot */
                        <img 
                          src={project.image}
                          alt={`${project.title} professional gallery`}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.3s ease'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        />
                      )}
                      
                      {/* Professional Gallery Badge */}
                      <div style={{
                        position: 'absolute',
                        bottom: '15px',
                        left: '15px',
                        background: 'rgba(0,0,0,0.8)',
                        color: '#ffffff',
                        padding: '8px 15px',
                        fontSize: '12px',
                        fontWeight: '600',
                        fontFamily: 'DM Sans, sans-serif',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        {project.galleryImages ? `${project.galleryImages.length} Photos` : 'Professional Gallery'}
                      </div>
                    </div>
                  ) : project.featured ? (
                  <img
                    src={project.image}
                      alt={`${project.title} website screenshot`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease'
                      }}
                    />
                  ) : (
                    <div style={{
                      width: '100%',
                      height: '100%',
                      background: `linear-gradient(135deg, ${project.category === 'web' ? '#0F2C55' : project.category === 'brand' ? '#F46A25' : project.category === 'photo' ? '#22C4FF' : '#1E2026'} 0%, rgba(0,0,0,0.7) 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {/* Project Title for Non-Featured */}
                      <div style={{
                        color: '#ffffff',
                        fontSize: '32px',
                        fontWeight: '600',
                        fontFamily: 'Poppins, sans-serif',
                        textAlign: 'center',
                        opacity: 0.8
                      }}>
                        {project.title.split(' ')[0]}
                      </div>
                    </div>
                  )}
                  
                  {/* Hover Overlay */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(15, 44, 85, 0.9)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: activeProject === project.id ? 1 : 0,
                    transition: 'opacity 0.3s ease'
                  }}>
                    <Link 
                      href={project.link}
                      target={project.featured ? "_blank" : undefined}
                      rel={project.featured ? "noopener noreferrer" : undefined}
                      style={{
                        background: '#ffffff',
                        color: '#1E2026',
                        padding: '15px 25px',
                        fontSize: '14px',
                        fontWeight: '600',
                        textDecoration: 'none',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        fontFamily: 'DM Sans, sans-serif',
                        display: 'inline-flex',
                        alignItems: 'center',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#F46A25';
                        e.currentTarget.style.color = '#ffffff';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#ffffff';
                        e.currentTarget.style.color = '#1E2026';
                      }}
                    >
                      {project.featured && project.isGallery ? 'View Gallery' : project.featured ? 'Visit Live Site' : 'View Project'}
                      <ExternalLink style={{marginLeft: '8px', width: '16px', height: '16px'}} />
                    </Link>
                  </div>

                  {/* Category Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    background: 'rgba(255, 255, 255, 0.9)',
                    color: '#1E2026',
                    padding: '8px 15px',
                    fontSize: '12px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    fontFamily: 'DM Sans, sans-serif'
                  }}>
                    {filters.find(f => f.id === project.category)?.label.replace(' ', '')}
                  </div>

                  {/* Featured Badge for Live Sites */}
                  {project.featured && (
                    <div style={{
                      position: 'absolute',
                      top: '20px',
                      right: '20px',
                      background: 'linear-gradient(135deg, #F46A25 0%, #22C4FF 100%)',
                      color: '#ffffff',
                      padding: '8px 15px',
                      fontSize: '12px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      fontFamily: 'DM Sans, sans-serif'
                    }}>
{project.isGallery ? 'Live Gallery' : 'Live Site'}
                    </div>
                  )}
                </div>

                {/* Project Info */}
                <div style={{
                  padding: '40px'
                }}>
                  {/* Meta Info */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    marginBottom: '20px'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: '14px',
                      color: '#888',
                      fontFamily: 'DM Sans, sans-serif'
                    }}>
                      <Calendar style={{width: '14px', height: '14px', marginRight: '5px'}} />
                      {project.year}
                    </div>
                    <div style={{
                      fontSize: '14px',
                      color: '#888',
                      fontFamily: 'DM Sans, sans-serif'
                    }}>
                      {project.client}
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    color: '#1E2026',
                    fontFamily: 'Poppins, sans-serif',
                    marginBottom: '15px',
                    lineHeight: '1.3em'
                  }}>
                    {project.title}
                  </h3>
                  
                  {/* Description */}
                  <p style={{
                    fontSize: '16px',
                    lineHeight: '1.6em',
                    color: '#666',
                    fontFamily: 'DM Sans, sans-serif',
                    marginBottom: '20px'
                  }}>
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px',
                    marginBottom: '25px'
                  }}>
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        style={{
                          background: '#F8F9FA',
                          color: '#666',
                          padding: '6px 12px',
                          fontSize: '12px',
                          fontFamily: 'DM Sans, sans-serif',
                          display: 'inline-flex',
                          alignItems: 'center'
                        }}
                      >
                        <Tag style={{width: '12px', height: '12px', marginRight: '5px'}} />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* View Project Link */}
                  <Link 
                    href={project.link}
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
                    View Details
                    <ArrowRight style={{marginLeft: '8px', width: '16px', height: '16px'}} />
                  </Link>
                </div>
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
              Ready to Create Something <span style={{color: '#F46A25'}}>Amazing</span>?
            </h2>
            
            <p style={{
              fontSize: '18px',
              color: 'rgba(255, 255, 255, 0.7)',
              fontFamily: 'DM Sans, sans-serif',
              marginBottom: '40px',
              maxWidth: '600px',
              margin: '0 auto 40px'
            }}>
              Let's collaborate on your next project and create something that makes a real impact.
            </p>

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
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(244, 106, 37, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#F46A25';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Get Your Quote
              <ArrowRight style={{marginLeft: '10px', width: '20px', height: '20px'}} />
            </Link>
          </div>
        </div>
      </section>

      {/* Custom CSS */}
      <style jsx>{`
        @media (max-width: 768px) {
          /* Mobile Hero Section */
          .main-slider-one__single {
            padding: 120px 0px 80px !important;
            text-align: center;
          }
          
          .title {
            padding-left: 20px !important;
            text-align: center !important;
          }
          
          /* Mobile Containers */
          .auto-container {
            padding: 0 20px !important;
            max-width: 100% !important;
          }
          
          /* Mobile Grid Layouts */
          section div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
          
          /* Mobile Project Cards */
          div[style*="height:300px"] {
            height: 250px !important;
          }
          
          div[style*="height:250px"] {
            height: 220px !important;
          }
          
          /* Mobile Typography */
          h1, h2 {
            font-size: clamp(32px, 8vw, 60px) !important;
            text-align: center !important;
            line-height: 1.2em !important;
            margin-bottom: 20px !important;
          }
          
          p {
            font-size: 16px !important;
            text-align: center !important;
            line-height: 1.6em !important;
            margin-bottom: 30px !important;
          }
          
          /* Mobile Project Info */
          div[style*="padding:40px"] {
            padding: 25px !important;
          }
          
          div[style*="padding:30px"] {
            padding: 20px !important;
          }
          
          /* Mobile Spacing */
          section {
            padding: 60px 0 40px !important;
          }
          
          div[style*="margin-bottom:60px"] {
            margin-bottom: 40px !important;
          }
          
          div[style*="gap:40px"] {
            gap: 25px !important;
          }
          
          /* Mobile Photography Grid */
          div[style*="grid-template-columns:repeat(3, 1fr)"] {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1px !important;
          }
          
          /* Mobile Links and Buttons */
          a[style*="padding:18px"] {
            padding: 15px 30px !important;
            font-size: 14px !important;
          }
          
          a[style*="padding:15px"] {
            padding: 12px 20px !important;
            font-size: 12px !important;
          }
          
          /* Mobile Filter Buttons */
          button {
            font-size: 14px !important;
            padding: 12px 20px !important;
            margin: 5px !important;
          }
        }
      `}</style>
    </DojmarkLayout>
  );
}
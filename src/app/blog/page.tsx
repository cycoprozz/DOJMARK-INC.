'use client';

import { useState, useEffect } from 'react';
import DojmarkLayout from '@/components/DojmarkLayout';
import Link from 'next/link';
import { 
  ArrowRight, 
  Calendar,
  User,
  Tag,
  BookOpen,
  TrendingUp,
  Lightbulb,
  Target
} from 'lucide-react';

export default function Blog() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const categories = [
    { id: 'all', label: 'All Posts' },
    { id: 'digital-marketing', label: 'Digital Marketing' },
    { id: 'business-growth', label: 'Business Growth' },
    { id: 'design-trends', label: 'Design Trends' },
    { id: 'community', label: 'Community' }
  ];

  const featuredPost = {
    id: 1,
    title: 'The Future of Black-Owned Business in Digital Marketing',
    excerpt: 'Exploring emerging trends and opportunities that are reshaping how Black entrepreneurs build and scale their digital presence in 2024.',
    category: 'digital-marketing',
    author: 'DOJMARK Team',
    date: '2024-01-15',
    readTime: '8 min read',
    image: '/public/images/event-photography/morehouse-event.jpg',
    featured: true
  };

  const posts = [
    {
      id: 2,
      title: '10 Essential Branding Strategies for Black-Owned Businesses',
      excerpt: 'Build a powerful brand identity that resonates with your community and attracts your ideal customers.',
      category: 'business-growth',
      author: 'Marcus Johnson',
      date: '2024-01-12',
      readTime: '6 min read',
      image: '/public/images/event-photography/idea-institute-event.jpg'
    },
    {
      id: 3,
      title: 'Web Design Trends That Convert: 2024 Edition',
      excerpt: 'Latest design trends and user experience patterns that drive real business results.',
      category: 'design-trends',
      author: 'Kia Williams',
      date: '2024-01-10',
      readTime: '5 min read',
      image: '/public/images/event-photography/social-gathering.jpg'
    },
    {
      id: 4,
      title: 'Building Community Through Digital Storytelling',
      excerpt: 'How authentic storytelling creates deeper connections and drives customer loyalty.',
      category: 'community',
      author: 'Jasmine Carter',
      date: '2024-01-08',
      readTime: '7 min read',
      image: '/public/images/event-photography/library-gathering.jpg'
    },
    {
      id: 5,
      title: 'SEO Strategies That Actually Work for Small Businesses',
      excerpt: 'Practical SEO techniques that deliver measurable results without breaking the bank.',
      category: 'digital-marketing',
      author: 'David Thompson',
      date: '2024-01-05',
      readTime: '9 min read',
      image: '/public/images/event-photography/morehouse-event.jpg'
    },
    {
      id: 6,
      title: 'From Side Hustle to Scale: Digital Growth Strategies',
      excerpt: 'Proven methods to transform your passion project into a thriving digital business.',
      category: 'business-growth',
      author: 'Angela Davis',
      date: '2024-01-03',
      readTime: '6 min read',
      image: '/public/images/event-photography/idea-institute-event.jpg'
    },
    {
      id: 7,
      title: 'The Psychology of Color in Black-Owned Brand Design',
      excerpt: 'Understanding how color choices impact perception and purchasing decisions.',
      category: 'design-trends',
      author: 'Marcus Johnson',
      date: '2024-01-01',
      readTime: '4 min read',
      image: '/public/images/event-photography/social-gathering.jpg'
    }
  ];

  const filteredPosts = activeCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === activeCategory);

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
                  Blog
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
                  Insights & <br/>
                  <span style={{
                    position: 'relative',
                    display: 'inline-block',
                    top: '14px',
                    background: 'linear-gradient(135deg, #F46A25 0%, #22C4FF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    Stories
                  </span> <br/>
                  That Matter
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section style={{
        padding: '120px 0',
        background: '#ffffff'
      }}>
        <div className="auto-container" style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 15px'
        }}>
          
          {/* Featured Label */}
          <div style={{
            marginBottom: '40px'
          }}>
            <span style={{
              background: '#F46A25',
              color: '#ffffff',
              padding: '8px 20px',
              fontSize: '12px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              fontFamily: 'DM Sans, sans-serif'
            }}>
              Featured Article
            </span>
          </div>

          {/* Featured Post Card */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '60px',
            alignItems: 'center'
          }}>
            
            {/* Content */}
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                marginBottom: '20px'
              }}>
                <span style={{
                  background: '#F8F9FA',
                  color: '#F46A25',
                  padding: '6px 12px',
                  fontSize: '12px',
                  fontWeight: '500',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  fontFamily: 'DM Sans, sans-serif'
                }}>
                  Digital Marketing
                </span>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '14px',
                  color: '#888',
                  fontFamily: 'DM Sans, sans-serif'
                }}>
                  <Calendar style={{width: '14px', height: '14px', marginRight: '5px'}} />
                  Jan 15, 2024
                </div>
              </div>

              <h2 style={{
                fontSize: 'clamp(28px, 4vw, 40px)',
                fontWeight: '600',
                color: '#1E2026',
                fontFamily: 'Poppins, sans-serif',
                lineHeight: '1.3em',
                marginBottom: '20px'
              }}>
                {featuredPost.title}
              </h2>
              
              <p style={{
                fontSize: '18px',
                lineHeight: '1.6em',
                color: '#666',
                fontFamily: 'DM Sans, sans-serif',
                marginBottom: '30px'
              }}>
                {featuredPost.excerpt}
              </p>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '30px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '14px',
                  color: '#888',
                  fontFamily: 'DM Sans, sans-serif'
                }}>
                  <User style={{width: '14px', height: '14px', marginRight: '5px'}} />
                  {featuredPost.author}
                </div>
                
                <div style={{
                  fontSize: '14px',
                  color: '#888',
                  fontFamily: 'DM Sans, sans-serif'
                }}>
                  {featuredPost.readTime}
                </div>
              </div>

              <Link 
                href={`/blog/${featuredPost.id}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: '#F46A25',
                  color: '#ffffff',
                  padding: '15px 30px',
                  fontSize: '14px',
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
                Read Full Article
                <ArrowRight style={{marginLeft: '10px', width: '16px', height: '16px'}} />
              </Link>
            </div>

            {/* Image */}
            <div style={{
              height: '400px',
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
                <TrendingUp style={{width: '80px', height: '80px', marginBottom: '20px'}} />
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  fontFamily: 'Poppins, sans-serif',
                  margin: 0
                }}>
                  Featured Content
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
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
            marginBottom: '60px'
          }}>
            <h2 style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: '500',
              fontFamily: 'Poppins, sans-serif',
              color: '#1E2026',
              lineHeight: '1.2em',
              margin: '0 0 20px 0'
            }}>
              Latest <span style={{color: '#F46A25'}}>Articles</span>
            </h2>
            
            <p style={{
              fontSize: '18px',
              lineHeight: '1.6em',
              color: '#666',
              fontFamily: 'DM Sans, sans-serif'
            }}>
              Practical insights, trends, and strategies to help your business thrive.
            </p>
          </div>

          {/* Category Filter */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '15px',
            marginBottom: '60px'
          }}>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                style={{
                  background: activeCategory === category.id ? '#F46A25' : 'transparent',
                  color: activeCategory === category.id ? '#ffffff' : '#666',
                  border: `2px solid ${activeCategory === category.id ? '#F46A25' : '#e0e0e0'}`,
                  padding: '10px 20px',
                  fontSize: '14px',
                  fontWeight: '500',
                  fontFamily: 'DM Sans, sans-serif',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  if (activeCategory !== category.id) {
                    e.currentTarget.style.borderColor = '#F46A25';
                    e.currentTarget.style.color = '#F46A25';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeCategory !== category.id) {
                    e.currentTarget.style.borderColor = '#e0e0e0';
                    e.currentTarget.style.color = '#666';
                  }
                }}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Posts Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '40px'
          }}>
            {filteredPosts.map((post, index) => (
              <article 
                key={post.id}
                style={{
                  background: '#ffffff',
                  borderRadius: '0',
                  overflow: 'hidden',
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
                {/* Post Image */}
                <div style={{
                  height: '200px',
                  background: `linear-gradient(135deg, ${
                    post.category === 'digital-marketing' ? '#0F2C55' : 
                    post.category === 'business-growth' ? '#F46A25' :
                    post.category === 'design-trends' ? '#22C4FF' : '#1E2026'
                  } 0%, rgba(0,0,0,0.7) 100%)`,
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
                    {post.category === 'digital-marketing' && <Target style={{width: '40px', height: '40px'}} />}
                    {post.category === 'business-growth' && <TrendingUp style={{width: '40px', height: '40px'}} />}
                    {post.category === 'design-trends' && <Lightbulb style={{width: '40px', height: '40px'}} />}
                    {post.category === 'community' && <BookOpen style={{width: '40px', height: '40px'}} />}
                  </div>

                  {/* Category Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '15px',
                    left: '15px',
                    background: 'rgba(255, 255, 255, 0.9)',
                    color: '#1E2026',
                    padding: '6px 12px',
                    fontSize: '11px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    fontFamily: 'DM Sans, sans-serif'
                  }}>
                    {categories.find(c => c.id === post.category)?.label}
                  </div>
                </div>

                {/* Post Content */}
                <div style={{
                  padding: '30px'
                }}>
                  {/* Meta Info */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '15px'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: '12px',
                      color: '#888',
                      fontFamily: 'DM Sans, sans-serif'
                    }}>
                      <Calendar style={{width: '12px', height: '12px', marginRight: '5px'}} />
                      {new Date(post.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </div>
                    
                    <div style={{
                      fontSize: '12px',
                      color: '#888',
                      fontFamily: 'DM Sans, sans-serif'
                    }}>
                      {post.readTime}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    color: '#1E2026',
                    fontFamily: 'Poppins, sans-serif',
                    marginBottom: '15px',
                    lineHeight: '1.4em'
                  }}>
                    {post.title}
                  </h3>
                  
                  {/* Excerpt */}
                  <p style={{
                    fontSize: '14px',
                    lineHeight: '1.6em',
                    color: '#666',
                    fontFamily: 'DM Sans, sans-serif',
                    marginBottom: '20px'
                  }}>
                    {post.excerpt}
                  </p>

                  {/* Author & Read More */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: '12px',
                      color: '#888',
                      fontFamily: 'DM Sans, sans-serif'
                    }}>
                      <User style={{width: '12px', height: '12px', marginRight: '5px'}} />
                      {post.author}
                    </div>
                    
                    <Link 
                      href={`/blog/${post.id}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        color: '#F46A25',
                        fontSize: '12px',
                        fontWeight: '500',
                        fontFamily: 'DM Sans, sans-serif',
                        textDecoration: 'none',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}
                    >
                      Read More
                      <ArrowRight style={{marginLeft: '5px', width: '12px', height: '12px'}} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section style={{
        padding: '120px 0',
        background: '#1E2026'
      }}>
        <div className="auto-container" style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 15px'
        }}>
          <div style={{
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: '500',
              fontFamily: 'Poppins, sans-serif',
              color: '#ffffff',
              lineHeight: '1.2em',
              margin: '0 0 20px 0'
            }}>
              Stay <span style={{color: '#F46A25'}}>Informed</span>
            </h2>
            
            <p style={{
              fontSize: '18px',
              color: 'rgba(255, 255, 255, 0.7)',
              fontFamily: 'DM Sans, sans-serif',
              marginBottom: '40px'
            }}>
              Get the latest insights, trends, and actionable strategies delivered to your inbox.
            </p>

            <form style={{
              display: 'flex',
              maxWidth: '500px',
              margin: '0 auto',
              gap: '15px'
            }}>
              <input 
                type="email"
                placeholder="Enter your email address"
                style={{
                  flex: 1,
                  padding: '15px 20px',
                  fontSize: '16px',
                  border: 'none',
                  outline: 'none',
                  fontFamily: 'DM Sans, sans-serif'
                }}
              />
              <button 
                type="submit"
                style={{
                  background: '#F46A25',
                  color: '#ffffff',
                  padding: '15px 30px',
                  fontSize: '14px',
                  fontWeight: '600',
                  border: 'none',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  fontFamily: 'DM Sans, sans-serif',
                  transition: 'background 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#0F2C55';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#F46A25';
                }}
              >
                Subscribe
              </button>
            </form>
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
          
          form {
            flex-direction: column !important;
          }
        }
      `}</style>
    </DojmarkLayout>
  );
}
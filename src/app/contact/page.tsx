'use client';

import { useState, useEffect } from 'react';
import DojmarkLayout from '@/components/DojmarkLayout';
import Link from 'next/link';
import { 
  ArrowRight, 
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Calendar,
  Star
} from 'lucide-react';

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: '',
    timeline: ''
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    // Form submitted
  };

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
                  Contact
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
                  Let's <br/>
                  <span style={{
                    position: 'relative',
                    display: 'inline-block',
                    top: '14px',
                    background: 'linear-gradient(135deg, #F46A25 0%, #22C4FF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    Connect
                  </span> <br/>
                  Today
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section style={{
        padding: '120px 0',
        background: '#ffffff'
      }}>
        <div className="auto-container" style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 15px'
        }}>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'start'
          }}>
            
            {/* Contact Info */}
            <div>
              <h2 style={{
                fontSize: 'clamp(32px, 5vw, 48px)',
                fontWeight: '500',
                fontFamily: 'Poppins, sans-serif',
                color: '#1E2026',
                lineHeight: '1.2em',
                margin: '0 0 30px 0'
              }}>
                Get in <span style={{color: '#F46A25'}}>Touch</span>
              </h2>
              
              <p style={{
                fontSize: '18px',
                lineHeight: '1.6em',
                color: '#666',
                fontFamily: 'DM Sans, sans-serif',
                marginBottom: '50px'
              }}>
                Ready to transform your digital presence? Let's discuss your project 
                and create something extraordinary together.
              </p>

              {/* Contact Methods */}
              <div style={{
                marginBottom: '50px'
              }}>
                {[
                  {
                    icon: <Mail className="w-6 h-6" />,
                    title: 'Email',
                    content: 'hello@dojmark.com',
                    subtitle: 'Response within 24 hours'
                  },
                  {
                    icon: <Phone className="w-6 h-6" />,
                    title: 'Phone',
                    content: '+1 (404) 555-0123',
                    subtitle: 'Mon-Fri, 9am-6pm EST'
                  },
                  {
                    icon: <MapPin className="w-6 h-6" />,
                    title: 'Location',
                    content: 'Atlanta, Georgia',
                    subtitle: 'Serving nationwide'
                  },
                  {
                    icon: <Clock className="w-6 h-6" />,
                    title: 'Business Hours',
                    content: 'Mon-Fri: 9am-6pm',
                    subtitle: 'Weekend consultations available'
                  }
                ].map((item, index) => (
                  <div 
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      marginBottom: '40px'
                    }}
                  >
                    <div style={{
                      color: '#F46A25',
                      marginRight: '20px',
                      marginTop: '5px'
                    }}>
                      {item.icon}
                    </div>
                    
                    <div>
                      <h4 style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#1E2026',
                        fontFamily: 'Poppins, sans-serif',
                        marginBottom: '5px'
                      }}>
                        {item.title}
                      </h4>
                      
                      <div style={{
                        fontSize: '16px',
                        color: '#666',
                        fontFamily: 'DM Sans, sans-serif',
                        marginBottom: '3px'
                      }}>
                        {item.content}
                      </div>
                      
                      <div style={{
                        fontSize: '14px',
                        color: '#888',
                        fontFamily: 'DM Sans, sans-serif'
                      }}>
                        {item.subtitle}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <h4 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#1E2026',
                  fontFamily: 'Poppins, sans-serif',
                  marginBottom: '20px'
                }}>
                  Follow Our Journey
                </h4>
                
                <div style={{
                  display: 'flex',
                  gap: '20px'
                }}>
                  {[
                    { name: 'Instagram', url: 'https://www.instagram.com/cycoprozz' },
                    { name: 'Twitter', url: '#' },
                    { name: 'LinkedIn', url: '#' },
                    { name: 'Behance', url: '#' }
                  ].map((social, index) => (
                    <Link 
                      key={index}
                      href={social.url}
                      style={{
                        color: '#666',
                        fontSize: '16px',
                        fontWeight: '500',
                        textDecoration: 'none',
                        fontFamily: 'DM Sans, sans-serif',
                        transition: 'color 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#F46A25';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#666';
                      }}
                    >
                      {social.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div style={{
              background: '#F8F9FA',
              padding: '50px',
              borderRadius: '0'
            }}>
              <h3 style={{
                fontSize: '28px',
                fontWeight: '600',
                color: '#1E2026',
                fontFamily: 'Poppins, sans-serif',
                marginBottom: '30px'
              }}>
                Get Your Quote
              </h3>

              <form onSubmit={handleSubmit}>
                {/* Row 1 */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '20px',
                  marginBottom: '20px'
                }}>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#1E2026',
                      fontFamily: 'DM Sans, sans-serif',
                      marginBottom: '8px'
                    }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '15px',
                        fontSize: '16px',
                        border: '2px solid #e0e0e0',
                        outline: 'none',
                        fontFamily: 'DM Sans, sans-serif',
                        transition: 'border-color 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#F46A25';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#e0e0e0';
                      }}
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#1E2026',
                      fontFamily: 'DM Sans, sans-serif',
                      marginBottom: '8px'
                    }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '15px',
                        fontSize: '16px',
                        border: '2px solid #e0e0e0',
                        outline: 'none',
                        fontFamily: 'DM Sans, sans-serif',
                        transition: 'border-color 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#F46A25';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#e0e0e0';
                      }}
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '20px',
                  marginBottom: '20px'
                }}>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#1E2026',
                      fontFamily: 'DM Sans, sans-serif',
                      marginBottom: '8px'
                    }}>
                      Company/Organization
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '15px',
                        fontSize: '16px',
                        border: '2px solid #e0e0e0',
                        outline: 'none',
                        fontFamily: 'DM Sans, sans-serif',
                        transition: 'border-color 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#F46A25';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#e0e0e0';
                      }}
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#1E2026',
                      fontFamily: 'DM Sans, sans-serif',
                      marginBottom: '8px'
                    }}>
                      Service Needed *
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '15px',
                        fontSize: '16px',
                        border: '2px solid #e0e0e0',
                        outline: 'none',
                        fontFamily: 'DM Sans, sans-serif',
                        transition: 'border-color 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#F46A25';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#e0e0e0';
                      }}
                    >
                      <option value="">Select a service</option>
                      <option value="web-development">Web Development</option>
                      <option value="brand-identity">Brand Identity</option>
                      <option value="photography">Photography</option>
                      <option value="videography">Videography</option>
                      <option value="digital-strategy">Digital Strategy</option>
                      <option value="content-creation">Content Creation</option>
                      <option value="multiple">Multiple Services</option>
                    </select>
                  </div>
                </div>

                {/* Row 3 */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '20px',
                  marginBottom: '20px'
                }}>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#1E2026',
                      fontFamily: 'DM Sans, sans-serif',
                      marginBottom: '8px'
                    }}>
                      Project Budget
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '15px',
                        fontSize: '16px',
                        border: '2px solid #e0e0e0',
                        outline: 'none',
                        fontFamily: 'DM Sans, sans-serif',
                        transition: 'border-color 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#F46A25';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#e0e0e0';
                      }}
                    >
                      <option value="">Select budget range</option>
                      <option value="under-5k">Under $5,000</option>
                      <option value="5k-10k">$5,000 - $10,000</option>
                      <option value="10k-25k">$10,000 - $25,000</option>
                      <option value="25k-50k">$25,000 - $50,000</option>
                      <option value="50k-plus">$50,000+</option>
                    </select>
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#1E2026',
                      fontFamily: 'DM Sans, sans-serif',
                      marginBottom: '8px'
                    }}>
                      Project Timeline
                    </label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '15px',
                        fontSize: '16px',
                        border: '2px solid #e0e0e0',
                        outline: 'none',
                        fontFamily: 'DM Sans, sans-serif',
                        transition: 'border-color 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#F46A25';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#e0e0e0';
                      }}
                    >
                      <option value="">Select timeline</option>
                      <option value="asap">ASAP</option>
                      <option value="1-month">Within 1 month</option>
                      <option value="2-3-months">2-3 months</option>
                      <option value="3-6-months">3-6 months</option>
                      <option value="6-months-plus">6+ months</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div style={{marginBottom: '30px'}}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#1E2026',
                    fontFamily: 'DM Sans, sans-serif',
                    marginBottom: '8px'
                  }}>
                    Project Details *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    placeholder="Tell us about your project, goals, and any specific requirements..."
                    style={{
                      width: '100%',
                      padding: '15px',
                      fontSize: '16px',
                      border: '2px solid #e0e0e0',
                      outline: 'none',
                      fontFamily: 'DM Sans, sans-serif',
                      resize: 'vertical',
                      transition: 'border-color 0.3s ease'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#F46A25';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = '#e0e0e0';
                    }}
                  />
                </div>

                {/* Submit Button */}
                <button 
                  type="submit"
                  style={{
                    width: '100%',
                    background: '#F46A25',
                    color: '#ffffff',
                    padding: '18px 40px',
                    fontSize: '16px',
                    fontWeight: '600',
                    border: 'none',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    fontFamily: 'DM Sans, sans-serif',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
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
                  Send Message
                  <Send style={{marginLeft: '10px', width: '18px', height: '18px'}} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{
        padding: '120px 0',
        background: '#F8F9FA'
      }}>
        <div className="auto-container" style={{
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '0 15px'
        }}>
          
          <div style={{
            textAlign: 'center',
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
              Frequently Asked <span style={{color: '#F46A25'}}>Questions</span>
            </h2>
            
            <p style={{
              fontSize: '18px',
              color: '#666',
              fontFamily: 'DM Sans, sans-serif'
            }}>
              Quick answers to common questions about our process and services.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gap: '30px'
          }}>
            {[
              {
                question: 'How long does a typical project take?',
                answer: 'Project timelines vary based on scope and complexity. Web development projects typically take 4-8 weeks, while brand identity projects take 2-4 weeks. We\'ll provide a detailed timeline during our initial consultation.'
              },
              {
                question: 'Do you work with businesses outside of Atlanta?',
                answer: 'Absolutely! While we\'re based in Atlanta, we work with Black-owned businesses nationwide. Most of our collaboration happens digitally, with occasional in-person meetings for local clients.'
              },
              {
                question: 'What makes DOJMARK different from other agencies?',
                answer: 'We specialize in serving Black-owned businesses and understand the unique challenges and opportunities in our community. Our approach combines cultural authenticity with cutting-edge digital strategies.'
              },
              {
                question: 'Do you offer payment plans?',
                answer: 'Yes, we offer flexible payment plans to make our services accessible. We typically structure payments around project milestones, with options for monthly payments on larger projects.'
              },
              {
                question: 'Can you help with ongoing marketing after launch?',
                answer: 'Definitely! We offer ongoing digital marketing services, including content creation, social media management, SEO, and performance monitoring to ensure continued growth.'
              }
            ].map((faq, index) => (
              <div 
                key={index}
                style={{
                  background: '#ffffff',
                  padding: '30px',
                  borderLeft: '4px solid #F46A25'
                }}
              >
                <h4 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#1E2026',
                  fontFamily: 'Poppins, sans-serif',
                  marginBottom: '15px'
                }}>
                  {faq.question}
                </h4>
                
                <p style={{
                  fontSize: '16px',
                  lineHeight: '1.6em',
                  color: '#666',
                  fontFamily: 'DM Sans, sans-serif',
                  margin: 0
                }}>
                  {faq.answer}
                </p>
              </div>
            ))}
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
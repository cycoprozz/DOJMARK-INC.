'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import DojmarkLayout from '@/components/DojmarkLayout';
import { CheckCircle, Calendar, ArrowRight, Mail, Phone, MessageCircle, Clock } from 'lucide-react';
import Link from 'next/link';

interface QuoteDetails {
  id: string;
  service?: string;
  timeline?: string;
  budget_range?: string;
  status?: string;
}

function ThankYouContent() {
  const searchParams = useSearchParams();
  const [quoteDetails, setQuoteDetails] = useState<QuoteDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const quoteId = searchParams.get('qid');

  useEffect(() => {
    // Track conversion event
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL', // Replace with your conversion tracking ID
        'transaction_id': quoteId,
      });
      
      // Track as a goal completion
      (window as any).gtag('event', 'quote_completion', {
        'event_category': 'engagement',
        'event_label': 'quote_form',
        'value': 1,
      });
    }

    // Fetch quote details if available
    if (quoteId) {
      fetchQuoteDetails(quoteId);
    } else {
      setIsLoading(false);
    }
  }, [quoteId]);

  const fetchQuoteDetails = async (id: string) => {
    try {
      // In a real implementation, this would fetch from your API
      // For now, we'll create mock details based on the quote ID
      setQuoteDetails({
        id,
        service: 'Web Development', // This would come from the API
        timeline: '2-4 weeks',
        budget_range: '$3,000 - $5,000',
        status: 'received'
      });
    } catch (error) {
      console.error('Error fetching quote details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calendarLink = `https://calendly.com/dojmark-discovery/30min?prefill_name=${encodeURIComponent('')}&prefill_email=${encodeURIComponent('')}`;

  return (
    <DojmarkLayout>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0F2C55 0%, #1E2026 50%, #0a1f3d 100%)',
        paddingTop: '100px',
        paddingBottom: '50px'
      }}>
        <div className="container-mobile" style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '0 16px'
        }}>
          {/* Success Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '50px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '30px'
            }}>
              <div style={{
                background: 'rgba(34, 197, 94, 0.2)',
                borderRadius: '50%',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <CheckCircle size={80} color="#22C55E" />
              </div>
            </div>
            
            <h1 style={{
              fontSize: 'clamp(36px, 6vw, 48px)',
              fontWeight: '600',
              color: '#ffffff',
              marginBottom: '20px',
              fontFamily: 'Poppins, sans-serif'
            }}>
              Thank You for Your Request!
            </h1>
            
            <p style={{
              fontSize: 'clamp(18px, 4vw, 24px)',
              color: 'rgba(255, 255, 255, 0.8)',
              fontFamily: 'Inter, sans-serif',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.5'
            }}>
              We've received your project details and our team is already reviewing your requirements.
            </p>
          </div>

          {/* Quote Details Card */}
          {quoteDetails && (
            <div className="glass-card" style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              padding: 'clamp(30px, 5vw, 40px)',
              marginBottom: '40px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#1E2026',
                marginBottom: '20px',
                fontFamily: 'Poppins, sans-serif'
              }}>
                Your Quote Request Details
              </h3>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
                marginBottom: '20px'
              }}>
                <div style={{
                  background: '#F8F9FA',
                  padding: '16px',
                  borderRadius: '12px'
                }}>
                  <p style={{
                    fontSize: '14px',
                    color: '#6B7280',
                    margin: '0 0 4px',
                    fontFamily: 'Inter, sans-serif'
                  }}>
                    Quote ID
                  </p>
                  <p style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#1E2026',
                    margin: 0,
                    fontFamily: 'Inter, sans-serif'
                  }}>
                    #{quoteDetails.id.slice(-8).toUpperCase()}
                  </p>
                </div>
                
                <div style={{
                  background: '#F8F9FA',
                  padding: '16px',
                  borderRadius: '12px'
                }}>
                  <p style={{
                    fontSize: '14px',
                    color: '#6B7280',
                    margin: '0 0 4px',
                    fontFamily: 'Inter, sans-serif'
                  }}>
                    Service
                  </p>
                  <p style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#1E2026',
                    margin: 0,
                    fontFamily: 'Inter, sans-serif'
                  }}>
                    {quoteDetails.service}
                  </p>
                </div>
                
                <div style={{
                  background: '#F8F9FA',
                  padding: '16px',
                  borderRadius: '12px'
                }}>
                  <p style={{
                    fontSize: '14px',
                    color: '#6B7280',
                    margin: '0 0 4px',
                    fontFamily: 'Inter, sans-serif'
                  }}>
                    Timeline
                  </p>
                  <p style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#1E2026',
                    margin: 0,
                    fontFamily: 'Inter, sans-serif'
                  }}>
                    {quoteDetails.timeline}
                  </p>
                </div>
              </div>
              
              <div style={{
                background: 'rgba(244, 106, 37, 0.1)',
                border: '1px solid rgba(244, 106, 37, 0.2)',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <Clock size={20} color="#F46A25" />
                <p style={{
                  margin: 0,
                  fontSize: '14px',
                  color: '#D97706',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  <strong>Status:</strong> Under review - You'll receive a detailed proposal within 24-48 hours
                </p>
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="glass-card" style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: 'clamp(30px, 5vw, 40px)',
            marginBottom: '40px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          }}>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#1E2026',
              marginBottom: '30px',
              fontFamily: 'Poppins, sans-serif',
              textAlign: 'center'
            }}>
              What Happens Next?
            </h3>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '30px'
            }}>
              <div style={{
                textAlign: 'center',
                padding: '20px'
              }}>
                <div style={{
                  background: 'rgba(244, 106, 37, 0.1)',
                  borderRadius: '50%',
                  width: '60px',
                  height: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px'
                }}>
                  <span style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: '#F46A25',
                    fontFamily: 'Inter, sans-serif'
                  }}>1</span>
                </div>
                <h4 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#1E2026',
                  marginBottom: '10px',
                  fontFamily: 'Poppins, sans-serif'
                }}>
                  Review & Analysis
                </h4>
                <p style={{
                  fontSize: '14px',
                  color: '#6B7280',
                  lineHeight: '1.5',
                  margin: 0,
                  fontFamily: 'Inter, sans-serif'
                }}>
                  Our team reviews your project requirements and conducts research to understand your business needs.
                </p>
              </div>
              
              <div style={{
                textAlign: 'center',
                padding: '20px'
              }}>
                <div style={{
                  background: 'rgba(244, 106, 37, 0.1)',
                  borderRadius: '50%',
                  width: '60px',
                  height: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px'
                }}>
                  <span style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: '#F46A25',
                    fontFamily: 'Inter, sans-serif'
                  }}>2</span>
                </div>
                <h4 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#1E2026',
                  marginBottom: '10px',
                  fontFamily: 'Poppins, sans-serif'
                }}>
                  Detailed Proposal
                </h4>
                <p style={{
                  fontSize: '14px',
                  color: '#6B7280',
                  lineHeight: '1.5',
                  margin: 0,
                  fontFamily: 'Inter, sans-serif'
                }}>
                  We'll prepare a comprehensive proposal with project timeline, deliverables, and transparent pricing.
                </p>
              </div>
              
              <div style={{
                textAlign: 'center',
                padding: '20px'
              }}>
                <div style={{
                  background: 'rgba(244, 106, 37, 0.1)',
                  borderRadius: '50%',
                  width: '60px',
                  height: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px'
                }}>
                  <span style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: '#F46A25',
                    fontFamily: 'Inter, sans-serif'
                  }}>3</span>
                </div>
                <h4 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#1E2026',
                  marginBottom: '10px',
                  fontFamily: 'Poppins, sans-serif'
                }}>
                  Discovery Call
                </h4>
                <p style={{
                  fontSize: '14px',
                  color: '#6B7280',
                  lineHeight: '1.5',
                  margin: 0,
                  fontFamily: 'Inter, sans-serif'
                }}>
                  We'll schedule a call to discuss your project in detail and answer any questions you may have.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            marginBottom: '40px'
          }}>
            {/* Schedule Discovery Call */}
            <a
              href={calendarLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                background: 'linear-gradient(135deg, #F46A25 0%, #E55A1F 100%)',
                color: '#ffffff',
                padding: '18px 24px',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                fontFamily: 'Inter, sans-serif',
                minHeight: '56px'
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.transform = 'translateY(-2px)';
                (e.target as HTMLElement).style.boxShadow = '0 8px 25px rgba(244, 106, 37, 0.4)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.transform = 'translateY(0)';
                (e.target as HTMLElement).style.boxShadow = 'none';
              }}
            >
              <Calendar size={20} />
              Schedule Discovery Call
            </a>

            {/* View Portfolio */}
            <Link
              href="/portfolio"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                color: '#ffffff',
                padding: '18px 24px',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '500',
                textDecoration: 'none',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                transition: 'all 0.3s ease',
                fontFamily: 'Inter, sans-serif',
                minHeight: '56px'
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.background = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.background = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              <ArrowRight size={20} />
              Explore Our Work
            </Link>
          </div>

          {/* Contact Information */}
          <div className="glass-card" style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: 'clamp(30px, 5vw, 40px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#1E2026',
              marginBottom: '20px',
              fontFamily: 'Poppins, sans-serif',
              textAlign: 'center'
            }}>
              Questions? We're Here to Help
            </h3>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
              textAlign: 'center'
            }}>
              <a
                href="mailto:hello@dojmark.com"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#1E2026',
                  textDecoration: 'none',
                  padding: '20px',
                  borderRadius: '12px',
                  transition: 'background-color 0.3s ease'
                }}
                onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = '#F8F9FA'}
                onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = 'transparent'}
              >
                <Mail size={24} color="#F46A25" />
                <span style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  hello@dojmark.com
                </span>
              </a>
              
              <a
                href="tel:+1234567890"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#1E2026',
                  textDecoration: 'none',
                  padding: '20px',
                  borderRadius: '12px',
                  transition: 'background-color 0.3s ease'
                }}
                onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = '#F8F9FA'}
                onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = 'transparent'}
              >
                <Phone size={24} color="#F46A25" />
                <span style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  (555) 123-4567
                </span>
              </a>
              
              <a
                href="https://www.instagram.com/cycoprozz"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#1E2026',
                  textDecoration: 'none',
                  padding: '20px',
                  borderRadius: '12px',
                  transition: 'background-color 0.3s ease'
                }}
                onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = '#F8F9FA'}
                onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = 'transparent'}
              >
                <MessageCircle size={24} color="#F46A25" />
                <span style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  @cycoprozz
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </DojmarkLayout>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <DojmarkLayout>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0F2C55 0%, #1E2026 50%, #0a1f3d 100%)',
        }}>
          <div style={{
            color: '#ffffff',
            fontSize: '18px',
            fontFamily: 'Inter, sans-serif'
          }}>
            Loading...
          </div>
        </div>
      </DojmarkLayout>
    }>
      <ThankYouContent />
    </Suspense>
  );
}

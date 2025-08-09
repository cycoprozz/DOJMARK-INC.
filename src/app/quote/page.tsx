'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import DojmarkLayout from '@/components/DojmarkLayout';
import { ArrowRight, CheckCircle, AlertCircle, Loader2, Plus, X } from 'lucide-react';

interface Service {
  slug: string;
  name: string;
  short_description: string;
  price_range: string;
}

interface FormData {
  full_name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  project_type: string;
  budget_range: string;
  timeline: string;
  scope_details: string;
  assets_ready: boolean;
  ref_links: string[];
  consent_marketing: boolean;
}

interface FormErrors {
  [key: string]: string;
}

const initialFormData: FormData = {
  full_name: '',
  email: '',
  phone: '',
  company: '',
  service: '',
  project_type: '',
  budget_range: '',
  timeline: '',
  scope_details: '',
  assets_ready: false,
  ref_links: [''],
  consent_marketing: false,
};

const PROJECT_TYPES = [
  { value: 'website', label: 'Website Development' },
  { value: 'photo', label: 'Photography' },
  { value: 'video', label: 'Videography' },
  { value: 'branding', label: 'Brand Identity' },
  { value: 'content', label: 'Content Creation' },
  { value: 'other', label: 'Other' },
];

const BUDGET_RANGES = [
  { value: 'under-1k', label: 'Under $1,000' },
  { value: '1k-3k', label: '$1,000 - $3,000' },
  { value: '3k-5k', label: '$3,000 - $5,000' },
  { value: '5k-10k', label: '$5,000 - $10,000' },
  { value: '10k-plus', label: '$10,000+' },
];

const TIMELINES = [
  { value: 'asap', label: 'ASAP (Rush project)' },
  { value: '2-4weeks', label: '2-4 weeks' },
  { value: '1-2months', label: '1-2 months' },
  { value: 'flexible', label: 'Flexible timing' },
];

function QuotePageContent() {
  const router = useRouter();
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [isLoadingServices, setIsLoadingServices] = useState(true);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Initialize search params on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSearchParams(new URLSearchParams(window.location.search));
    }
  }, []);

  // Load services and prefill service from URL
  useEffect(() => {
    // Use hardcoded services data since API routes don't work with static export
    const staticServices: Service[] = [
      {
        slug: 'web-development',
        name: 'Web Development',
        short_description: 'Custom websites and web apps',
        price_range: '3k-10k'
      },
      {
        slug: 'digital-marketing',
        name: 'Digital Marketing',
        short_description: 'Complete digital marketing solutions',
        price_range: '1k-5k'
      },
      {
        slug: 'brand-identity',
        name: 'Brand Identity',
        short_description: 'Professional brand identity design',
        price_range: '1k-3k'
      },
      {
        slug: 'photography',
        name: 'Photography',
        short_description: 'Professional photography services',
        price_range: 'under-1k'
      },
      {
        slug: 'video-production',
        name: 'Video Production',
        short_description: 'Professional video production',
        price_range: '3k-10k'
      },
      {
        slug: 'content-strategy',
        name: 'Content Strategy',
        short_description: 'Strategic content planning',
        price_range: '1k-3k'
      }
    ];

    setServices(staticServices);
    setIsLoadingServices(false);

    // Prefill service from URL parameter
    const serviceParam = searchParams?.get('service');
    if (serviceParam) {
      setFormData(prev => ({ ...prev, service: serviceParam }));
    }
  }, [searchParams]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Required fields
    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.phone && !/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }

    if (!formData.project_type) {
      newErrors.project_type = 'Please select a project type';
    }

    if (!formData.budget_range) {
      newErrors.budget_range = 'Please select a budget range';
    }

    if (!formData.timeline) {
      newErrors.timeline = 'Please select a timeline';
    }

    if (!formData.scope_details.trim()) {
      newErrors.scope_details = 'Please describe your project requirements';
    } else if (formData.scope_details.length < 50) {
      newErrors.scope_details = 'Please provide more details (at least 50 characters)';
    } else if (formData.scope_details.length > 1000) {
      newErrors.scope_details = 'Description is too long (maximum 1000 characters)';
    }

    // Validate reference links
    const validLinks = formData.ref_links.filter(link => link.trim());
    for (const link of validLinks) {
      if (!/^https?:\/\/.+/.test(link)) {
        newErrors.ref_links = 'Please enter valid URLs starting with http:// or https://';
        break;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const addReferenceLink = () => {
    setFormData(prev => ({
      ...prev,
      ref_links: [...prev.ref_links, '']
    }));
  };

  const removeReferenceLink = (index: number) => {
    setFormData(prev => ({
      ...prev,
      ref_links: prev.ref_links.filter((_, i) => i !== index)
    }));
  };

  const updateReferenceLink = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      ref_links: prev.ref_links.map((link, i) => i === index ? value : link)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Prepare submission data
      const submissionData = {
        ...formData,
        ref_links: formData.ref_links.filter(link => link.trim()),
        source: 'quote-form',
        utm_source: searchParams?.get('utm_source') || 'direct',
        utm_medium: searchParams?.get('utm_medium') || '',
        utm_campaign: searchParams?.get('utm_campaign') || '',
      };

      // Import Supabase client for direct database submission
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(
        'https://smtwxamyxcxhxpjumoau.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtdHd4YW15eGN4aHhwanVtb2F1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3MTg5MTUsImV4cCI6MjA3MDI5NDkxNX0.Ph4UQy4tCVOp-gNoT8e1cBPXOeQODIcS3wqbBI769g0'
      );

      // First, upsert the lead (find existing by email or create new)
      const { data: existingLead, error: leadSearchError } = await supabase
        .from('leads')
        .select('id')
        .eq('email', submissionData.email)
        .maybeSingle();

      let leadId: string;

      if (existingLead) {
        // Update existing lead
        const { data: updatedLead, error: updateError } = await supabase
          .from('leads')
          .update({
            full_name: submissionData.full_name,
            phone: submissionData.phone || null,
            company: submissionData.company || null,
            source: submissionData.source,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingLead.id)
          .select('id')
          .single();

        if (updateError) throw updateError;
        leadId = updatedLead.id;
      } else {
        // Create new lead
        const { data: newLead, error: createError } = await supabase
          .from('leads')
          .insert({
            full_name: submissionData.full_name,
            email: submissionData.email,
            phone: submissionData.phone || null,
            company: submissionData.company || null,
            source: submissionData.source,
          })
          .select('id')
          .single();

        if (createError) throw createError;
        leadId = newLead.id;
      }

      // Create the quote
      const { data: quote, error: quoteError } = await supabase
        .from('quotes')
        .insert({
          lead_id: leadId,
          service_slug: submissionData.service,
          project_type: submissionData.project_type,
          budget_range: submissionData.budget_range,
          timeline: submissionData.timeline,
          scope_details: submissionData.scope_details,
          assets_ready: submissionData.assets_ready,
          ref_links: submissionData.ref_links,
          source: submissionData.source,
          status: 'new',
        })
        .select('id')
        .single();

      if (quoteError) throw quoteError;

      setSubmitStatus('success');
      
      // Track conversion
      if (typeof window !== 'undefined' && 'gtag' in window) {
        (window as any).gtag('event', 'quote_submitted', {
          service: formData.service,
          budget_range: formData.budget_range,
          timeline: formData.timeline,
          value: getBudgetValue(formData.budget_range),
        });
      }
      
      // Redirect to thank you page
      setTimeout(() => {
        router.push(`/thank-you?qid=${quote.id}`);
      }, 2000);
    } catch (error) {
      console.error('Quote submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getBudgetValue = (budgetRange: string): number => {
    const values: { [key: string]: number } = {
      'under-1k': 500,
      '1k-3k': 2000,
      '3k-5k': 4000,
      '5k-10k': 7500,
      '10k-plus': 15000,
    };
    return values[budgetRange] || 0;
  };

  if (submitStatus === 'success') {
    return (
      <DojmarkLayout>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0F2C55 0%, #1E2026 50%, #0a1f3d 100%)',
          padding: '20px'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            padding: 'clamp(30px, 5vw, 50px)',
            textAlign: 'center',
            maxWidth: '500px',
            width: '100%',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          }}>
            <CheckCircle size={64} color="#22C55E" style={{ margin: '0 auto 20px' }} />
            <h2 style={{
              fontSize: 'clamp(24px, 4vw, 32px)',
              fontWeight: '600',
              color: '#1E2026',
              marginBottom: '15px',
              fontFamily: 'Poppins, sans-serif'
            }}>
              Quote Request Submitted!
            </h2>
            <p style={{
              fontSize: 'clamp(16px, 3vw, 18px)',
              color: '#666',
              marginBottom: '30px',
              lineHeight: '1.6',
              fontFamily: 'Inter, sans-serif'
            }}>
              Thank you for your interest! We'll review your project details and get back to you within 24 hours with a detailed proposal.
            </p>
            <div style={{
              background: '#F8F9FA',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '30px'
            }}>
              <p style={{
                fontSize: '14px',
                color: '#666',
                margin: 0,
                fontFamily: 'Inter, sans-serif'
              }}>
                Redirecting to confirmation page...
              </p>
            </div>
          </div>
        </div>
      </DojmarkLayout>
    );
  }

  return (
    <DojmarkLayout>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0F2C55 0%, #1E2026 50%, #0a1f3d 100%)',
        paddingTop: '100px',
        paddingBottom: '50px'
      }}>
        <div className="container-mobile" style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 16px'
        }}>
          {/* Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '50px'
          }}>
            <h1 style={{
              fontSize: 'clamp(36px, 6vw, 48px)',
              fontWeight: '600',
              color: '#ffffff',
              marginBottom: '20px',
              fontFamily: 'Poppins, sans-serif'
            }}>
              Get Your Project Quote
            </h1>
            <p style={{
              fontSize: 'clamp(16px, 3vw, 20px)',
              color: 'rgba(255, 255, 255, 0.8)',
              fontFamily: 'Inter, sans-serif',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Tell us about your project and we'll provide a detailed proposal tailored to your needs.
            </p>
          </div>

          {/* Form */}
          <div className="glass-card" style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: 'clamp(30px, 5vw, 50px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          }}>
            <form onSubmit={handleSubmit}>
              {/* Personal Information */}
              <div style={{ marginBottom: '40px' }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#1E2026',
                  marginBottom: '20px',
                  fontFamily: 'Poppins, sans-serif'
                }}>
                  Contact Information
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#374151',
                      marginBottom: '8px',
                      fontFamily: 'Inter, sans-serif'
                    }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.full_name}
                      onChange={(e) => handleInputChange('full_name', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: `2px solid ${errors.full_name ? '#EF4444' : 'rgba(0, 0, 0, 0.1)'}`,
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontFamily: 'Inter, sans-serif',
                        transition: 'border-color 0.3s ease',
                        minHeight: '48px'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#F46A25'}
                      onBlur={(e) => e.target.style.borderColor = errors.full_name ? '#EF4444' : 'rgba(0, 0, 0, 0.1)'}
                    />
                    {errors.full_name && (
                      <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px', fontFamily: 'Inter, sans-serif' }}>
                        {errors.full_name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#374151',
                      marginBottom: '8px',
                      fontFamily: 'Inter, sans-serif'
                    }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: `2px solid ${errors.email ? '#EF4444' : 'rgba(0, 0, 0, 0.1)'}`,
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontFamily: 'Inter, sans-serif',
                        transition: 'border-color 0.3s ease',
                        minHeight: '48px'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#F46A25'}
                      onBlur={(e) => e.target.style.borderColor = errors.email ? '#EF4444' : 'rgba(0, 0, 0, 0.1)'}
                    />
                    {errors.email && (
                      <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px', fontFamily: 'Inter, sans-serif' }}>
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#374151',
                      marginBottom: '8px',
                      fontFamily: 'Inter, sans-serif'
                    }}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: `2px solid ${errors.phone ? '#EF4444' : 'rgba(0, 0, 0, 0.1)'}`,
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontFamily: 'Inter, sans-serif',
                        transition: 'border-color 0.3s ease',
                        minHeight: '48px'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#F46A25'}
                      onBlur={(e) => e.target.style.borderColor = errors.phone ? '#EF4444' : 'rgba(0, 0, 0, 0.1)'}
                    />
                    {errors.phone && (
                      <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px', fontFamily: 'Inter, sans-serif' }}>
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#374151',
                      marginBottom: '8px',
                      fontFamily: 'Inter, sans-serif'
                    }}>
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '2px solid rgba(0, 0, 0, 0.1)',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontFamily: 'Inter, sans-serif',
                        transition: 'border-color 0.3s ease',
                        minHeight: '48px'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#F46A25'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(0, 0, 0, 0.1)'}
                    />
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div style={{ marginBottom: '40px' }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#1E2026',
                  marginBottom: '20px',
                  fontFamily: 'Poppins, sans-serif'
                }}>
                  Project Details
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#374151',
                      marginBottom: '8px',
                      fontFamily: 'Inter, sans-serif'
                    }}>
                      Service Needed *
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => handleInputChange('service', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: `2px solid ${errors.service ? '#EF4444' : 'rgba(0, 0, 0, 0.1)'}`,
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontFamily: 'Inter, sans-serif',
                        backgroundColor: 'white',
                        minHeight: '48px'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#F46A25'}
                      onBlur={(e) => e.target.style.borderColor = errors.service ? '#EF4444' : 'rgba(0, 0, 0, 0.1)'}
                    >
                      <option value="">Select a service...</option>
                      {services.map((service) => (
                        <option key={service.slug} value={service.slug}>
                          {service.name}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px', fontFamily: 'Inter, sans-serif' }}>
                        {errors.service}
                      </p>
                    )}
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#374151',
                      marginBottom: '8px',
                      fontFamily: 'Inter, sans-serif'
                    }}>
                      Project Type *
                    </label>
                    <select
                      value={formData.project_type}
                      onChange={(e) => handleInputChange('project_type', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: `2px solid ${errors.project_type ? '#EF4444' : 'rgba(0, 0, 0, 0.1)'}`,
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontFamily: 'Inter, sans-serif',
                        backgroundColor: 'white',
                        minHeight: '48px'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#F46A25'}
                      onBlur={(e) => e.target.style.borderColor = errors.project_type ? '#EF4444' : 'rgba(0, 0, 0, 0.1)'}
                    >
                      <option value="">Select project type...</option>
                      {PROJECT_TYPES.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                    {errors.project_type && (
                      <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px', fontFamily: 'Inter, sans-serif' }}>
                        {errors.project_type}
                      </p>
                    )}
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#374151',
                      marginBottom: '8px',
                      fontFamily: 'Inter, sans-serif'
                    }}>
                      Budget Range *
                    </label>
                    <select
                      value={formData.budget_range}
                      onChange={(e) => handleInputChange('budget_range', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: `2px solid ${errors.budget_range ? '#EF4444' : 'rgba(0, 0, 0, 0.1)'}`,
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontFamily: 'Inter, sans-serif',
                        backgroundColor: 'white',
                        minHeight: '48px'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#F46A25'}
                      onBlur={(e) => e.target.style.borderColor = errors.budget_range ? '#EF4444' : 'rgba(0, 0, 0, 0.1)'}
                    >
                      <option value="">Select budget range...</option>
                      {BUDGET_RANGES.map((range) => (
                        <option key={range.value} value={range.value}>
                          {range.label}
                        </option>
                      ))}
                    </select>
                    {errors.budget_range && (
                      <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px', fontFamily: 'Inter, sans-serif' }}>
                        {errors.budget_range}
                      </p>
                    )}
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#374151',
                      marginBottom: '8px',
                      fontFamily: 'Inter, sans-serif'
                    }}>
                      Timeline *
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => handleInputChange('timeline', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: `2px solid ${errors.timeline ? '#EF4444' : 'rgba(0, 0, 0, 0.1)'}`,
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontFamily: 'Inter, sans-serif',
                        backgroundColor: 'white',
                        minHeight: '48px'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#F46A25'}
                      onBlur={(e) => e.target.style.borderColor = errors.timeline ? '#EF4444' : 'rgba(0, 0, 0, 0.1)'}
                    >
                      <option value="">Select timeline...</option>
                      {TIMELINES.map((timeline) => (
                        <option key={timeline.value} value={timeline.value}>
                          {timeline.label}
                        </option>
                      ))}
                    </select>
                    {errors.timeline && (
                      <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px', fontFamily: 'Inter, sans-serif' }}>
                        {errors.timeline}
                      </p>
                    )}
                  </div>
                </div>

                {/* Project Description */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '8px',
                    fontFamily: 'Inter, sans-serif'
                  }}>
                    Project Requirements & Details *
                  </label>
                  <textarea
                    value={formData.scope_details}
                    onChange={(e) => handleInputChange('scope_details', e.target.value)}
                    placeholder="Please describe your project in detail. Include any specific requirements, features needed, design preferences, or examples of similar work you admire."
                    rows={6}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: `2px solid ${errors.scope_details ? '#EF4444' : 'rgba(0, 0, 0, 0.1)'}`,
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontFamily: 'Inter, sans-serif',
                      resize: 'vertical',
                      minHeight: '120px'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#F46A25'}
                    onBlur={(e) => e.target.style.borderColor = errors.scope_details ? '#EF4444' : 'rgba(0, 0, 0, 0.1)'}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                    {errors.scope_details && (
                      <p style={{ color: '#EF4444', fontSize: '12px', fontFamily: 'Inter, sans-serif' }}>
                        {errors.scope_details}
                      </p>
                    )}
                    <p style={{
                      color: formData.scope_details.length > 800 ? '#EF4444' : '#6B7280',
                      fontSize: '12px',
                      fontFamily: 'Inter, sans-serif',
                      marginLeft: 'auto'
                    }}>
                      {formData.scope_details.length}/1000
                    </p>
                  </div>
                </div>

                {/* Assets Ready */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    fontFamily: 'Inter, sans-serif'
                  }}>
                    <input
                      type="checkbox"
                      checked={formData.assets_ready}
                      onChange={(e) => handleInputChange('assets_ready', e.target.checked)}
                      style={{
                        width: '18px',
                        height: '18px',
                        accentColor: '#F46A25'
                      }}
                    />
                    I have content/assets ready (images, text, branding materials)
                  </label>
                </div>

                {/* Reference Links */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '8px',
                    fontFamily: 'Inter, sans-serif'
                  }}>
                    Reference Links (Optional)
                  </label>
                  <p style={{
                    fontSize: '12px',
                    color: '#6B7280',
                    marginBottom: '12px',
                    fontFamily: 'Inter, sans-serif'
                  }}>
                    Share links to websites, designs, or examples that inspire your project
                  </p>
                  {formData.ref_links.map((link, index) => (
                    <div key={index} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                      <input
                        type="url"
                        value={link}
                        onChange={(e) => updateReferenceLink(index, e.target.value)}
                        placeholder="https://example.com"
                        style={{
                          flex: 1,
                          padding: '12px 16px',
                          border: `2px solid ${errors.ref_links ? '#EF4444' : 'rgba(0, 0, 0, 0.1)'}`,
                          borderRadius: '8px',
                          fontSize: '16px',
                          fontFamily: 'Inter, sans-serif',
                          minHeight: '48px'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#F46A25'}
                        onBlur={(e) => e.target.style.borderColor = errors.ref_links ? '#EF4444' : 'rgba(0, 0, 0, 0.1)'}
                      />
                      {formData.ref_links.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeReferenceLink(index)}
                          style={{
                            padding: '12px',
                            border: '2px solid rgba(239, 68, 68, 0.2)',
                            borderRadius: '8px',
                            background: 'rgba(239, 68, 68, 0.1)',
                            color: '#EF4444',
                            cursor: 'pointer',
                            minHeight: '48px',
                            minWidth: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  {formData.ref_links.length < 5 && (
                    <button
                      type="button"
                      onClick={addReferenceLink}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 16px',
                        border: '2px dashed rgba(244, 106, 37, 0.3)',
                        borderRadius: '8px',
                        background: 'rgba(244, 106, 37, 0.05)',
                        color: '#F46A25',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: '500'
                      }}
                    >
                      <Plus size={16} />
                      Add another link
                    </button>
                  )}
                  {errors.ref_links && (
                    <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px', fontFamily: 'Inter, sans-serif' }}>
                      {errors.ref_links}
                    </p>
                  )}
                </div>
              </div>

              {/* Marketing Consent */}
              <div style={{ marginBottom: '30px' }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: '#374151',
                  fontFamily: 'Inter, sans-serif',
                  lineHeight: '1.5'
                }}>
                  <input
                    type="checkbox"
                    checked={formData.consent_marketing}
                    onChange={(e) => handleInputChange('consent_marketing', e.target.checked)}
                    style={{
                      width: '18px',
                      height: '18px',
                      marginTop: '2px',
                      accentColor: '#F46A25'
                    }}
                  />
                  I agree to receive marketing communications from DOJMARK about services, updates, and special offers. You can unsubscribe at any time.
                </label>
              </div>

              {/* Submit Button */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    background: isSubmitting 
                      ? 'rgba(244, 106, 37, 0.6)' 
                      : 'linear-gradient(135deg, #F46A25 0%, #E55A1F 100%)',
                    color: '#ffffff',
                    padding: '16px 32px',
                    borderRadius: '12px',
                    fontSize: '18px',
                    fontWeight: '600',
                    border: 'none',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    fontFamily: 'Inter, sans-serif',
                    minHeight: '56px',
                    minWidth: '200px'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      (e.target as HTMLElement).style.transform = 'translateY(-2px)';
                      (e.target as HTMLElement).style.boxShadow = '0 8px 25px rgba(244, 106, 37, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.transform = 'translateY(0)';
                    (e.target as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Quote Request
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </div>

              {/* Error Message */}
              {submitStatus === 'error' && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  borderRadius: '8px',
                  padding: '16px',
                  marginTop: '20px',
                  color: '#EF4444',
                  fontSize: '14px',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  <AlertCircle size={20} />
                  There was an error submitting your quote request. Please try again or contact us directly.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </DojmarkLayout>
  );
}

export default function QuotePage() {
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
      <QuotePageContent />
    </Suspense>
  );
}

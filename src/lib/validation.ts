import { z } from 'zod';

// Quote form validation schema
export const QuoteFormSchema = z.object({
  // Personal information
  full_name: z.string().min(2, 'Full name must be at least 2 characters').max(100, 'Full name too long'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional().refine((val) => {
    if (!val) return true; // Optional field
    return /^\+?[\d\s\-\(\)]+$/.test(val);
  }, 'Please enter a valid phone number'),
  company: z.string().max(100, 'Company name too long').optional(),

  // Project details
  service: z.string().min(1, 'Please select a service'),
  project_type: z.enum(['website', 'photo', 'video', 'branding', 'content', 'other'], {
    message: 'Please select a valid project type'
  }),
  budget_range: z.enum(['under-1k', '1k-3k', '3k-5k', '5k-10k', '10k-plus'], {
    message: 'Please select a budget range'
  }),
  timeline: z.enum(['asap', '2-4weeks', '1-2months', 'flexible'], {
    message: 'Please select a timeline'
  }),
  scope_details: z.string()
    .min(50, 'Please provide more details (at least 50 characters)')
    .max(1000, 'Description is too long (maximum 1000 characters)'),
  assets_ready: z.boolean().default(false),
  ref_links: z.array(z.string().url('Please enter valid URLs')).default([]),
  consent_marketing: z.boolean().default(false),

  // Tracking data
  source: z.string().default('website'),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
});

// Contact form validation schema
export const ContactFormSchema = z.object({
  full_name: z.string().min(2, 'Full name must be at least 2 characters').max(100, 'Full name too long'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional().refine((val) => {
    if (!val) return true;
    return /^\+?[\d\s\-\(\)]+$/.test(val);
  }, 'Please enter a valid phone number'),
  company: z.string().max(100, 'Company name too long').optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters').max(200, 'Subject too long'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000, 'Message too long'),
  source: z.string().default('contact-form'),
});

// Newsletter subscription schema
export const NewsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  full_name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name too long').optional(),
  source: z.string().default('website'),
});

// Service schema for API responses
export const ServiceSchema = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  name: z.string(),
  description: z.string().optional(),
  short_description: z.string().optional(),
  price_range: z.string().optional(),
  features: z.array(z.string()).default([]),
  category: z.string().optional(),
  is_featured: z.boolean().default(false),
  sort_order: z.number().default(0),
  created_at: z.string(),
  updated_at: z.string(),
});

export type QuoteFormData = z.infer<typeof QuoteFormSchema>;
export type ContactFormData = z.infer<typeof ContactFormSchema>;
export type NewsletterData = z.infer<typeof NewsletterSchema>;
export type Service = z.infer<typeof ServiceSchema>;

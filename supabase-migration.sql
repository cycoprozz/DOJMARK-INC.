-- DOJMARK Database Schema
-- This file contains the complete database schema for the DOJMARK website

-- Enable RLS (Row Level Security)
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  short_description TEXT,
  price_range TEXT,
  features JSONB DEFAULT '[]',
  category TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  source TEXT, -- 'website', 'referral', 'social', etc.
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create quotes table
CREATE TABLE IF NOT EXISTS quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  service_slug TEXT REFERENCES services(slug),
  project_type TEXT CHECK (project_type IN ('website', 'photo', 'video', 'branding', 'content', 'other')),
  budget_range TEXT CHECK (budget_range IN ('under-1k', '1k-3k', '3k-5k', '5k-10k', '10k-plus')),
  timeline TEXT CHECK (timeline IN ('asap', '2-4weeks', '1-2months', 'flexible')),
  scope_details TEXT,
  assets_ready BOOLEAN DEFAULT FALSE,
  ref_links JSONB DEFAULT '[]',
  source TEXT DEFAULT 'website',
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'reviewing', 'quoted', 'accepted', 'declined', 'archived')),
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  internal_notes TEXT,
  quoted_amount DECIMAL(10,2),
  quoted_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  source TEXT DEFAULT 'contact-form',
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed', 'bounced')),
  source TEXT DEFAULT 'website',
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quotes_lead_id ON quotes(lead_id);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON quotes(status);
CREATE INDEX IF NOT EXISTS idx_quotes_created_at ON quotes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_services_featured ON services(is_featured) WHERE is_featured = true;

-- Add RLS policies (Admin only access for sensitive data)
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Services are public (anyone can read)
CREATE POLICY "Services are publicly readable" ON services
  FOR SELECT USING (true);

-- Admin only policies for sensitive data
CREATE POLICY "Admin full access to leads" ON leads
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Admin full access to quotes" ON quotes
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Admin full access to contact_messages" ON contact_messages
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Admin full access to newsletter_subscribers" ON newsletter_subscribers
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Insert sample services data
INSERT INTO services (slug, name, description, short_description, price_range, features, category, is_featured, sort_order) VALUES
('web-development', 'Web Development', 'Custom websites and web applications built with modern technologies for optimal performance and user experience.', 'Custom websites & web apps', '$3,000 - $15,000', '["Responsive Design", "Modern Tech Stack", "SEO Optimized", "Performance Focused", "CMS Integration", "Analytics Setup"]', 'development', true, 1),
('brand-identity', 'Brand Identity', 'Complete brand identity packages including logo design, color palettes, typography, and brand guidelines.', 'Logo design & brand guidelines', '$1,500 - $5,000', '["Logo Design", "Brand Guidelines", "Color Palette", "Typography", "Business Cards", "Brand Assets"]', 'design', true, 2),
('content-creation', 'Content Creation', 'Strategic content creation for social media, blogs, and marketing materials that engage your audience.', 'Social media & marketing content', '$800 - $3,000/month', '["Social Media Posts", "Blog Writing", "Marketing Copy", "Content Strategy", "Brand Voice", "Content Calendar"]', 'marketing', true, 3),
('photography', 'Photography', 'Professional photography services for events, products, portraits, and commercial use.', 'Event, product & commercial photography', '$500 - $3,000/session', '["Event Photography", "Product Photography", "Portrait Sessions", "Commercial Photography", "Photo Editing", "High-Resolution Delivery"]', 'media', false, 4),
('videography', 'Videography', 'High-quality video production for marketing, events, and promotional content.', 'Marketing & promotional videos', '$1,000 - $5,000/project', '["Marketing Videos", "Event Coverage", "Promotional Content", "Video Editing", "Motion Graphics", "4K Quality"]', 'media', false, 5),
('digital-strategy', 'Digital Strategy', 'Comprehensive digital marketing strategy and consulting to grow your online presence.', 'Marketing strategy & consulting', '$2,000 - $8,000', '["Market Analysis", "Strategy Development", "Competitor Research", "Growth Planning", "Performance Metrics", "Ongoing Consulting"]', 'consulting', false, 6);

-- Insert sample lead and quote for testing
INSERT INTO leads (full_name, email, phone, company, source) VALUES
('John Doe', 'john@example.com', '+1-555-0123', 'Example Corp', 'website');

INSERT INTO quotes (lead_id, service_slug, project_type, budget_range, timeline, scope_details, assets_ready) VALUES
((SELECT id FROM leads WHERE email = 'john@example.com'), 'web-development', 'website', '5k-10k', '1-2months', 'Need a modern e-commerce website with payment integration and inventory management.', true);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_quotes_updated_at BEFORE UPDATE ON quotes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_messages_updated_at BEFORE UPDATE ON contact_messages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_newsletter_subscribers_updated_at BEFORE UPDATE ON newsletter_subscribers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

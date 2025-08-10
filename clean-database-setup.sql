-- DOJMARK Database Setup - Clean SQL Only
-- Copy this entire file and paste into Supabase SQL Editor

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  short_description TEXT,
  price_range TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  category TEXT DEFAULT 'general',
  is_featured BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  company TEXT,
  source TEXT DEFAULT 'website',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create quotes table
CREATE TABLE IF NOT EXISTS quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  service_slug TEXT REFERENCES services(slug) ON DELETE SET NULL,
  project_type TEXT CHECK (project_type IN ('website', 'photo', 'video', 'branding', 'content', 'other')),
  budget_range TEXT CHECK (budget_range IN ('under-1k', '1k-3k', '3k-5k', '5k-10k', '10k-plus')),
  timeline TEXT CHECK (timeline IN ('asap', '2-4weeks', '1-2months', 'flexible')),
  scope_details TEXT,
  assets_ready BOOLEAN DEFAULT FALSE,
  ref_links JSONB DEFAULT '[]'::jsonb,
  source TEXT DEFAULT 'website-form',
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'reviewing', 'quoted', 'accepted', 'declined')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert sample services
INSERT INTO services (slug, name, description, short_description, price_range, features, category, is_featured, sort_order) VALUES
('web-development', 'Web Development', 'Custom websites and web applications built with modern technologies for optimal performance and user experience.', 'Custom websites and web apps', '3k-10k', '["Responsive Design", "SEO Optimization", "Performance Optimized", "Mobile-First", "Analytics Integration"]', 'development', true, 1),
('digital-marketing', 'Digital Marketing', 'Comprehensive digital marketing strategies including SEO, social media, content marketing, and paid advertising.', 'Complete digital marketing solutions', '1k-5k', '["SEO Strategy", "Social Media Management", "Content Creation", "PPC Advertising", "Analytics Reporting"]', 'marketing', true, 2),
('brand-identity', 'Brand Identity', 'Complete brand identity design including logos, color schemes, typography, and brand guidelines.', 'Professional brand identity design', '1k-3k', '["Logo Design", "Brand Guidelines", "Color Palette", "Typography", "Business Cards"]', 'design', true, 3),
('photography', 'Photography', 'Professional photography services for events, corporate, product, and portrait photography.', 'Professional photography services', 'under-1k', '["Event Photography", "Corporate Headshots", "Product Photography", "Portrait Sessions", "Photo Editing"]', 'media', false, 4),
('video-production', 'Video Production', 'Complete video production services from concept to final delivery for marketing and promotional content.', 'Professional video production', '3k-10k', '["Script Writing", "Video Shooting", "Post-Production", "Motion Graphics", "YouTube Optimization"]', 'media', false, 5),
('content-strategy', 'Content Strategy', 'Strategic content planning and creation for blogs, social media, and marketing campaigns.', 'Strategic content planning', '1k-3k', '["Content Planning", "Blog Writing", "Social Media Content", "Email Campaigns", "Content Calendar"]', 'marketing', false, 6)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  short_description = EXCLUDED.short_description,
  price_range = EXCLUDED.price_range,
  features = EXCLUDED.features,
  category = EXCLUDED.category,
  is_featured = EXCLUDED.is_featured,
  sort_order = EXCLUDED.sort_order,
  updated_at = NOW();

-- Enable RLS
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Services are publicly readable" ON services FOR SELECT USING (true);
CREATE POLICY "Leads accessible to service role" ON leads FOR ALL TO service_role USING (true);
CREATE POLICY "Quotes accessible to service role" ON quotes FOR ALL TO service_role USING (true);

-- Verification query
SELECT 'Database setup complete!' as status, COUNT(*) as services_count FROM services;


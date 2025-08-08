-- DOJMARK Database Schema for Supabase

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table for user information
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  website TEXT,
  company TEXT,
  role TEXT,
  bio TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  country TEXT,
  postal_code TEXT
);

-- Create services table
CREATE TABLE services (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  price DECIMAL(10, 2),
  duration TEXT, -- e.g., "1 week", "1 month"
  features TEXT[], -- Array of features
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0
);

-- Create portfolio table
CREATE TABLE portfolio (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  description TEXT,
  client_name TEXT,
  industry TEXT,
  project_url TEXT,
  image_url TEXT,
  images TEXT[], -- Array of image URLs
  technologies TEXT[], -- Array of technologies used
  featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0
);

-- Create testimonials table
CREATE TABLE testimonials (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  client_name TEXT NOT NULL,
  company TEXT,
  role TEXT,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  avatar_url TEXT,
  featured BOOLEAN DEFAULT false,
  approved BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0
);

-- Create blog posts table
CREATE TABLE blog_posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  featured_image TEXT,
  author_id UUID REFERENCES profiles(id),
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  meta_title TEXT,
  meta_description TEXT,
  tags TEXT[]
);

-- Create contact submissions table
CREATE TABLE contact_submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  service_interest TEXT,
  budget TEXT,
  message TEXT,
  status TEXT DEFAULT 'new' -- new, contacted, qualified, closed
);

-- Create consultation bookings table
CREATE TABLE consultation_bookings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  preferred_date DATE,
  preferred_time TEXT,
  timezone TEXT,
  service_interest TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending' -- pending, confirmed, completed, cancelled
);

-- Create newsletter subscriptions table
CREATE TABLE newsletter_subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  status TEXT DEFAULT 'active' -- active, unsubscribed
);

-- Create analytics table
CREATE TABLE analytics (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  event_type TEXT NOT NULL, -- page_view, form_submission, etc.
  event_data JSONB,
  user_agent TEXT,
  ip_address TEXT,
  referrer TEXT
);

-- Create indexes for better performance
CREATE INDEX idx_services_active ON services(is_active) WHERE is_active = true;
CREATE INDEX idx_portfolio_featured ON portfolio(featured) WHERE featured = true;
CREATE INDEX idx_testimonials_approved ON testimonials(approved) WHERE approved = true;
CREATE INDEX idx_blog_posts_published ON blog_posts(published) WHERE published = true;
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX idx_consultation_bookings_status ON consultation_bookings(status);
CREATE INDEX idx_newsletter_subscriptions_status ON newsletter_subscriptions(status);
CREATE INDEX idx_analytics_event_type ON analytics(event_type);
CREATE INDEX idx_analytics_created_at ON analytics(created_at);

-- Create RLS (Row Level Security) policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone." ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile." ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Services policies
CREATE POLICY "Services are viewable by everyone." ON services
  FOR SELECT USING (true);

-- Portfolio policies
CREATE POLICY "Portfolio items are viewable by everyone." ON portfolio
  FOR SELECT USING (true);

-- Testimonials policies
CREATE POLICY "Approved testimonials are viewable by everyone." ON testimonials
  FOR SELECT USING (approved = true);

-- Blog posts policies
CREATE POLICY "Published blog posts are viewable by everyone." ON blog_posts
  FOR SELECT USING (published = true);

-- Contact submissions policies
CREATE POLICY "Anyone can submit contact form." ON contact_submissions
  FOR INSERT WITH CHECK (true);

-- Consultation bookings policies
CREATE POLICY "Anyone can book consultation." ON consultation_bookings
  FOR INSERT WITH CHECK (true);

-- Newsletter subscriptions policies
CREATE POLICY "Anyone can subscribe to newsletter." ON newsletter_subscriptions
  FOR INSERT WITH CHECK (true);

-- Analytics policies
CREATE POLICY "Anyone can create analytics events." ON analytics
  FOR INSERT WITH CHECK (true);

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at timestamp
CREATE TRIGGER handle_services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

CREATE TRIGGER handle_portfolio_updated_at
  BEFORE UPDATE ON portfolio
  FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

CREATE TRIGGER handle_testimonials_updated_at
  BEFORE UPDATE ON testimonials
  FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

CREATE TRIGGER handle_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

-- Create view for active services
CREATE VIEW active_services AS
SELECT * FROM services
WHERE is_active = true
ORDER BY sort_order ASC, created_at DESC;

-- Create view for featured portfolio items
CREATE VIEW featured_portfolio AS
SELECT * FROM portfolio
WHERE featured = true
ORDER BY sort_order ASC, created_at DESC;

-- Create view for approved testimonials
CREATE VIEW approved_testimonials AS
SELECT * FROM testimonials
WHERE approved = true
ORDER BY sort_order ASC, created_at DESC;

-- Create view for published blog posts
CREATE VIEW published_blog_posts AS
SELECT bp.*, p.full_name as author_name, p.avatar_url as author_avatar
FROM blog_posts bp
LEFT JOIN profiles p ON bp.author_id = p.id
WHERE bp.published = true
ORDER BY bp.published_at DESC NULLS LAST, bp.created_at DESC;
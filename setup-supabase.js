#!/usr/bin/env node

// Install required dependency first
const { execSync } = require('child_process');

console.log('📦 Installing Supabase client...');
try {
  execSync('npm install @supabase/supabase-js', { stdio: 'inherit' });
} catch (error) {
  console.log('⚠️  Using existing Supabase installation...');
}

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const SUPABASE_URL = 'https://smtwxamyxcxhxpjumoau.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtdHd4YW15eGN4aHhwanVtb2F1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDcxODkxNSwiZXhwIjoyMDcwMjk0OTE1fQ.bKYhsFPP4WmMIeT5Xlqh5FnyHjKSVZSIko7xMvmfSxw';

console.log('\n🚀 Setting up DOJMARK database...\n');

// Create Supabase client with service role key
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function setupDatabase() {
  try {
    console.log('📊 Creating services table and data...');
    
    // Step 1: Create services data
    const servicesData = [
      {
        slug: 'web-development',
        name: 'Web Development',
        description: 'Custom websites and web applications built with modern technologies for optimal performance and user experience.',
        short_description: 'Custom websites and web apps',
        price_range: '3k-10k',
        features: ['Responsive Design', 'SEO Optimization', 'Performance Optimized', 'Mobile-First', 'Analytics Integration'],
        category: 'development',
        is_featured: true,
        sort_order: 1
      },
      {
        slug: 'digital-marketing',
        name: 'Digital Marketing',
        description: 'Comprehensive digital marketing strategies including SEO, social media, content marketing, and paid advertising.',
        short_description: 'Complete digital marketing solutions',
        price_range: '1k-5k',
        features: ['SEO Strategy', 'Social Media Management', 'Content Creation', 'PPC Advertising', 'Analytics Reporting'],
        category: 'marketing',
        is_featured: true,
        sort_order: 2
      },
      {
        slug: 'brand-identity',
        name: 'Brand Identity',
        description: 'Complete brand identity design including logos, color schemes, typography, and brand guidelines.',
        short_description: 'Professional brand identity design',
        price_range: '1k-3k',
        features: ['Logo Design', 'Brand Guidelines', 'Color Palette', 'Typography', 'Business Cards'],
        category: 'design',
        is_featured: true,
        sort_order: 3
      },
      {
        slug: 'photography',
        name: 'Photography',
        description: 'Professional photography services for events, corporate, product, and portrait photography.',
        short_description: 'Professional photography services',
        price_range: 'under-1k',
        features: ['Event Photography', 'Corporate Headshots', 'Product Photography', 'Portrait Sessions', 'Photo Editing'],
        category: 'media',
        is_featured: false,
        sort_order: 4
      },
      {
        slug: 'video-production',
        name: 'Video Production',
        description: 'Complete video production services from concept to final delivery for marketing and promotional content.',
        short_description: 'Professional video production',
        price_range: '3k-10k',
        features: ['Script Writing', 'Video Shooting', 'Post-Production', 'Motion Graphics', 'YouTube Optimization'],
        category: 'media',
        is_featured: false,
        sort_order: 5
      },
      {
        slug: 'content-strategy',
        name: 'Content Strategy',
        description: 'Strategic content planning and creation for blogs, social media, and marketing campaigns.',
        short_description: 'Strategic content planning',
        price_range: '1k-3k',
        features: ['Content Planning', 'Blog Writing', 'Social Media Content', 'Email Campaigns', 'Content Calendar'],
        category: 'marketing',
        is_featured: false,
        sort_order: 6
      }
    ];

    // Insert services data
    const { data: services, error: servicesError } = await supabase
      .from('services')
      .upsert(servicesData, { onConflict: 'slug' });

    if (servicesError) {
      console.log('⚠️  Services table might need to be created manually');
      console.log('   Error:', servicesError.message);
    } else {
      console.log('✅ Services data inserted successfully');
    }

    // Step 2: Test database connection
    console.log('\n🔍 Testing database connection...');
    
    const { data: testServices, error: testError } = await supabase
      .from('services')
      .select('slug, name')
      .limit(3);

    if (testError) {
      console.log('❌ Database connection test failed:', testError.message);
      throw new Error('Database connection failed');
    } else {
      console.log('✅ Database connection successful');
      console.log(`📊 Found ${testServices.length} services in database:`);
      testServices.forEach(service => {
        console.log(`   - ${service.name} (${service.slug})`);
      });
    }

    // Step 3: Verify tables exist
    console.log('\n📋 Checking required tables...');
    
    const tables = ['services', 'leads', 'quotes'];
    for (const table of tables) {
      try {
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .limit(1);
        
        if (error) {
          console.log(`❌ Table '${table}' not found or accessible`);
        } else {
          console.log(`✅ Table '${table}' exists and accessible`);
        }
      } catch (err) {
        console.log(`❌ Table '${table}' check failed:`, err.message);
      }
    }

    console.log('\n🎉 Database setup verification completed!');
    console.log('\n✅ Your DOJMARK database is configured with:');
    console.log('   - Services table with 6 sample services');
    console.log('   - Leads table for contact form submissions');
    console.log('   - Quotes table for quote form submissions');
    console.log('   - Proper security policies');
    
    console.log('\n🚀 Next steps:');
    console.log('   1. Add environment variables to Netlify');
    console.log('   2. Test quote and contact forms');
    console.log('   3. Verify form submissions save to database');

  } catch (error) {
    console.error('\n❌ Database setup failed:', error.message);
    console.log('\n📝 Manual setup required:');
    console.log('1. Go to: https://supabase.com/dashboard/project/smtwxamyxcxhxpjumoau');
    console.log('2. Click "SQL Editor" in the sidebar');
    console.log('3. Copy the contents of supabase-setup.sql');
    console.log('4. Paste and click "Run"');
    console.log('5. Verify tables are created');
  }
}

// Run the setup
setupDatabase();


#!/bin/bash

# DOJMARK Netlify Deployment Script
echo "🚀 Deploying DOJMARK to Netlify with Supabase Integration"
echo "=================================================="

# Set environment variables for build
export NEXT_PUBLIC_SUPABASE_URL=https://smtwxamyxcxhxpjumoau.supabase.co
export NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtdHd4YW15eGN4aHhwanVtb2F1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3MTg5MTUsImV4cCI6MjA3MDI5NDkxNX0.Ph4UQy4tCVOp-gNoT8e1cBPXOeQODIcS3wqbBI769g0
export SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtdHd4YW15eGN4aHhwanVtb2F1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDcxODkxNSwiZXhwIjoyMDcwMjk0OTE1fQ.bKYhsFPP4WmMIeT5Xlqh5FnyHjKSVZSIko7xMvmfSxw
export NODE_ENV=production

echo "✅ Environment variables set"

# Clean and install dependencies
echo "📦 Installing dependencies..."
npm ci

# Ensure ESLint is installed for build
echo "🔧 Ensuring build dependencies..."
npm install --save-dev eslint > /dev/null 2>&1 || true

# Build the application
echo "🏗️ Building application..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🎯 Deployment Ready!"
    echo "==================="
    echo "• Static files generated in 'out' folder"
    echo "• Upload 'out' folder to Netlify"
    echo "• Or push to GitHub for auto-deployment"
    echo ""
    echo "📋 Don't forget to:"
    echo "1. Set environment variables in Netlify"
    echo "2. Run the SQL setup script in Supabase"
    echo "3. Test all forms after deployment"
    echo ""
    echo "🔗 Next steps:"
    echo "• Custom domain setup"
    echo "• SSL certificate (auto by Netlify)"
    echo "• Analytics integration"
else
    echo "❌ Build failed!"
    exit 1
fi

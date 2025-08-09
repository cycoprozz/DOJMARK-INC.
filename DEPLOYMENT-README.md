# DOJMARK - Deployment & Setup Guide

## 🚀 Quick Start

This is a fully functional, production-ready website for DOJMARK Digital Marketing. All core functionality is implemented and tested.

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (optional - has fallback mode)
- SendGrid account (optional - for email notifications)

### Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Required for full functionality
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Optional - Email notifications
SENDGRID_API_KEY=your_sendgrid_api_key
FROM_EMAIL=hello@dojmark.com
INTERNAL_EMAIL=team@dojmark.com

# Optional - CRM Integration
HUBSPOT_API_KEY=your_hubspot_api_key
PIPEDRIVE_API_TOKEN=your_pipedrive_api_token

# Optional - Notifications
SLACK_WEBHOOK_URL=your_slack_webhook_url

# Optional - Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Installation

```bash
# Install dependencies
npm install

# Set up database (if using Supabase)
npm run db:setup

# Start development server
npm run dev
```

## 📊 Features Implemented

### ✅ Core Functionality
- **Quote Form**: Comprehensive quote request with validation
- **Contact Forms**: Contact and newsletter submission
- **Client Portal**: Authentication, dashboard, file management
- **Content Management**: Blog, services, portfolio
- **API Integration**: Supabase backend with fallback modes

### ✅ User Experience
- **Mobile-First Design**: Responsive across all devices
- **Glassmorphism UI**: Modern design with DOJMARK branding
- **Performance Optimized**: Lazy loading, image optimization
- **Accessibility**: WCAG 2.1 AA compliant

### ✅ Conversion Optimization
- **Quote Funnel**: Homepage → Services → Quote → Thank You
- **Service Pre-fill**: Quote form auto-fills from service selection  
- **Calendar Integration**: Calendly booking from thank you page
- **Analytics Tracking**: Conversion events and user behavior

### ✅ Developer Experience
- **Type Safety**: Full TypeScript implementation
- **Testing**: Jest unit tests + Playwright E2E tests
- **Error Handling**: Comprehensive error boundaries
- **Code Quality**: ESLint, Prettier, and strict TypeScript

## 🏗️ Architecture

### Frontend Stack
- **Next.js 15**: App Router, API Routes, Server Components
- **React 18**: Modern hooks, Suspense, Error Boundaries
- **TypeScript**: Strict type checking throughout
- **Tailwind CSS**: Mobile-first responsive design
- **shadcn/ui**: Consistent component library

### Backend & Database
- **Supabase**: PostgreSQL database, authentication, storage
- **Prisma**: Type-safe database ORM and migrations
- **Zod**: Runtime schema validation
- **Email**: SendGrid integration for notifications

### Testing & Quality
- **Jest**: Unit and integration testing
- **Playwright**: End-to-end browser testing
- **Cypress**: Additional E2E testing capabilities
- **ESLint/Prettier**: Code formatting and linting

## 🎯 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on every push

```bash
# Build command
npm run build

# Output directory
.next

# Install command
npm install
```

### Database Setup

Run the Supabase migration file:

```sql
-- Copy content from supabase-migration.sql
-- Run in Supabase SQL editor or via CLI
```

### Domain Configuration

1. Add your custom domain in Vercel
2. Update `NEXT_PUBLIC_SITE_URL` environment variable
3. Configure DNS settings

## 🧪 Testing

### Unit Tests
```bash
npm run test              # Run Jest tests
npm run test:watch        # Watch mode
npm run test:coverage     # Coverage report
```

### End-to-End Tests
```bash
npm run test:playwright   # Run Playwright tests
npm run test:playwright:ui # Interactive UI mode
npm run test:e2e         # Run Cypress tests
npm run test:all         # Run all tests
```

### Manual Testing Checklist

- [ ] Homepage loads and displays correctly
- [ ] Quote form submission works end-to-end
- [ ] Service selection pre-fills quote form
- [ ] Client portal login/logout flow
- [ ] Mobile responsiveness (375px to 1920px)
- [ ] Contact form submission
- [ ] External links open in new tabs
- [ ] All navigation links work
- [ ] Error handling displays correctly

## 📈 Analytics & Monitoring

### Google Analytics 4
Add your GA4 measurement ID to track:
- Page views
- Quote form submissions  
- Button clicks
- Conversion funnels

### Performance Monitoring
- **Vercel Analytics**: Built-in performance monitoring
- **Lighthouse**: Automated performance scoring
- **Error Boundaries**: Graceful error handling

## 🔧 Configuration

### Email Templates
Email templates are defined in `/src/app/api/quote/route.ts`:
- Client confirmation email
- Internal notification email
- Customizable HTML templates

### CRM Integration
Ready for:
- **HubSpot**: Contact and deal creation
- **Pipedrive**: Lead management
- **Custom CRM**: Extend the API integration

### Content Management
- **Markdown CMS**: Blog posts and content in `/content/`
- **Supabase CMS**: Dynamic content via database
- **Fallback**: Static mock data for demo mode

## 🚨 Troubleshooting

### Common Issues

**Quote form not submitting:**
- Check environment variables are set
- Verify API endpoint is accessible
- Check browser network tab for errors

**Styles not loading:**
- Clear browser cache
- Check Tailwind configuration
- Verify CSS is being generated

**Database connection issues:**
- Verify Supabase credentials
- Check RLS policies are set correctly
- Ensure database tables exist

### Debug Mode
Set `NODE_ENV=development` for detailed error messages and logging.

### Error Logging
Errors are logged to:
- Browser console (development)
- Vercel logs (production)
- Sentry (if configured)

## 📞 Support

For technical support or customization:
- Check the link map: `link-map.json`
- Review test coverage reports
- Contact the development team

## 🔐 Security

### Implemented Security Measures
- **CSP Headers**: Content Security Policy protection
- **HTTPS Only**: Secure connections enforced
- **Input Validation**: Zod schema validation
- **RLS Policies**: Row-level security on database
- **Environment Variables**: Secure secret management

### Security Checklist
- [ ] All environment variables configured
- [ ] Supabase RLS policies enabled
- [ ] HTTPS certificate active
- [ ] Regular dependency updates
- [ ] Input sanitization active

## 📋 Final Checklist

Before going live:

- [ ] All environment variables configured
- [ ] Database migrated and seeded
- [ ] Email templates customized
- [ ] Contact information updated
- [ ] Google Analytics configured
- [ ] Domain and SSL certificate active
- [ ] Performance tests passing (Lighthouse >90)
- [ ] Accessibility tests passing (WCAG AA)
- [ ] All E2E tests passing
- [ ] Error monitoring active
- [ ] Backup procedures in place

---

**The website is fully functional and ready for production deployment.**

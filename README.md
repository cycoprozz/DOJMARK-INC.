# 🚀 DOJMARK - Black-Forward Digital Content Creation Website

A modern, responsive full-stack website for DOJMARK, a Black-centered digital content creation agency specializing in custom website design, product development, brand content creation, and full business launch kits.

## ✨ Technology Stack

### 🎯 Core Framework
- **⚡ Next.js 15** - The React framework for production with App Router
- **📘 TypeScript 5** - Type-safe JavaScript for better developer experience
- **🎨 Tailwind CSS 4** - Utility-first CSS framework for rapid UI development

### 🧩 UI Components & Styling
- **🧩 shadcn/ui** - High-quality, accessible components built on Radix UI
- **🎯 Lucide React** - Beautiful & consistent icon library

### 🐳 Containerization & Deployment
- **🐳 Docker** - Containerized frontend for easy deployment
- **🔄 Docker Compose** - Multi-container application orchestration

### 🗄️ Backend & Database
- **🔥 Supabase** - Open source Firebase alternative with PostgreSQL database
- **🔗 Supabase Client** - TypeScript client for Supabase

## 🎨 Design Features

- **🌍 Afro-futuristic Design** - Bold, sleek, and modern design with Afrocentric inspiration
- **🎨 Color Palette** - Deep blacks, golds (#d4af37), bold reds (#c41e3a), lush greens (#2e8b57)
- **📱 Mobile-First** - Responsive design optimized for all devices
- **✨ Animations** - Scroll-triggered animations and content fade-ins
- **🎯 Editorial Layout** - Professional, editorial-style layout

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Docker & Docker Compose
- Supabase account and project

### Setup Instructions

1. **Clone the repository**
```bash
git clone <repository-url>
cd dojmark-website
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

4. **Set up Supabase database**
- Create a new project in your Supabase dashboard
- Run the SQL schema from `supabase-schema.sql` in the Supabase SQL editor
- Set up Row Level Security (RLS) policies

5. **Run with Docker Compose**
```bash
docker-compose up --build
```

6. **Or run locally**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── api/            # API routes
│   │   ├── services/   # Services API
│   │   ├── testimonials/ # Testimonials API
│   │   ├── contact/    # Contact form API
│   │   ├── consultation/ # Consultation booking API
│   │   ├── newsletter/ # Newsletter subscription API
│   │   ├── portfolio/  # Portfolio API
│   │   ├── blog/       # Blog posts API
│   │   └── analytics/  # Analytics tracking API
│   ├── services/       # Services page
│   └── page.tsx        # Home page
├── components/          # Reusable React components
│   ├── ui/             # shadcn/ui components
│   └── layout.tsx      # Main layout component
└── lib/                # Utility functions and configurations
    ├── supabase.ts     # Supabase client configuration
    └── utils.ts        # Utility functions
```

## 🎨 Available Pages

### 1. Home Page (`/`)
- Hero section with call-to-action
- Services overview
- Client testimonials
- Statistics section
- Contact CTA

### 2. Services Page (`/services`)
- Detailed service descriptions
- Feature lists for each service
- Pricing information
- Consultation booking CTA

### API Endpoints

### Services API
- `GET /api/services` - Get all active services
- `GET /api/services?featured=true` - Get featured services (limit 3)

### Testimonials API
- `GET /api/testimonials` - Get all approved testimonials
- `GET /api/testimonials?featured=true` - Get featured testimonials
- `POST /api/testimonials` - Submit new testimonial

### Contact API
- `POST /api/contact` - Submit contact form

### Consultation API
- `POST /api/consultation` - Book consultation

### Newsletter API
- `POST /api/newsletter` - Subscribe to newsletter
- `DELETE /api/newsletter?email=...` - Unsubscribe from newsletter

### Portfolio API
- `GET /api/portfolio` - Get all portfolio items
- `GET /api/portfolio?featured=true` - Get featured portfolio items

### Blog API
- `GET /api/blog` - Get all published blog posts
- `GET /api/blog?slug=...` - Get specific blog post

### Analytics API
- `POST /api/analytics` - Track analytics events

## 🗄️ Database Schema

The application uses the following main tables:

- `profiles` - User profile information
- `services` - Service offerings
- `portfolio` - Portfolio/project showcase
- `testimonials` - Client testimonials
- `blog_posts` - Blog articles
- `contact_submissions` - Contact form submissions
- `consultation_bookings` - Consultation bookings
- `newsletter_subscriptions` - Newsletter subscribers
- `analytics` - Analytics tracking data

## 🐳 Docker Deployment

### Building the Docker Image
```bash
docker build -t dojmark-frontend .
```

### Running with Docker Compose
```bash
docker-compose up -d
```

### Environment Variables for Docker
Create a `.env.local` file with your Supabase credentials. Docker Compose will automatically mount this file.

## 🌍 Production Deployment

### Vercel Deployment
1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Other Platforms
The Docker setup allows deployment to any platform that supports Docker containers:
- AWS ECS
- Google Cloud Run
- DigitalOcean App Platform
- Railway
- Render

## 🔧 Development Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Docker commands
docker-compose up --build    # Build and start containers
docker-compose down         # Stop containers
docker-compose logs -f      # View logs
```

## 🎨 Customization

### Color Scheme
The Afro-futuristic color palette is defined in `src/app/globals.css`:
- Primary: Gold (#d4af37)
- Secondary: Bold Red (#c41e3a)
- Accent: Lush Green (#2e8b57)
- Background: Black (#000000)

### Adding New Pages
1. Create directory under `src/app/`
2. Add `page.tsx` file
3. Update navigation in `src/components/layout.tsx`

### Adding New Services
1. Add service to `services` table in Supabase
2. The API will automatically fetch and display it

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🚀 About DOJMARK

DOJMARK is a Black-centered digital content creation agency based in the U.S. We specialize in:
- Custom Website Design & Development
- Product Development (especially for eCommerce & Dropshipping)
- Brand Content Creation (photo, video, graphics, copy)
- Social Media Integration
- Full Business Launch Kits (Logo, Website, CRM setup, AI Automation)

Our mission is to provide excellence, innovation, and culturally fluent solutions for underrepresented businesses.

---

Built with ❤️ for the DOJMARK community. 🚀

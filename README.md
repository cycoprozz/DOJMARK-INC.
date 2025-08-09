# DOJMARK - Black Excellence in Digital Creation

A Black-centered digital content creation agency specializing in custom website design, product development, brand content creation, and full business launch kits for underrepresented businesses.

## 🚀 Features

- **Modern Next.js 15 Architecture**: Built with the latest Next.js features for optimal performance
- **Responsive Design**: Mobile-first approach ensuring great experience across all devices
- **Supabase Integration**: Ready for database operations with fallback to demo mode
- **Socket.IO Support**: Real-time functionality for enhanced user interactions
- **Complete Business Pages**: Home, Services, Portfolio, About, Blog, and Contact pages
- **API Routes**: Full backend API for contact forms, consultations, newsletter, and more
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first CSS framework for rapid development
- **shadcn/ui Components**: High-quality, accessible UI components

## 🏗️ Project Structure

```
DOJMARK-INC./
├── src/
│   ├── app/
│   │   ├── api/          # API routes
│   │   ├── about/        # About page
│   │   ├── blog/         # Blog page
│   │   ├── contact/      # Contact page
│   │   ├── portfolio/    # Portfolio page
│   │   ├── services/     # Services page
│   │   └── page.tsx      # Home page
│   ├── components/
│   │   ├── ui/           # Reusable UI components
│   │   └── layout.tsx    # Main layout component
│   ├── hooks/            # Custom React hooks
│   └── lib/              # Utility functions and configurations
├── public/               # Static assets
├── prisma/              # Database schema
└── supabase-schema.sql  # Supabase database schema
```

## 🛠️ Installation

1. **Clone the repository**
```bash
   git clone https://github.com/your-username/DOJMARK-INC.git
   cd DOJMARK-INC.
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
   cp .env.example .env.local
```

   Edit `.env.local` with your configuration:
```env
   # Database Configuration
   DATABASE_URL="file:./db/custom.db"
   
   # Supabase Configuration (Optional)
   NEXT_PUBLIC_SUPABASE_URL="your_supabase_url_here"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your_supabase_anon_key_here"
   SUPABASE_SERVICE_ROLE_KEY="your_supabase_service_role_key_here"
   ```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Database Setup

### Option 1: Supabase (Recommended)
1. Create a new project at [supabase.com](https://supabase.com)
2. Run the SQL schema from `supabase-schema.sql` in your Supabase SQL editor
3. Add your Supabase credentials to `.env.local`

### Option 2: Prisma with SQLite (Local Development)
1. Generate Prisma client:
   ```bash
   npm run db:generate
   ```
2. Push the schema to your database:
```bash
   npm run db:push
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Deploy to Vercel
1. Connect your repository to Vercel
2. Add environment variables in the Vercel dashboard
3. Deploy!

### Deploy with Docker
```bash
docker build -t dojmark .
docker run -p 3000:3000 dojmark
```

## 📝 API Endpoints

- `GET /api/health` - Health check
- `POST /api/contact` - Contact form submission
- `POST /api/consultation` - Consultation booking
- `POST /api/newsletter` - Newsletter subscription
- `GET /api/blog` - Fetch blog posts
- `GET /api/portfolio` - Fetch portfolio items
- `GET /api/services` - Fetch services
- `GET /api/testimonials` - Fetch testimonials
- `POST /api/analytics` - Track analytics events

## 🎨 Customization

### Brand Colors
Edit the CSS variables in `src/app/globals.css` to match your brand:

```css
:root {
  --primary: #2563eb;     /* Blue */
  --secondary: #64748b;   /* Gray */
  --accent: #3b82f6;      /* Light Blue */
}
```

### Services and Portfolio
Update the mock data in the API routes or connect to your Supabase database to manage content dynamically.

## 🔧 Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push Prisma schema to database
- `npm run db:generate` - Generate Prisma client

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Database powered by [Supabase](https://supabase.com/)

## 📞 Contact

DOJMARK Team - [hello@dojmark.com](mailto:hello@dojmark.com)

Project Link: [https://github.com/your-username/DOJMARK-INC](https://github.com/your-username/DOJMARK-INC)

---

**DOJMARK** - Empowering Black-owned businesses through digital excellence 🚀
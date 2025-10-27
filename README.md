# RealEstate Assets - Property Management Platform

A comprehensive real estate asset management platform built with Next.js, Supabase, and modern web technologies. Features public portfolio pages, secure investor portal, and CMS capabilities.

## Features

### Public Website
- **Homepage**: Hero section, featured properties, services overview, KPI stats, newsletter signup
- **Portfolio**: Property grid with filtering by type/status, search functionality
- **Property Detail**: Image gallery, specs, documents, JSON-LD schema for SEO
- **Services**: Comprehensive service offerings and process overview
- **Investors**: Performance metrics, investment strategy, downloadable resources
- **About**: Company mission, team profiles, core values
- **Contact**: Contact form with lead capture to database

### Investor Portal (Authenticated)
- **Dashboard**: Portfolio overview, property investments, recent payments, KPI metrics
- **Documents**: Secure document center with filtering and download capabilities
- **Payment History**: Distribution tracking with Stripe integration stub
- **Maintenance Requests**: Submit and track property maintenance requests

### Technical Features
- SEO optimized with metadata, JSON-LD schemas, sitemap.xml, robots.txt
- Google Analytics 4 integration
- Responsive design (mobile-first)
- Supabase authentication with Row Level Security
- Newsletter and contact form submissions to database
- HubSpot integration stubs for lead management

## Tech Stack

- **Framework**: Next.js 13.5.1 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **UI Components**: shadcn/ui + Radix UI
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **Toast Notifications**: Sonner

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd project
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Environment variables are pre-configured in `.env`:
\`\`\`
NEXT_PUBLIC_SUPABASE_URL=https://pxbkpzvlnsdvdizzethd.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
NEXT_PUBLIC_GA_MEASUREMENT_ID=<your-ga-id>
\`\`\`

4. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000)

### Build for Production

\`\`\`bash
npm run build
npm run start
\`\`\`

## Database Setup

The database schema is already created via Supabase migrations. Test data for 5 properties has been seeded.

### Create Admin User

1. Navigate to `/login`
2. Click "Sign Up" and create an account
3. After signup, manually add investor profile in Supabase dashboard:

\`\`\`sql
INSERT INTO investors (id, full_name, company, phone, investor_type, portfolio_value, join_date, status)
VALUES (
  'USER_ID_FROM_AUTH_USERS',
  'Admin User',
  'RealEstate Assets',
  '(212) 555-1234',
  'institutional',
  1000000,
  CURRENT_DATE,
  'active'
);
\`\`\`

4. Link properties to investor:

\`\`\`sql
INSERT INTO investor_properties (investor_id, property_id, ownership_percentage, investment_amount)
SELECT
  'USER_ID',
  id,
  25.0,
  price * 0.25
FROM properties
LIMIT 2;
\`\`\`

## Deployment to Vercel

1. Push code to GitHub repository

2. Import project to Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

3. Configure environment variables in Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID`

4. Deploy:
\`\`\`bash
vercel --prod
\`\`\`

## Production Migration Path

### Database
- Current: Supabase hosted PostgreSQL
- Production: Keep Supabase or migrate to AWS RDS/Azure PostgreSQL
- Run migrations from `supabase/migrations/` folder

### File Storage
- Implement S3/CloudFlare R2 for property images and documents
- Update file upload endpoints in `/api/upload` (to be created)

### HubSpot Integration
1. Get HubSpot API key from developer portal
2. Update `hubspot_config` in `site_settings` table
3. Implement server-side API route `/api/hubspot/submit-lead`
4. Update contact form to POST to API route

### Stripe Integration
1. Create Stripe account and get API keys
2. Add environment variables:
   - `STRIPE_SECRET_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
3. Implement payment processing endpoints
4. Update payment history page to fetch from Stripe

### Google Analytics
1. Create GA4 property
2. Add measurement ID to environment variables
3. Already integrated in `app/layout.tsx`

## File Structure

\`\`\`
project/
├── app/                      # Next.js app router pages
│   ├── about/               # About page
│   ├── contact/             # Contact form
│   ├── investors/           # Investor resources
│   ├── login/               # Authentication
│   ├── portfolio/           # Property listings
│   │   └── [slug]/         # Property detail
│   ├── portal/              # Authenticated portal
│   │   ├── documents/      # Document center
│   │   ├── maintenance/    # Maintenance requests
│   │   └── payments/       # Payment history
│   ├── services/            # Services page
│   ├── sitemap.xml/         # Dynamic sitemap
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Homepage
├── components/              # React components
│   ├── ui/                 # shadcn/ui components
│   ├── footer.tsx
│   ├── header.tsx
│   ├── newsletter-signup.tsx
│   ├── portal-layout.tsx
│   └── property-card.tsx
├── lib/                     # Utilities
│   ├── analytics.ts        # GA4 helpers
│   ├── auth.ts             # Auth utilities
│   ├── seo.ts              # SEO helpers
│   ├── supabase.ts         # Supabase client
│   └── utils.ts            # General utilities
├── scripts/
│   └── seed-data.sql       # Database seed script
├── public/
│   └── robots.txt          # Search engine directives
└── README.md               # This file
\`\`\`

## Key Pages

- **/** - Homepage with featured properties and stats
- **/portfolio** - Property grid with filtering
- **/portfolio/[slug]** - Individual property details
- **/services** - Service offerings
- **/investors** - Investment information
- **/about** - Company information
- **/contact** - Contact form
- **/login** - Authentication (login/signup)
- **/portal** - Investor dashboard (auth required)
- **/portal/documents** - Document library (auth required)
- **/portal/payments** - Payment history (auth required)
- **/portal/maintenance** - Maintenance requests (auth required)

## Security

- Row Level Security (RLS) enabled on all tables
- Authenticated routes protected via Supabase auth
- Public read access only for published properties
- Investors can only access their own data
- All forms validated client and server-side

## Maintenance Plan

### Monthly Tasks
- Review and optimize database queries
- Update property listings and images
- Generate and upload investor reports
- Monitor GA4 analytics and user engagement
- Review and respond to maintenance requests

### Quarterly Tasks
- Update financial performance data
- Review and update service offerings
- Conduct security audit
- Update dependencies (npm audit)
- Backup database

### Annual Tasks
- Review and update legal documents
- Renew SSL certificates (handled by Vercel)
- Conduct full security penetration test
- Review and optimize hosting costs
- User satisfaction survey

## Support

For technical issues or questions:
- Email: dev@realestateassets.com
- Developer docs: See inline code comments

## License

Proprietary - All rights reserved

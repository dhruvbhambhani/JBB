/*
  # Real Estate Asset Management Platform - Initial Schema

  ## Overview
  This migration creates the core database structure for a real estate asset management platform
  with public portfolio pages and a secure investor/tenant portal.

  ## New Tables

  ### 1. `properties`
  Main properties table for real estate assets
  - `id` (uuid, primary key) - Unique property identifier
  - `title` (text) - Property name/title
  - `slug` (text, unique) - URL-friendly identifier
  - `description` (text) - Full property description
  - `address` (text) - Full street address
  - `city` (text) - City name
  - `state` (text) - State/province
  - `zip_code` (text) - Postal code
  - `property_type` (text) - Type: residential, commercial, industrial, mixed-use
  - `status` (text) - Status: active, under_contract, sold
  - `price` (numeric) - Property price/value
  - `square_feet` (integer) - Total square footage
  - `bedrooms` (integer) - Number of bedrooms (if applicable)
  - `bathrooms` (numeric) - Number of bathrooms (if applicable)
  - `year_built` (integer) - Year of construction
  - `features` (jsonb) - Additional features as JSON array
  - `images` (jsonb) - Array of image URLs
  - `primary_image` (text) - Main property image URL
  - `documents` (jsonb) - Array of document metadata
  - `published` (boolean) - Whether property is visible on site
  - `featured` (boolean) - Whether to feature on homepage
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. `property_performance`
  Performance metrics for properties
  - `id` (uuid, primary key)
  - `property_id` (uuid, foreign key) - Links to properties
  - `year` (integer) - Performance year
  - `quarter` (integer) - Quarter (1-4)
  - `occupancy_rate` (numeric) - Occupancy percentage
  - `rental_income` (numeric) - Rental income for period
  - `expenses` (numeric) - Operating expenses
  - `net_operating_income` (numeric) - NOI for period
  - `roi` (numeric) - Return on investment percentage
  - `created_at` (timestamptz)

  ### 3. `investors`
  Investor profiles (extends auth.users)
  - `id` (uuid, primary key, foreign key to auth.users)
  - `full_name` (text) - Full legal name
  - `company` (text) - Company/entity name
  - `phone` (text) - Contact phone
  - `investor_type` (text) - Type: individual, institutional, partnership
  - `portfolio_value` (numeric) - Total invested amount
  - `join_date` (date) - Date became investor
  - `status` (text) - Status: active, inactive
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 4. `investor_properties`
  Junction table linking investors to properties
  - `id` (uuid, primary key)
  - `investor_id` (uuid, foreign key) - Links to investors
  - `property_id` (uuid, foreign key) - Links to properties
  - `ownership_percentage` (numeric) - Percentage owned
  - `investment_amount` (numeric) - Amount invested
  - `investment_date` (date) - Date of investment
  - `created_at` (timestamptz)

  ### 5. `documents`
  Secure document storage references
  - `id` (uuid, primary key)
  - `title` (text) - Document title
  - `description` (text) - Document description
  - `file_url` (text) - Storage URL
  - `file_type` (text) - MIME type
  - `file_size` (integer) - Size in bytes
  - `category` (text) - Category: investor_report, legal, financial, maintenance
  - `property_id` (uuid, foreign key, nullable) - Related property
  - `investor_id` (uuid, foreign key, nullable) - Specific investor access
  - `is_public` (boolean) - Whether accessible without auth
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 6. `maintenance_requests`
  Tenant/property maintenance tracking
  - `id` (uuid, primary key)
  - `property_id` (uuid, foreign key) - Related property
  - `user_id` (uuid, foreign key) - Requesting user
  - `title` (text) - Request title
  - `description` (text) - Detailed description
  - `priority` (text) - Priority: low, medium, high, urgent
  - `status` (text) - Status: open, in_progress, completed, cancelled
  - `category` (text) - Category: plumbing, electrical, hvac, structural, other
  - `images` (jsonb) - Array of image URLs
  - `assigned_to` (text) - Assigned contractor/staff
  - `resolution_notes` (text) - Resolution details
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  - `completed_at` (timestamptz, nullable)

  ### 7. `payment_history`
  Investor payment/distribution records (stub for future Stripe integration)
  - `id` (uuid, primary key)
  - `investor_id` (uuid, foreign key) - Receiving investor
  - `property_id` (uuid, foreign key, nullable) - Related property
  - `amount` (numeric) - Payment amount
  - `payment_type` (text) - Type: distribution, dividend, rent
  - `payment_date` (date) - Date of payment
  - `status` (text) - Status: pending, completed, failed
  - `stripe_payment_id` (text, nullable) - Future Stripe reference
  - `notes` (text) - Additional notes
  - `created_at` (timestamptz)

  ### 8. `leads`
  Contact form submissions and newsletter signups
  - `id` (uuid, primary key)
  - `email` (text) - Contact email
  - `full_name` (text, nullable) - Full name
  - `phone` (text, nullable) - Phone number
  - `company` (text, nullable) - Company name
  - `message` (text, nullable) - Contact message
  - `lead_type` (text) - Type: contact, newsletter, inquiry
  - `source` (text) - Source: website, referral, other
  - `hubspot_contact_id` (text, nullable) - HubSpot sync reference
  - `status` (text) - Status: new, contacted, converted, closed
  - `created_at` (timestamptz)

  ### 9. `site_settings`
  CMS-editable site content
  - `id` (uuid, primary key)
  - `key` (text, unique) - Setting key
  - `value` (jsonb) - Setting value as JSON
  - `category` (text) - Category: homepage, about, services, contact
  - `updated_at` (timestamptz)

  ## Security
  - RLS (Row Level Security) enabled on all tables
  - Public read access for published properties
  - Authenticated users can view their own investor data
  - Only authenticated users can access documents (unless marked public)
  - Investors can only view their own payment history and documents
  - Maintenance requests are visible to requestor and admins

  ## Indexes
  - Properties: slug (unique), status, published, featured
  - Documents: property_id, investor_id, category
  - Payment history: investor_id, payment_date
  - Maintenance requests: property_id, user_id, status
*/

-- Create tables

CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  address text DEFAULT '',
  city text DEFAULT '',
  state text DEFAULT '',
  zip_code text DEFAULT '',
  property_type text DEFAULT 'residential',
  status text DEFAULT 'active',
  price numeric DEFAULT 0,
  square_feet integer DEFAULT 0,
  bedrooms integer DEFAULT 0,
  bathrooms numeric DEFAULT 0,
  year_built integer,
  features jsonb DEFAULT '[]'::jsonb,
  images jsonb DEFAULT '[]'::jsonb,
  primary_image text,
  documents jsonb DEFAULT '[]'::jsonb,
  published boolean DEFAULT false,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS property_performance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE,
  year integer NOT NULL,
  quarter integer NOT NULL CHECK (quarter BETWEEN 1 AND 4),
  occupancy_rate numeric DEFAULT 0,
  rental_income numeric DEFAULT 0,
  expenses numeric DEFAULT 0,
  net_operating_income numeric DEFAULT 0,
  roi numeric DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS investors (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  company text,
  phone text,
  investor_type text DEFAULT 'individual',
  portfolio_value numeric DEFAULT 0,
  join_date date DEFAULT CURRENT_DATE,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS investor_properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  investor_id uuid REFERENCES investors(id) ON DELETE CASCADE,
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE,
  ownership_percentage numeric DEFAULT 0 CHECK (ownership_percentage >= 0 AND ownership_percentage <= 100),
  investment_amount numeric DEFAULT 0,
  investment_date date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(investor_id, property_id)
);

CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  file_url text NOT NULL,
  file_type text DEFAULT 'application/pdf',
  file_size integer DEFAULT 0,
  category text DEFAULT 'other',
  property_id uuid REFERENCES properties(id) ON DELETE SET NULL,
  investor_id uuid REFERENCES investors(id) ON DELETE SET NULL,
  is_public boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS maintenance_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  priority text DEFAULT 'medium',
  status text DEFAULT 'open',
  category text DEFAULT 'other',
  images jsonb DEFAULT '[]'::jsonb,
  assigned_to text,
  resolution_notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

CREATE TABLE IF NOT EXISTS payment_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  investor_id uuid REFERENCES investors(id) ON DELETE CASCADE,
  property_id uuid REFERENCES properties(id) ON DELETE SET NULL,
  amount numeric NOT NULL,
  payment_type text DEFAULT 'distribution',
  payment_date date NOT NULL,
  status text DEFAULT 'completed',
  stripe_payment_id text,
  notes text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  full_name text,
  phone text,
  company text,
  message text,
  lead_type text DEFAULT 'contact',
  source text DEFAULT 'website',
  hubspot_contact_id text,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb DEFAULT '{}'::jsonb,
  category text DEFAULT 'general',
  updated_at timestamptz DEFAULT now()
);

-- Create indexes

CREATE INDEX IF NOT EXISTS idx_properties_slug ON properties(slug);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_published ON properties(published);
CREATE INDEX IF NOT EXISTS idx_properties_featured ON properties(featured);

CREATE INDEX IF NOT EXISTS idx_property_performance_property_id ON property_performance(property_id);

CREATE INDEX IF NOT EXISTS idx_investor_properties_investor_id ON investor_properties(investor_id);
CREATE INDEX IF NOT EXISTS idx_investor_properties_property_id ON investor_properties(property_id);

CREATE INDEX IF NOT EXISTS idx_documents_property_id ON documents(property_id);
CREATE INDEX IF NOT EXISTS idx_documents_investor_id ON documents(investor_id);
CREATE INDEX IF NOT EXISTS idx_documents_category ON documents(category);

CREATE INDEX IF NOT EXISTS idx_maintenance_property_id ON maintenance_requests(property_id);
CREATE INDEX IF NOT EXISTS idx_maintenance_user_id ON maintenance_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_maintenance_status ON maintenance_requests(status);

CREATE INDEX IF NOT EXISTS idx_payment_investor_id ON payment_history(investor_id);
CREATE INDEX IF NOT EXISTS idx_payment_date ON payment_history(payment_date);

CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);

-- Enable Row Level Security

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE investors ENABLE ROW LEVEL SECURITY;
ALTER TABLE investor_properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE maintenance_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Properties: Public can view published properties
CREATE POLICY "Public can view published properties"
  ON properties FOR SELECT
  USING (published = true);

CREATE POLICY "Authenticated users can view all properties"
  ON properties FOR SELECT
  TO authenticated
  USING (true);

-- Property Performance: Only authenticated users
CREATE POLICY "Authenticated users can view property performance"
  ON property_performance FOR SELECT
  TO authenticated
  USING (true);

-- Investors: Users can view their own profile
CREATE POLICY "Users can view own investor profile"
  ON investors FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own investor profile"
  ON investors FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Investor Properties: Investors can view their investments
CREATE POLICY "Investors can view own investments"
  ON investor_properties FOR SELECT
  TO authenticated
  USING (investor_id = auth.uid());

-- Documents: Public docs are viewable, private docs only for authenticated
CREATE POLICY "Public can view public documents"
  ON documents FOR SELECT
  USING (is_public = true);

CREATE POLICY "Investors can view their documents"
  ON documents FOR SELECT
  TO authenticated
  USING (
    investor_id = auth.uid() OR
    investor_id IS NULL
  );

-- Maintenance Requests: Users can view and create their own
CREATE POLICY "Users can view own maintenance requests"
  ON maintenance_requests FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create maintenance requests"
  ON maintenance_requests FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own maintenance requests"
  ON maintenance_requests FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Payment History: Investors can view their payments
CREATE POLICY "Investors can view own payment history"
  ON payment_history FOR SELECT
  TO authenticated
  USING (investor_id = auth.uid());

-- Leads: Anyone can insert (for contact forms)
CREATE POLICY "Anyone can create leads"
  ON leads FOR INSERT
  WITH CHECK (true);

-- Site Settings: Public can read, authenticated can update
CREATE POLICY "Public can view site settings"
  ON site_settings FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can update site settings"
  ON site_settings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
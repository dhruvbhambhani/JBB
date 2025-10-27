import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Property = {
  id: string;
  title: string;
  slug: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  property_type: string;
  status: string;
  price: number;
  square_feet: number;
  bedrooms: number;
  bathrooms: number;
  year_built: number;
  features: string[];
  images: string[];
  primary_image: string;
  documents: Array<{ title: string; url: string }>;
  published: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
};

export type Investor = {
  id: string;
  full_name: string;
  company?: string;
  phone?: string;
  investor_type: string;
  portfolio_value: number;
  join_date: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export type Document = {
  id: string;
  title: string;
  description: string;
  file_url: string;
  file_type: string;
  file_size: number;
  category: string;
  property_id?: string;
  investor_id?: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
};

export type MaintenanceRequest = {
  id: string;
  property_id: string;
  user_id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  category: string;
  images: string[];
  assigned_to?: string;
  resolution_notes?: string;
  created_at: string;
  updated_at: string;
  completed_at?: string;
};

export type PaymentHistory = {
  id: string;
  investor_id: string;
  property_id?: string;
  amount: number;
  payment_type: string;
  payment_date: string;
  status: string;
  stripe_payment_id?: string;
  notes?: string;
  created_at: string;
};

export type Lead = {
  id: string;
  email: string;
  full_name?: string;
  phone?: string;
  company?: string;
  message?: string;
  lead_type: string;
  source: string;
  hubspot_contact_id?: string;
  status: string;
  created_at: string;
};

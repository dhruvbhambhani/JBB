-- Seed Data for Real Estate Asset Management Platform
-- This script creates test data for development and demonstration purposes

-- Insert 5 sample properties
INSERT INTO properties (
  title, slug, description, address, city, state, zip_code,
  property_type, status, price, square_feet, bedrooms, bathrooms,
  year_built, features, images, primary_image, published, featured
) VALUES
(
  'Luxury Downtown Penthouse',
  'luxury-downtown-penthouse',
  'Stunning penthouse offering panoramic city views, floor-to-ceiling windows, and premium finishes throughout. This exceptional residence features an open-concept living space, chef''s kitchen with top-tier appliances, and a private terrace perfect for entertaining. Located in the heart of downtown with direct access to fine dining, shopping, and cultural attractions.',
  '456 Park Avenue',
  'New York',
  'NY',
  '10022',
  'residential',
  'active',
  4500000,
  3200,
  3,
  3.5,
  2019,
  '["Floor-to-ceiling windows", "Private terrace", "Concierge service", "Fitness center", "Wine storage", "Smart home technology"]',
  '["https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg", "https://images.pexels.com/photos/2462015/pexels-photo-2462015.jpeg"]',
  'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
  true,
  true
),
(
  'Prime Office Building',
  'prime-office-building',
  'Class A office building in prestigious business district. Features modern infrastructure, high-speed elevators, and energy-efficient systems. Fully leased to Fortune 500 companies with long-term contracts ensuring stable cash flow. Excellent location with easy access to major highways and public transportation.',
  '789 Business Plaza',
  'Chicago',
  'IL',
  '60601',
  'commercial',
  'active',
  12500000,
  45000,
  0,
  0,
  2015,
  '["On-site parking", "24/7 security", "Conference facilities", "High-speed internet", "LEED certified", "Backup generators"]',
  '["https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg", "https://images.pexels.com/photos/2249531/pexels-photo-2249531.jpeg"]',
  'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg',
  true,
  true
),
(
  'Waterfront Apartment Complex',
  'waterfront-apartment-complex',
  'Modern 120-unit apartment community featuring resort-style amenities and stunning waterfront views. Property includes swimming pool, fitness center, business center, and landscaped courtyards. Strong occupancy rates and excellent tenant demographics. Prime location near shopping, dining, and entertainment.',
  '321 Marina Drive',
  'Miami',
  'FL',
  '33131',
  'residential',
  'active',
  28000000,
  95000,
  120,
  120,
  2018,
  '["Swimming pool", "Fitness center", "Business center", "Pet-friendly", "Covered parking", "24-hour maintenance"]',
  '["https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg", "https://images.pexels.com/photos/2462015/pexels-photo-2462015.jpeg"]',
  'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg',
  true,
  true
),
(
  'Industrial Warehouse Facility',
  'industrial-warehouse-facility',
  'State-of-the-art distribution center with excellent highway access and modern loading facilities. Features include high ceilings, LED lighting, climate control options, and ample truck parking. Currently leased to national logistics company with expansion options available.',
  '555 Industrial Parkway',
  'Dallas',
  'TX',
  '75201',
  'industrial',
  'active',
  8900000,
  125000,
  0,
  0,
  2020,
  '["Loading docks", "High ceilings", "Climate controlled", "Security systems", "LED lighting", "Office space"]',
  '["https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg", "https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg"]',
  'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg',
  true,
  false
),
(
  'Mixed-Use Development',
  'mixed-use-development',
  'Vibrant mixed-use property combining retail, office, and residential spaces in thriving urban neighborhood. Ground floor features premium retail tenants, upper floors contain modern office suites and luxury apartments. Excellent walkability score and strong community engagement.',
  '100 Main Street',
  'Seattle',
  'WA',
  '98101',
  'mixed-use',
  'active',
  15750000,
  65000,
  24,
  24,
  2017,
  '["Retail spaces", "Office suites", "Residential units", "Rooftop terrace", "Underground parking", "Transit access"]',
  '["https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg", "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg"]',
  'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg',
  true,
  false
);

-- Note: To create an admin user, use the Supabase Auth interface or run:
-- The user should sign up through /login page and then manually add investor profile
-- Example SQL to add investor profile after user signup:
--
-- INSERT INTO investors (id, full_name, company, phone, investor_type, portfolio_value, join_date, status)
-- VALUES (
--   'USER_ID_FROM_AUTH_USERS',
--   'Admin User',
--   'RealEstate Assets',
--   '(212) 555-1234',
--   'institutional',
--   1000000,
--   CURRENT_DATE,
--   'active'
-- );

-- Sample investor properties (link investors to properties after user creation)
-- INSERT INTO investor_properties (investor_id, property_id, ownership_percentage, investment_amount, investment_date)
-- SELECT
--   'USER_ID_FROM_AUTH_USERS',
--   id,
--   25.0,
--   price * 0.25,
--   CURRENT_DATE - INTERVAL '6 months'
-- FROM properties
-- WHERE slug IN ('luxury-downtown-penthouse', 'prime-office-building')
-- LIMIT 2;

-- Sample payment history
-- INSERT INTO payment_history (investor_id, property_id, amount, payment_type, payment_date, status, notes)
-- SELECT
--   'USER_ID_FROM_AUTH_USERS',
--   id,
--   (price * 0.25 * 0.05),
--   'distribution',
--   CURRENT_DATE - INTERVAL '3 months',
--   'completed',
--   'Q3 2024 Distribution'
-- FROM properties
-- WHERE slug = 'luxury-downtown-penthouse';

-- Sample documents
INSERT INTO documents (title, description, file_url, file_type, file_size, category, is_public)
VALUES
(
  'Q4 2024 Portfolio Performance Report',
  'Comprehensive quarterly performance analysis including occupancy rates, NOI, and market trends.',
  'https://example.com/reports/q4-2024-performance.pdf',
  'application/pdf',
  2457600,
  'investor_report',
  false
),
(
  'Investment Guidelines 2024',
  'Updated investment guidelines and criteria for property acquisition and portfolio management.',
  'https://example.com/docs/investment-guidelines-2024.pdf',
  'application/pdf',
  1536000,
  'financial',
  true
),
(
  'Asset Management Agreement Template',
  'Standard asset management agreement for new investor partnerships.',
  'https://example.com/legal/asset-management-agreement.pdf',
  'application/pdf',
  3072000,
  'legal',
  false
);

-- Sample property performance data
INSERT INTO property_performance (property_id, year, quarter, occupancy_rate, rental_income, expenses, net_operating_income, roi)
SELECT
  id,
  2024,
  4,
  95.5,
  price * 0.06,
  price * 0.02,
  price * 0.04,
  12.5
FROM properties
WHERE published = true;

-- Sample site settings
INSERT INTO site_settings (key, value, category)
VALUES
(
  'homepage_hero',
  '{"title": "Strategic Real Estate Asset Management", "subtitle": "Delivering exceptional returns through professional portfolio management", "cta_text": "View Portfolio", "cta_link": "/portfolio"}',
  'homepage'
),
(
  'contact_info',
  '{"phone": "(212) 555-1234", "email": "info@realestateassets.com", "address": "123 Investment Plaza, Suite 500, New York, NY 10001"}',
  'contact'
),
(
  'hubspot_config',
  '{"api_key": "YOUR_HUBSPOT_API_KEY", "portal_id": "YOUR_PORTAL_ID", "form_id": "YOUR_FORM_ID"}',
  'integrations'
);

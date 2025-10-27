export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'RealEstate Assets',
    description: 'Professional real estate asset management firm delivering exceptional returns through strategic property investments.',
    url: 'https://www.realestateassets.com',
    logo: 'https://www.realestateassets.com/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-212-555-1234',
      contactType: 'Customer Service',
      email: 'info@realestateassets.com',
      areaServed: 'US',
      availableLanguage: 'English',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Investment Plaza, Suite 500',
      addressLocality: 'New York',
      addressRegion: 'NY',
      postalCode: '10001',
      addressCountry: 'US',
    },
    sameAs: [
      'https://www.facebook.com/realestateassets',
      'https://www.twitter.com/realestateassets',
      'https://www.linkedin.com/company/realestateassets',
    ],
  };
}

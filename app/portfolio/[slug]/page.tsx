'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Building2, MapPin, Ruler, Calendar, Download, ArrowLeft, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { supabase, type Property } from '@/lib/supabase';

export default function PropertyDetail() {
  const params = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    async function loadProperty() {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('slug', params.slug)
        .eq('published', true)
        .maybeSingle();

      if (data) {
        setProperty(data as Property);
      }
      setLoading(false);
    }
    loadProperty();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Property Not Found</h1>
          <Link href="/portfolio">
            <Button>Return to Portfolio</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const images = property.images.length > 0 ? property.images : [
    property.primary_image || 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.title,
    description: property.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: property.address,
      addressLocality: property.city,
      addressRegion: property.state,
      postalCode: property.zip_code,
      addressCountry: 'US',
    },
    price: property.price,
    priceCurrency: 'USD',
    floorSize: {
      '@type': 'QuantitativeValue',
      value: property.square_feet,
      unitCode: 'FTK',
    },
    numberOfRooms: property.bedrooms,
    image: images[0],
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/portfolio" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft size={20} className="mr-2" />
            Back to Portfolio
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="relative h-96 md:h-[500px]">
                <img
                  src={images[selectedImage]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className="bg-blue-600 text-white">{property.property_type}</Badge>
                  {property.featured && (
                    <Badge variant="secondary" className="bg-yellow-500 text-white">Featured</Badge>
                  )}
                </div>
              </div>

              {images.length > 1 && (
                <div className="p-4 bg-white">
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`relative h-20 rounded overflow-hidden ${
                          selectedImage === idx ? 'ring-2 ring-blue-600' : ''
                        }`}
                      >
                        <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Card>
              <CardContent className="p-6">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">{property.title}</h1>
                <div className="flex items-center text-slate-600 mb-6">
                  <MapPin size={18} className="mr-2" />
                  <span>
                    {property.address}, {property.city}, {property.state} {property.zip_code}
                  </span>
                </div>

                <Separator className="my-6" />

                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-4">Description</h2>
                  <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                    {property.description}
                  </p>
                </div>

                {property.features && property.features.length > 0 && (
                  <>
                    <Separator className="my-6" />
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 mb-4">Features</h2>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {property.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-slate-700">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-slate-600">Price</span>
                  <div className="flex items-center">
                    <DollarSign size={24} className="text-green-600" />
                    <span className="text-3xl font-bold text-slate-900">
                      {formatPrice(property.price).replace('$', '')}
                    </span>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-slate-600">
                      <Ruler size={18} className="mr-2" />
                      <span>Square Feet</span>
                    </div>
                    <span className="font-semibold text-slate-900">
                      {formatNumber(property.square_feet)} sq ft
                    </span>
                  </div>

                  {property.property_type === 'residential' && property.bedrooms > 0 && (
                    <>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-slate-600">
                          <Building2 size={18} className="mr-2" />
                          <span>Bedrooms</span>
                        </div>
                        <span className="font-semibold text-slate-900">{property.bedrooms}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-slate-600">
                          <Building2 size={18} className="mr-2" />
                          <span>Bathrooms</span>
                        </div>
                        <span className="font-semibold text-slate-900">{property.bathrooms}</span>
                      </div>
                    </>
                  )}

                  {property.year_built && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-slate-600">
                        <Calendar size={18} className="mr-2" />
                        <span>Year Built</span>
                      </div>
                      <span className="font-semibold text-slate-900">{property.year_built}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Status</span>
                    <Badge variant="outline">{property.status}</Badge>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-3">
                  {property.documents && property.documents.length > 0 && (
                    <>
                      {property.documents.map((doc, idx) => (
                        <a
                          key={idx}
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full"
                        >
                          <Button variant="outline" className="w-full">
                            <Download size={18} className="mr-2" />
                            {doc.title}
                          </Button>
                        </a>
                      ))}
                    </>
                  )}
                  <Link href="/contact" className="block">
                    <Button className="w-full">Schedule a Viewing</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 text-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Interested in This Property?</h3>
                <p className="text-slate-300 mb-4">
                  Contact our team to learn more about this investment opportunity.
                </p>
                <Link href="/contact">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Contact Us
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

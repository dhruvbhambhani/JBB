'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Building2, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Portfolio() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const properties = [
    {
      id: 1,
      name: 'Pier Club Apartments',
      address: '9950 Club Creek Dr',
      city: 'Houston',
      state: 'TX',
      zip: '77036',
      location: 'Southwest Houston',
      units: 207,
      yearBuilt: 1974,
      website: 'https://pierclubapartments.com/',
      image: '/properties/pier-club.jpg',
      mapsLink: 'https://maps.app.goo.gl/LTuDGbW9t23Sed7H6',
      coordinates: [29.6910, -95.5407], // Slightly offset to the right
    },
    {
      id: 2,
      name: 'Santa Barbara Apartments',
      address: '9955 Club Creek Dr',
      city: 'Houston',
      state: 'TX',
      zip: '77036',
      location: 'Southwest Houston',
      units: 176,
      yearBuilt: 1976,
      website: 'https://santabarbaraapts.com/',
      image: '/properties/santa-barbara.jpg',
      mapsLink: 'https://maps.app.goo.gl/4bSLdsEfDBx3nNDRA',
      coordinates: [29.6905, -95.5418], // Slightly offset to the left
    },
    {
      id: 3,
      name: 'Crescent Place Apartments',
      address: '10222 S Gessner Rd',
      city: 'Houston',
      state: 'TX',
      zip: '77071',
      location: 'Southwest Houston',
      units: 120,
      yearBuilt: 1984,
      website: null,
      image: '/properties/crescent-place.jpg',
      mapsLink: 'https://maps.app.goo.gl/jeV2N3qq8NakwuhEA',
      underContract: true,
      coordinates: [29.6425, -95.5341],
    },
  ];

  useEffect(() => {
    // Load Leaflet CSS
    const link = document.createElement('link');
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    link.rel = 'stylesheet';
    link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
    link.crossOrigin = '';
    document.head.appendChild(link);

    // Load Leaflet JS
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
    script.crossOrigin = '';
    script.async = true;
    
    script.onload = () => {
      if (map.current) return; // Initialize map only once
      
      const L = (window as any).L;

      // Initialize map
      map.current = L.map(mapContainer.current, {
        center: [29.6667, -95.5378],
        zoom: 12,
        scrollWheelZoom: true,
      });

      // Add tile layer (using CartoDB Positron for clean, modern look)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(map.current);

      // Custom icon styles - red pins for all properties
      const createCustomIcon = () => {
        return L.divIcon({
          className: 'custom-marker',
          html: `<div style="
            position: relative;
            width: 40px;
            height: 50px;
          ">
            <svg width="40" height="50" viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 0C11.163 0 4 7.163 4 16c0 12 16 34 16 34s16-22 16-34c0-8.837-7.163-16-16-16z" 
                    fill="#dc2626" 
                    stroke="white" 
                    stroke-width="2"/>
              <circle cx="20" cy="16" r="6" fill="white"/>
            </svg>
          </div>`,
          iconSize: [40, 50],
          iconAnchor: [20, 50],
          popupAnchor: [0, -50],
        });
      };

      // Add markers for each property
      properties.forEach((property) => {
        const marker = L.marker(property.coordinates, {
          icon: createCustomIcon()
        }).addTo(map.current);

        // Create popup content
        const popupContent = `
          <div style="padding: 8px; min-width: 200px;">
            <h3 style="font-weight: bold; margin: 0 0 8px 0; font-size: 16px; color: #0f172a;">${property.name}</h3>
            <p style="margin: 0 0 4px 0; font-size: 14px; color: #64748b;">${property.address}</p>
            <p style="margin: 0 0 8px 0; font-size: 14px; color: #64748b;">${property.units} Units • Built ${property.yearBuilt}</p>
            ${property.underContract ? '<span style="display: inline-block; background: #2563eb; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600;">Under Contract</span>' : ''}
          </div>
        `;

        marker.bindPopup(popupContent);
      });
    };

    document.head.appendChild(script);

    return () => {
      if (map.current && typeof map.current.remove === 'function') {
        map.current.remove();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Investment Portfolio</h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            Explore our portfolio of premium multi-family residential properties in Houston, Texas.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Discover Our Communities
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Strategically located across Southwest Houston, our properties offer convenient access to major highways, shopping, dining, and entertainment.
            </p>
          </div>

          <div 
            ref={mapContainer} 
            className="w-full h-[500px] rounded-xl overflow-hidden shadow-lg border border-slate-200"
            style={{ zIndex: 1 }}
          />

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500">
              📍 All properties conveniently located in Southwest Houston
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-64 bg-slate-200 overflow-hidden">
                  {property.underContract && (
                    <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold z-10 shadow-lg">
                      Under Contract
                    </div>
                  )}
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-full object-cover object-center"
                    style={property.id === 2 ? { objectPosition: 'center 30%' } : undefined}
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800';
                    }}
                  />
                </div>

                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    {property.name}
                  </h3>

                  <div className="space-y-3 mb-6">
                    <a 
                      href={property.mapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start text-slate-600 hover:text-blue-600 transition-colors"
                    >
                      <MapPin size={18} className="mr-2 flex-shrink-0 mt-1" />
                      <span>
                        {property.address}<br />
                        {property.city}, {property.state} {property.zip}<br />
                        <span className="text-sm text-slate-500">{property.location}</span>
                      </span>
                    </a>

                    {property.units && (
                      <div className="flex items-center text-slate-600">
                        <Building2 size={18} className="mr-2 flex-shrink-0" />
                        <span className="font-semibold">{property.units} Units</span>
                      </div>
                    )}

                    <div className="flex items-center text-slate-600">
                      <Calendar size={18} className="mr-2 flex-shrink-0" />
                      <span>Built {property.yearBuilt}</span>
                    </div>
                  </div>

                  {property.website ? (
                    <a href={property.website} target="_blank" rel="noopener noreferrer" className="block">
                      <Button className="w-full">
                        Visit Website
                        <ExternalLink size={18} className="ml-2" />
                      </Button>
                    </a>
                  ) : (
                    <Button className="w-full" disabled>
                      Website Coming Soon
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Building2, MapPin, Calendar, ExternalLink, ChevronUp, ChevronDown, Bed, Bath } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Portfolio() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [activeTab, setActiveTab] = useState<'multifamily' | 'singlefamily'>('multifamily');
  const [activePropertyIndex, setActivePropertyIndex] = useState(0);
  const singleFamilyMapContainer = useRef(null);
  const singleFamilyMap = useRef(null);

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
      coordinates: [29.683879861599877, -95.55024661728538],
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
      coordinates: [29.683368721261658, -95.55251595701445],
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
      coordinates: [29.671982474745736, -95.52911626985411],
    },
  ];

  const singleFamilyHomes = [
    {
      id: 1,
      address: '4607 Kilmarnoch Way',
      city: 'Missouri City',
      state: 'TX',
      zip: '77459',
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1442,
      yearBuilt: 1986,
      image: '/properties/4607-kilmarnoch.jpeg',
      coordinates: [29.59398843701031, -95.57986354417856],
    },
    {
      id: 2,
      address: '11819 Gardner Park Lane',
      city: 'Sugar Land',
      state: 'TX',
      zip: '77498',
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1525,
      yearBuilt: 1996,
      image: '/properties/11819-gardner-park.jpeg',
      coordinates: [29.64357420293608, -95.65579247765082],
    },
    {
      id: 3,
      address: '922 Crestmont Trail Drive',
      city: 'Missouri City',
      state: 'TX',
      zip: '77489',
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1357,
      yearBuilt: 2012,
      image: '/properties/922-crestmont-trail.jpeg',
      coordinates: [29.618988421724996, -95.52952546678557],
    },
    {
      id: 4,
      address: '13103 Careywood Drive',
      city: 'Sugar Land',
      state: 'TX',
      zip: '77478',
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1925,
      yearBuilt: 1988,
      image: '/properties/13103-careywood.JPEG',
      coordinates: [29.649151754960364, -95.61205203068572],
    },
    {
      id: 5,
      address: '1234 Bluestone Drive',
      city: 'Missouri City',
      state: 'TX',
      zip: '77459',
      bedrooms: 5,
      bathrooms: 2,
      sqft: 3476,
      yearBuilt: 1992,
      image: '/properties/1234-bluestone.jpeg',
      coordinates: [29.602170853891018, -95.56896378835717],
    },
  ];

  // Multi-Family Map
  useEffect(() => {
    if (activeTab !== 'multifamily') return;
    
    const link = document.createElement('link');
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    link.rel = 'stylesheet';
    link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
    link.crossOrigin = '';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
    script.crossOrigin = '';
    script.async = true;
    
    script.onload = () => {
      if (map.current) return;
      
      const L = (window as any).L;

      map.current = L.map(mapContainer.current, {
        center: [29.6779, -95.5397],
        zoom: 13,
        scrollWheelZoom: true,
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(map.current);

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

      properties.forEach((property) => {
        const marker = L.marker(property.coordinates, {
          icon: createCustomIcon()
        }).addTo(map.current);

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
        map.current = null;
      }
    };
  }, [activeTab]);

  // Single Family Map
  useEffect(() => {
    if (activeTab !== 'singlefamily') return;
    
    if (!document.querySelector('link[href*="leaflet.css"]')) {
      const link = document.createElement('link');
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      link.rel = 'stylesheet';
      link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
      link.crossOrigin = '';
      document.head.appendChild(link);
    }

    if (!(window as any).L) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
      script.crossOrigin = '';
      script.async = true;
      
      script.onload = () => {
        initSingleFamilyMap();
      };
      
      document.head.appendChild(script);
    } else {
      initSingleFamilyMap();
    }

    function initSingleFamilyMap() {
      if (singleFamilyMap.current) return;
      
      const L = (window as any).L;

      singleFamilyMap.current = L.map(singleFamilyMapContainer.current, {
        center: [29.620, -95.580],
        zoom: 11,
        scrollWheelZoom: true,
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(singleFamilyMap.current);

      const createHomeIcon = () => {
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

      singleFamilyHomes.forEach((home, index) => {
        const marker = L.marker(home.coordinates, {
          icon: createHomeIcon()
        }).addTo(singleFamilyMap.current);

        const popupContent = `
          <div style="padding: 8px; min-width: 180px;">
            <p style="margin: 0 0 4px 0; font-size: 14px; color: #0f172a; font-weight: 600;">${home.address}</p>
            <p style="margin: 0 0 4px 0; font-size: 13px; color: #64748b;">${home.bedrooms} bed • ${home.bathrooms} bath</p>
            <p style="margin: 0; font-size: 13px; color: #64748b;">${home.sqft} sqft • Built ${home.yearBuilt}</p>
          </div>
        `;

        marker.bindPopup(popupContent);
        
        marker.on('click', () => {
          setActivePropertyIndex(index);
        });
      });
    }

    return () => {
      if (singleFamilyMap.current && typeof singleFamilyMap.current.remove === 'function') {
        singleFamilyMap.current.remove();
        singleFamilyMap.current = null;
      }
    };
  }, [activeTab]);

  const handlePrevProperty = () => {
    setActivePropertyIndex((prev) => (prev === 0 ? singleFamilyHomes.length - 1 : prev - 1));
  };

  const handleNextProperty = () => {
    setActivePropertyIndex((prev) => (prev === singleFamilyHomes.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Investment Portfolio</h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            Explore our portfolio of premium multi-family and single-family residential properties in Houston, Texas.
          </p>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-8 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center border-b border-slate-200">
            <button
              onClick={() => setActiveTab('multifamily')}
              className={`px-8 py-4 text-lg font-semibold transition-colors relative ${
                activeTab === 'multifamily'
                  ? 'text-slate-900'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Multi-Family Properties
              {activeTab === 'multifamily' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('singlefamily')}
              className={`px-8 py-4 text-lg font-semibold transition-colors relative ${
                activeTab === 'singlefamily'
                  ? 'text-slate-900'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Single-Family Rentals
              {activeTab === 'singlefamily' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900"></div>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Multi-Family Tab Content */}
      {activeTab === 'multifamily' && (
        <>
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

          <section className="py-12 bg-slate-50">
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
        </>
      )}

      {/* Single-Family Tab Content */}
      {activeTab === 'singlefamily' && (
        <section className="py-12 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Map */}
              <div 
                ref={singleFamilyMapContainer} 
                className="w-full h-[600px] rounded-xl overflow-hidden shadow-lg border border-slate-200"
                style={{ zIndex: 1 }}
              />

              {/* Vertical Carousel */}
              <div className="relative">
                <div className="h-[600px] flex flex-col">
                  {/* Property Card */}
                  <div className="flex-1 overflow-hidden">
                    <Card className="h-full overflow-hidden">
                      <div className="relative h-80 bg-slate-200">
                        <img
                          src={singleFamilyHomes[activePropertyIndex].image}
                          alt={singleFamilyHomes[activePropertyIndex].address}
                          className="w-full h-full object-cover"
                          style={
                            singleFamilyHomes[activePropertyIndex].id === 2 
                              ? { objectPosition: 'center 30%' } 
                              : singleFamilyHomes[activePropertyIndex].id === 5 
                              ? { objectPosition: 'center 40%' }
                              : undefined
                          }
                        />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-slate-900 mb-3">
                          {singleFamilyHomes[activePropertyIndex].address}
                        </h3>
                        <p className="text-slate-600 mb-4">
                          {singleFamilyHomes[activePropertyIndex].city}, {singleFamilyHomes[activePropertyIndex].state} {singleFamilyHomes[activePropertyIndex].zip}
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center text-slate-600">
                            <Bed size={18} className="mr-2" />
                            <span>{singleFamilyHomes[activePropertyIndex].bedrooms} Beds</span>
                          </div>
                          <div className="flex items-center text-slate-600">
                            <Bath size={18} className="mr-2" />
                            <span>{singleFamilyHomes[activePropertyIndex].bathrooms} Baths</span>
                          </div>
                          <div className="flex items-center text-slate-600">
                            <Building2 size={18} className="mr-2" />
                            <span>{singleFamilyHomes[activePropertyIndex].sqft} sqft</span>
                          </div>
                          <div className="flex items-center text-slate-600">
                            <Calendar size={18} className="mr-2" />
                            <span>Built {singleFamilyHomes[activePropertyIndex].yearBuilt}</span>
                          </div>
                        </div>

                        <div className="text-center text-sm text-slate-500 mt-4">
                          Property {activePropertyIndex + 1} of {singleFamilyHomes.length}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex justify-center gap-4 mt-4">
                    <button
                      onClick={handlePrevProperty}
                      className="p-3 rounded-full bg-slate-900 text-white hover:bg-slate-700 transition-colors"
                      aria-label="Previous property"
                    >
                      <ChevronUp size={24} />
                    </button>
                    <button
                      onClick={handleNextProperty}
                      className="p-3 rounded-full bg-slate-900 text-white hover:bg-slate-700 transition-colors"
                      aria-label="Next property"
                    >
                      <ChevronDown size={24} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
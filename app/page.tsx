'use client';

import Link from 'next/link';
import { Building2, Home as HomeIcon, Building, TrendingUp, ArrowRight, CheckCircle, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Home() {
  const focusAreas = [
    { 
      icon: Building2, 
      title: 'Multi-Family Residential',
      description: 'Apartment complexes and multi-unit residential properties in growing markets.',
      markets: ['Urban Centers', 'Suburban Growth Areas']
    },
    { 
      icon: HomeIcon, 
      title: 'Value-Add Properties',
      description: 'Properties with renovation and improvement opportunities for enhanced returns.',
      markets: ['Emerging Neighborhoods', 'Redevelopment Zones']
    },
    { 
      icon: TrendingUp, 
      title: 'Growth Markets',
      description: 'Strategic investments in high-growth metropolitan areas.',
      markets: ['Expanding Cities', 'Economic Hubs']
    },
  ];

  const services = [
    {
      title: 'Portfolio Management',
      description: 'Strategic oversight and optimization of your real estate investments.',
      features: ['Asset Analysis', 'Performance Tracking', 'Strategic Planning'],
    },
    {
      title: 'Property Acquisition',
      description: 'Identifying and securing high-value investment opportunities.',
      features: ['Market Research', 'Due Diligence', 'Negotiation'],
    },
    {
      title: 'Asset Optimization',
      description: 'Maximizing returns through strategic improvements and management.',
      features: ['Value Enhancement', 'Cost Reduction', 'Tenant Relations'],
    },
  ];

  return (
    <div>
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-24 md:py-32">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] opacity-10 bg-cover bg-center"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Strategic Real Estate Asset Management
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8">
              Delivering exceptional returns through professional portfolio management and strategic property investments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/portfolio">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg">
                  View Portfolio
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Link href="/investors">
                <Button size="lg" variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20 text-white text-lg">
                  Investor Information
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Investment Focus Areas
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Strategic investments across diverse property types and high-growth markets.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {focusAreas.map((area, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <area.icon className="w-12 h-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{area.title}</h3>
                  <p className="text-slate-600 mb-4 text-sm">{area.description}</p>
                  <div className="space-y-2">
                    {area.markets.map((market, idx) => (
                      <div key={idx} className="flex items-center text-sm text-slate-700">
                        <MapPin size={14} className="mr-2 text-blue-500" />
                        {market}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Featured Properties
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Explore our curated selection of premium investment opportunities.
            </p>
          </div>

          <div className="text-center mt-12">
            <Link href="/portfolio">
              <Button size="lg" variant="outline">
                View All Properties
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Comprehensive Asset Management Services
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              End-to-end solutions for maximizing your real estate investment returns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-slate-700">
                        <CheckCircle size={16} className="mr-2 text-green-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services">
              <Button size="lg">
                Explore All Services
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Grow Your Investment Portfolio?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Join our community of successful investors and start building wealth through strategic real estate investments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Contact Us Today
              </Button>
            </Link>
            <Link href="/investors">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
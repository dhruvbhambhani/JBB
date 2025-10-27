'use client';

import { useEffect, useState } from 'react';
import { PropertyCard } from '@/components/property-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import { supabase, type Property } from '@/lib/supabase';

export default function Portfolio() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [propertyType, setPropertyType] = useState('all');
  const [status, setStatus] = useState('all');

  useEffect(() => {
    async function loadProperties() {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (data) {
        setProperties(data as Property[]);
        setFilteredProperties(data as Property[]);
      }
      setLoading(false);
    }
    loadProperties();
  }, []);

  useEffect(() => {
    let filtered = properties;

    if (searchTerm) {
      filtered = filtered.filter(
        (property) =>
          property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (propertyType !== 'all') {
      filtered = filtered.filter((property) => property.property_type === propertyType);
    }

    if (status !== 'all') {
      filtered = filtered.filter((property) => property.status === status);
    }

    setFilteredProperties(filtered);
  }, [searchTerm, propertyType, status, properties]);

  const handleReset = () => {
    setSearchTerm('');
    setPropertyType('all');
    setStatus('all');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Investment Portfolio</h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            Explore our diverse portfolio of premium real estate assets across residential, commercial, and mixed-use properties.
          </p>
        </div>
      </section>

      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <Input
                type="text"
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger>
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="residential">Residential</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="industrial">Industrial</SelectItem>
                <SelectItem value="mixed-use">Mixed-Use</SelectItem>
              </SelectContent>
            </Select>

            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="under_contract">Under Contract</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {(searchTerm || propertyType !== 'all' || status !== 'all') && (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-slate-600">
                Showing {filteredProperties.length} of {properties.length} properties
              </p>
              <Button variant="outline" size="sm" onClick={handleReset}>
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-96 animate-pulse bg-slate-200 rounded-lg" />
              ))}
            </div>
          ) : filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-lg text-slate-600 mb-4">No properties found matching your criteria.</p>
              <Button onClick={handleReset}>Reset Filters</Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

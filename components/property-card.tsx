import Link from 'next/link';
import { Building2, MapPin, Ruler, DollarSign } from 'lucide-react';
import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import type { Property } from '@/lib/supabase';

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
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

  return (
    <Link href={`/portfolio/${property.slug}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
        <div className="relative h-64 overflow-hidden">
          <img
            src={property.primary_image || property.images[0] || 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge className="bg-blue-600 text-white">{property.property_type}</Badge>
            {property.featured && (
              <Badge variant="secondary" className="bg-yellow-500 text-white">Featured</Badge>
            )}
          </div>
          <div className="absolute top-4 right-4">
            <Badge variant="outline" className="bg-white/90 backdrop-blur-sm">
              {property.status}
            </Badge>
          </div>
        </div>

        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-1">
            {property.title}
          </h3>

          <div className="flex items-center text-slate-600 mb-4">
            <MapPin size={16} className="mr-1 flex-shrink-0" />
            <span className="text-sm line-clamp-1">
              {property.city}, {property.state}
            </span>
          </div>

          <p className="text-slate-600 text-sm mb-4 line-clamp-2">
            {property.description}
          </p>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center">
              <Ruler size={16} className="mr-2 text-slate-500" />
              <span className="text-slate-700">{formatNumber(property.square_feet)} sq ft</span>
            </div>
            {property.property_type === 'residential' && property.bedrooms > 0 && (
              <div className="flex items-center">
                <Building2 size={16} className="mr-2 text-slate-500" />
                <span className="text-slate-700">{property.bedrooms} bed · {property.bathrooms} bath</span>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-0">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <DollarSign size={20} className="text-green-600" />
              <span className="text-2xl font-bold text-slate-900">
                {formatPrice(property.price)}
              </span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

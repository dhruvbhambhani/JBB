'use client';

import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Mail } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('leads').insert({
        email,
        lead_type: 'newsletter',
        source: 'website',
        status: 'new',
      });

      if (error) throw error;

      toast.success('Thank you for subscribing to our newsletter!');
      setEmail('');
    } catch (error: any) {
      toast.error('Failed to subscribe. Please try again.');
      console.error('Newsletter signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-blue-600 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Mail className="w-12 h-12 mx-auto mb-4 text-white" />
        <h2 className="text-3xl font-bold text-white mb-4">
          Stay Updated on Investment Opportunities
        </h2>
        <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
          Subscribe to receive exclusive insights, market reports, and updates on new property listings.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 bg-white"
          />
          <Button type="submit" disabled={loading} variant="secondary">
            {loading ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </form>
      </div>
    </div>
  );
}

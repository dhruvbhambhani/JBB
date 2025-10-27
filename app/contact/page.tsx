'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export default function Contact() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    lead_type: 'inquiry',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('leads').insert({
        ...formData,
        source: 'website',
        status: 'new',
      });

      if (error) throw error;

      toast.success('Thank you for contacting us! We will be in touch soon.');

      setFormData({
        full_name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
        lead_type: 'inquiry',
      });
    } catch (error: any) {
      toast.error('Failed to submit form. Please try again.');
      console.error('Form submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Office Location',
      details: ['123 Investment Plaza, Suite 500', 'New York, NY 10001'],
    },
    {
      icon: Phone,
      title: 'Phone',
      details: ['Main: (212) 555-1234', 'Investor Relations: (212) 555-5678'],
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@realestateassets.com', 'investors@realestateassets.com'],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            Get in touch with our team to learn more about our investment opportunities and services.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="full_name">Full Name *</Label>
                        <Input
                          id="full_name"
                          value={formData.full_name}
                          onChange={(e) => handleChange('full_name', e.target.value)}
                          required
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          required
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          placeholder="(555) 123-4567"
                        />
                      </div>

                      <div>
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => handleChange('company', e.target.value)}
                          placeholder="Your Company"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="lead_type">Inquiry Type *</Label>
                      <Select value={formData.lead_type} onValueChange={(value) => handleChange('lead_type', value)}>
                        <SelectTrigger id="lead_type">
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inquiry">General Inquiry</SelectItem>
                          <SelectItem value="investment">Investment Opportunity</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="support">Support</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        required
                        placeholder="Tell us about your investment goals or inquiry..."
                        rows={6}
                      />
                    </div>

                    <Button type="submit" size="lg" disabled={loading} className="w-full md:w-auto">
                      {loading ? 'Sending...' : (
                        <>
                          <Send size={18} className="mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <info.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">{info.title}</h3>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-slate-600">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card className="bg-slate-900 text-white">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Office Hours</h3>
                  <div className="space-y-2 text-slate-300">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 2:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Quick Links</h3>
                  <div className="space-y-2">
                    <a href="/investors" className="block text-blue-600 hover:text-blue-700">
                      Investor Resources
                    </a>
                    <a href="/portfolio" className="block text-blue-600 hover:text-blue-700">
                      View Properties
                    </a>
                    <a href="/login" className="block text-blue-600 hover:text-blue-700">
                      Investor Portal Login
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

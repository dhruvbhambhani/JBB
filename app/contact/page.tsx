'use client';

import { Mail } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function Contact() {
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="mb-8 hover:shadow-lg transition-shadow">
            <CardContent className="p-12">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <Mail className="w-10 h-10 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Email Us</h2>
                <p className="text-slate-600 text-lg mb-6">
                  Have questions about our services or investment opportunities? Send us an email and we'll get back to you promptly.
                </p>
                <a 
                  href="mailto:jbbassetmanagement@yahoo.com" 
                  className="text-3xl font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  jbbassetmanagement@yahoo.com
                </a>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-600 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-center">Explore More</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a href="/investors" className="block p-4 bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors text-center">
                  <span className="text-lg font-semibold">→ Investor Resources</span>
                </a>
                <a href="/portfolio" className="block p-4 bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors text-center">
                  <span className="text-lg font-semibold">→ View Properties</span>
                </a>
                <a href="/services" className="block p-4 bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors text-center">
                  <span className="text-lg font-semibold">→ Our Services</span>
                </a>
                <a href="/about" className="block p-4 bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors text-center">
                  <span className="text-lg font-semibold">→ About Us</span>
                </a>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4 text-center">
                  Ready to Discuss Your Investment Goals?
                </h3>
                <p className="text-slate-600 text-lg text-center">
                  Our team at JBB Asset Management is here to help you navigate real estate investment 
                  opportunities. Reach out to us via email, and we'll be in touch shortly.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
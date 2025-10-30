import { Award, Users, Target, TrendingUp, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata = {
  title: 'About Us - JBB Asset Management',
  description: 'Learn about our mission, team, and commitment to excellence in real estate asset management.',
};

export default function About() {
  const values = [
    {
      icon: Target,
      title: 'Client-First Approach',
      description: 'Your investment goals are our top priority. We tailor our strategies to align with your unique objectives.',
    },
    {
      icon: Shield,
      title: 'Integrity & Transparency',
      description: 'Open communication and honest reporting build trust and long-term partnerships.',
    },
    {
      icon: TrendingUp,
      title: 'Performance Excellence',
      description: 'Continuous improvement and proven methodologies drive superior results for our investors.',
    },
    {
      icon: Users,
      title: 'Collaborative Partnership',
      description: 'We work closely with investors, building relationships based on mutual success.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            Trusted real estate asset management expertise delivering exceptional results since 2002.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-slate-700 mb-4 leading-relaxed">
                At JBB Asset Management, we are committed to delivering superior returns through strategic real estate investment and professional asset management. Our approach combines deep market expertise with innovative strategies to maximize value for our investors.
              </p>
              <p className="text-lg text-slate-700 mb-4 leading-relaxed">
                We believe in building long-term relationships based on trust, transparency, and consistent performance. Every investment decision is guided by rigorous analysis and a commitment to risk-adjusted returns.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                Whether you're an individual investor or an institutional partner, we provide the expertise and dedication needed to help you achieve your real estate investment goals.
              </p>
            </div>

            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Our team"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              The principles that guide everything we do.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <value.icon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                  <p className="text-slate-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Experienced Leadership
            </h2>
            <p className="text-lg text-slate-600 mb-6">
              Our leadership team brings decades of combined experience in real estate investment, asset management, and financial strategy. With a proven track record of successful acquisitions, value creation, and investor relations, our team is dedicated to maximizing returns while maintaining the highest standards of integrity and transparency.
            </p>
            <p className="text-lg text-slate-600">
              Through strategic vision, market expertise, and hands-on management, our leadership ensures that every investment decision aligns with our commitment to delivering exceptional results for our investors.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Work Together?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Let's discuss how we can help you achieve your real estate investment goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Get in Touch
              </Button>
            </Link>
            <Link href="/investors">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Investment Information
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
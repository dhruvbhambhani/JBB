import { Award, Users, Target, TrendingUp, Building2, MapPin, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata = {
  title: 'About Us - RealEstate Assets',
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

  const team = [
    {
      name: 'Michael Thompson',
      role: 'Chief Executive Officer',
      bio: 'Over 25 years of experience in commercial real estate investment and portfolio management.',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      name: 'Sarah Martinez',
      role: 'Chief Investment Officer',
      bio: 'Former VP at a Fortune 500 real estate firm, specializing in asset acquisition and optimization.',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      name: 'David Chen',
      role: 'Head of Asset Management',
      bio: 'Expert in property operations and value creation with a track record of exceeding performance targets.',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      name: 'Jennifer Williams',
      role: 'Director of Investor Relations',
      bio: 'Dedicated to ensuring transparent communication and exceptional service for all investors.',
      image: 'https://images.pexels.com/photos/3756523/pexels-photo-3756523.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  const stats = [
    { icon: Building2, label: 'Properties Managed', value: '150+' },
    { icon: Users, label: 'Active Investors', value: '500+' },
    { icon: MapPin, label: 'Markets', value: '15+' },
    { icon: Award, label: 'Years Experience', value: '25+' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            Trusted real estate asset management expertise delivering exceptional results since 1999.
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
                At RealEstate Assets, we are committed to delivering superior returns through strategic real estate investment and professional asset management. Our approach combines deep market expertise with innovative strategies to maximize value for our investors.
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

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-12 h-12 mx-auto mb-3 text-blue-600" />
                <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-slate-600">{stat.label}</div>
              </div>
            ))}
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
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Leadership Team
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Experienced professionals dedicated to your success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-64">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mb-3">{member.role}</p>
                  <p className="text-sm text-slate-600">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
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
              <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10 text-white">
                Investment Information
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

import { Building2, TrendingUp, FileText, Users, Shield, Target, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata = {
  title: 'Services - JBB Asset Management LLC',
  description: 'Comprehensive real estate asset management services including portfolio management, acquisition, optimization, and more.',
};

export default function Services() {
  const services = [
    {
      icon: Building2,
      title: 'Portfolio Management',
      description: 'Strategic oversight and optimization of your entire real estate investment portfolio.',
      features: [
        'Comprehensive asset analysis and valuation',
        'Performance tracking and reporting',
        'Strategic planning and forecasting',
        'Risk assessment and mitigation',
        'Market analysis and positioning',
      ],
    },
    {
      icon: Target,
      title: 'Property Acquisition',
      description: 'Identifying and securing high-value investment opportunities that align with your goals.',
      features: [
        'Market research and opportunity identification',
        'Due diligence and property evaluation',
        'Financial modeling and analysis',
        'Negotiation and transaction management',
        'Closing coordination and support',
      ],
    },
    {
      icon: TrendingUp,
      title: 'Asset Optimization',
      description: 'Maximizing returns through strategic improvements and operational excellence.',
      features: [
        'Value enhancement strategies',
        'Cost reduction and efficiency improvement',
        'Tenant attraction and retention',
        'Property maintenance and upgrades',
        'Revenue optimization',
      ],
    },
    {
      icon: FileText,
      title: 'Financial Reporting',
      description: 'Transparent and detailed reporting to keep you informed of your investments.',
      features: [
        'Quarterly performance reports',
        'Real-time portfolio dashboards',
        'Tax documentation and support',
        'Cash flow analysis',
        'ROI tracking and projections',
      ],
    },
    {
      icon: Shield,
      title: 'Risk Management',
      description: 'Protecting your investments through comprehensive risk assessment and mitigation.',
      features: [
        'Market risk analysis',
        'Insurance coordination',
        'Legal compliance monitoring',
        'Tenant screening and management',
        'Property inspections and audits',
      ],
    },
    {
      icon: Users,
      title: 'Investor Relations',
      description: 'Dedicated support and communication for all our investment partners.',
      features: [
        'Dedicated account management',
        'Regular investor updates',
        'Exclusive investment opportunities',
        'Portfolio review meetings',
        'Strategic consultation',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            Comprehensive real estate asset management services designed to maximize your investment returns and minimize risk.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Full-Service Asset Management
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              From acquisition to optimization, we provide end-to-end solutions for your real estate investment needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <service.icon className="w-12 h-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                  <p className="text-slate-600 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm text-slate-700">
                        <CheckCircle size={16} className="mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Let us help you achieve your real estate investment goals with our proven expertise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Contact Us Today
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                View Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

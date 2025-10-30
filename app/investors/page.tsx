import { TrendingUp, Shield, FileText, Users, ArrowRight, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata = {
  title: 'Investors - JBB Asset Management LLC',
  description: 'Investment strategy, performance metrics, and resources for our investor community.',
};

export default function Investors() {
  const performanceData = [
    { label: 'Average Annual Return', value: '20%' },
    { label: 'Portfolio Value', value: '$45M' },
    { label: 'Apartment Units', value: '600+' },
    { label: 'Investor Satisfaction', value: '98%' },
  ];

  const investmentStrategy = [
    {
      title: 'Diversified Portfolio',
      description: 'Strategic mix of residential, commercial, and mixed-use properties across prime markets.',
      icon: TrendingUp,
    },
    {
      title: 'Risk-Adjusted Returns',
      description: 'Focus on sustainable, long-term growth with comprehensive risk management protocols.',
      icon: Shield,
    },
    {
      title: 'Transparent Reporting',
      description: 'Quarterly performance reports with detailed analytics and market insights.',
      icon: FileText,
    },
    {
      title: 'Active Management',
      description: 'Hands-on approach to asset optimization and value creation.',
      icon: Users,
    },
  ];

  const benefits = [
    'Professional asset management expertise',
    'Access to institutional-grade properties',
    'Quarterly distribution payments',
    'Tax-advantaged investment structure',
    'Dedicated investor relations team',
    'Exclusive investment opportunities',
    'Comprehensive portfolio reporting',
    'Low minimum investment requirements',
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Investor Resources</h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            Building wealth through strategic real estate investments with transparency, expertise, and proven results.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Performance Summary
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Consistent results across our diversified real estate portfolio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {performanceData.map((item, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <p className="text-sm text-slate-600 mb-2">{item.label}</p>
                  <p className="text-4xl font-bold text-slate-900">{item.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-sm text-slate-600 text-center">
              <strong>Disclaimer:</strong> Past performance does not guarantee future results. All investments involve risk, including potential loss of principal. Performance data represents historical results and should not be considered indicative of future performance.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Investment Strategy
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              A proven approach focused on sustainable growth and risk management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {investmentStrategy.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <item.icon className="w-12 h-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 text-center">
              Why Invest With Us?
            </h2>
            <p className="text-lg text-slate-600 mb-8 text-center">
              We combine decades of real estate expertise with a commitment to transparency and exceptional service.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle size={20} className="mr-3 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{benefit}</span>
                </div>
              ))}
            </div>

            <Card className="bg-slate-50 border-2 border-blue-100">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Commitment to Investors</h3>
                <p className="text-slate-600 mb-4">
                  At JBB Asset Management LLC, we believe in building long-term relationships with our investors through trust, transparency, and consistent results. Our team of experienced professionals works tirelessly to identify opportunities, manage risk, and optimize returns across our diverse portfolio.
                </p>
                <p className="text-slate-600 mb-4">
                  We maintain an active management approach, continuously monitoring market conditions and property performance to ensure your investments are positioned for success. Our hands-on strategy includes regular property inspections, proactive maintenance, and strategic improvements that enhance value and tenant satisfaction.
                </p>
                <p className="text-slate-600">
                  Whether you're a first-time real estate investor or an experienced portfolio manager, we provide the expertise, resources, and personalized attention you need to achieve your financial goals.
                </p>
              </CardContent>
            </Card>

            <div className="mt-8 text-center">
              <Link href="/contact">
                <Button size="lg">
                  Become an Investor
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Questions About Investing?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Our investor relations team is here to help you understand our investment opportunities.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Contact Investor Relations
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
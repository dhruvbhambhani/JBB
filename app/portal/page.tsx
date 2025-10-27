'use client';

import { useEffect, useState } from 'react';
import { Building2, TrendingUp, DollarSign, FileText, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PortalLayout } from '@/components/portal-layout';
import { supabase } from '@/lib/supabase';

export default function Portal() {
  const [investorData, setInvestorData] = useState<any>(null);
  const [properties, setProperties] = useState<any[]>([]);
  const [recentPayments, setRecentPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [investorRes, propertiesRes, paymentsRes] = await Promise.all([
        supabase.from('investors').select('*').eq('id', user.id).maybeSingle(),
        supabase.from('investor_properties')
          .select('*, properties(*)')
          .eq('investor_id', user.id),
        supabase.from('payment_history')
          .select('*')
          .eq('investor_id', user.id)
          .order('payment_date', { ascending: false })
          .limit(5),
      ]);

      if (investorRes.data) setInvestorData(investorRes.data);
      if (propertiesRes.data) setProperties(propertiesRes.data);
      if (paymentsRes.data) setRecentPayments(paymentsRes.data);

      setLoading(false);
    }

    loadDashboardData();
  }, []);

  const stats = [
    {
      title: 'Portfolio Value',
      value: investorData?.portfolio_value
        ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(investorData.portfolio_value)
        : '$0',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
    },
    {
      title: 'Properties',
      value: properties.length.toString(),
      change: '',
      trend: null,
      icon: Building2,
    },
    {
      title: 'YTD Returns',
      value: '11.8%',
      change: '+2.3%',
      trend: 'up',
      icon: TrendingUp,
    },
    {
      title: 'Documents',
      value: '8',
      change: '+2 new',
      trend: 'up',
      icon: FileText,
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <PortalLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h1>
          <p className="text-slate-600">Welcome back, {investorData?.full_name || 'Investor'}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <stat.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  {stat.trend && (
                    <div className={`flex items-center text-sm ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                      <span className="ml-1">{stat.change}</span>
                    </div>
                  )}
                </div>
                <p className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</p>
                <p className="text-sm text-slate-600">{stat.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Properties</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8 text-slate-600">Loading...</div>
              ) : properties.length > 0 ? (
                <div className="space-y-4">
                  {properties.map((investment) => (
                    <div key={investment.id} className="flex items-start justify-between p-4 bg-slate-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-900">{investment.properties.title}</h4>
                        <p className="text-sm text-slate-600">
                          {investment.properties.city}, {investment.properties.state}
                        </p>
                        <p className="text-sm text-slate-500 mt-1">
                          Ownership: {investment.ownership_percentage}%
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-slate-900">
                          {formatCurrency(investment.investment_amount)}
                        </p>
                        <p className="text-xs text-slate-500">Invested</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Building2 className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                  <p className="text-slate-600">No properties in your portfolio yet.</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Payments</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8 text-slate-600">Loading...</div>
              ) : recentPayments.length > 0 ? (
                <div className="space-y-4">
                  {recentPayments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div>
                        <p className="font-semibold text-slate-900">{payment.payment_type}</p>
                        <p className="text-sm text-slate-600">{formatDate(payment.payment_date)}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">
                          {formatCurrency(payment.amount)}
                        </p>
                        <p className="text-xs text-slate-500 capitalize">{payment.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <DollarSign className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                  <p className="text-slate-600">No payment history available yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Q4 2024 Performance Report Available
                </h3>
                <p className="text-slate-700 mb-4">
                  View detailed analytics and insights from the latest quarter.
                </p>
                <a href="/portal/documents" className="text-blue-600 hover:text-blue-700 font-semibold">
                  View Documents →
                </a>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}

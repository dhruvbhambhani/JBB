'use client';

import { useEffect, useState } from 'react';
import { DollarSign, TrendingUp, Calendar, Building2, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PortalLayout } from '@/components/portal-layout';
import { supabase, type PaymentHistory } from '@/lib/supabase';

export default function Payments() {
  const [payments, setPayments] = useState<PaymentHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalReceived: 0,
    ytdReceived: 0,
    averagePayment: 0,
    nextPaymentDate: '',
  });

  useEffect(() => {
    async function loadPayments() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('payment_history')
        .select('*')
        .eq('investor_id', user.id)
        .order('payment_date', { ascending: false });

      if (data) {
        setPayments(data as PaymentHistory[]);

        const total = data.reduce((sum, p) => sum + Number(p.amount), 0);
        const currentYear = new Date().getFullYear();
        const ytd = data
          .filter((p) => new Date(p.payment_date).getFullYear() === currentYear)
          .reduce((sum, p) => sum + Number(p.amount), 0);
        const avg = data.length > 0 ? total / data.length : 0;

        setStats({
          totalReceived: total,
          ytdReceived: ytd,
          averagePayment: avg,
          nextPaymentDate: 'Q1 2025',
        });
      }
      setLoading(false);
    }

    loadPayments();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      completed: 'bg-green-100 text-green-700',
      pending: 'bg-yellow-100 text-yellow-700',
      failed: 'bg-red-100 text-red-700',
    };
    return colors[status] || colors.pending;
  };

  const summaryCards = [
    {
      title: 'Total Received',
      value: formatCurrency(stats.totalReceived),
      icon: DollarSign,
      change: '',
    },
    {
      title: 'YTD Received',
      value: formatCurrency(stats.ytdReceived),
      icon: TrendingUp,
      change: '+15.3%',
    },
    {
      title: 'Average Payment',
      value: formatCurrency(stats.averagePayment),
      icon: CreditCard,
      change: '',
    },
    {
      title: 'Next Payment',
      value: stats.nextPaymentDate,
      icon: Calendar,
      change: '',
    },
  ];

  return (
    <PortalLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Payment History</h1>
          <p className="text-slate-600">Track your distributions and investment returns</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {summaryCards.map((card, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <card.icon className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-slate-900 mb-1">{card.value}</p>
                <p className="text-sm text-slate-600">{card.title}</p>
                {card.change && (
                  <p className="text-sm text-green-600 mt-2">{card.change}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              </div>
            ) : payments.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr className="text-left">
                      <th className="pb-3 font-semibold text-slate-700">Date</th>
                      <th className="pb-3 font-semibold text-slate-700">Type</th>
                      <th className="pb-3 font-semibold text-slate-700">Amount</th>
                      <th className="pb-3 font-semibold text-slate-700">Status</th>
                      <th className="pb-3 font-semibold text-slate-700">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment) => (
                      <tr key={payment.id} className="border-b last:border-0">
                        <td className="py-4 text-slate-700">
                          <div className="flex items-center">
                            <Calendar size={16} className="mr-2 text-slate-400" />
                            {formatDate(payment.payment_date)}
                          </div>
                        </td>
                        <td className="py-4 text-slate-700 capitalize">
                          <div className="flex items-center">
                            <Building2 size={16} className="mr-2 text-slate-400" />
                            {payment.payment_type.replace('_', ' ')}
                          </div>
                        </td>
                        <td className="py-4 font-semibold text-green-600">
                          {formatCurrency(Number(payment.amount))}
                        </td>
                        <td className="py-4">
                          <Badge className={getStatusBadge(payment.status)}>
                            {payment.status}
                          </Badge>
                        </td>
                        <td className="py-4 text-slate-600 text-sm">
                          {payment.notes || '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <DollarSign className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No Payments Yet</h3>
                <p className="text-slate-600">
                  Your payment history will appear here once distributions begin.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Stripe Integration Coming Soon
                </h3>
                <p className="text-slate-700 mb-4">
                  We're working on integrating Stripe for seamless payment processing and automated distributions.
                  This will enable real-time payment tracking and instant notifications.
                </p>
                <p className="text-sm text-slate-600">
                  <strong>Note:</strong> Current payment data is for demonstration purposes. Production implementation
                  will connect to Stripe's payment APIs.
                </p>
              </div>
              <CreditCard className="w-8 h-8 text-blue-600 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}

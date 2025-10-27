'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, FileText, CreditCard, Wrench, LogOut, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { supabase } from '@/lib/supabase';
import { signOut } from '@/lib/auth';
import { toast } from 'sonner';

export function PortalLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error || !user) {
        router.push('/login');
        return;
      }

      setUser(user);
      setLoading(false);
    }

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      (async () => {
        if (!session?.user) {
          router.push('/login');
        } else {
          setUser(session.user);
        }
      })();
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error('Failed to sign out');
      return;
    }
    toast.success('Signed out successfully');
    router.push('/');
  };

  const navigation = [
    { name: 'Dashboard', href: '/portal', icon: LayoutDashboard },
    { name: 'Documents', href: '/portal/documents', icon: FileText },
    { name: 'Payment History', href: '/portal/payments', icon: CreditCard },
    { name: 'Maintenance', href: '/portal/maintenance', icon: Wrench },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b z-50 px-4 py-3 flex items-center justify-between">
        <div className="text-xl font-bold text-slate-900">
          Investor Portal
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-slate-700"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="flex">
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          lg:block pt-16 lg:pt-0
        `}>
          <div className="h-full flex flex-col">
            <div className="p-6 border-b hidden lg:block">
              <Link href="/" className="text-2xl font-bold text-slate-900">
                RealEstate<span className="text-blue-600">Assets</span>
              </Link>
            </div>

            <nav className="flex-1 p-4 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <item.icon size={20} className="mr-3" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t">
              <div className="mb-4 px-4">
                <p className="text-sm font-semibold text-slate-900">{user?.user_metadata?.full_name || user?.email}</p>
                <p className="text-xs text-slate-500">{user?.email}</p>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleSignOut}
              >
                <LogOut size={18} className="mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </aside>

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className="flex-1 p-6 lg:p-8 pt-20 lg:pt-8">
          {children}
        </main>
      </div>
    </div>
  );
}

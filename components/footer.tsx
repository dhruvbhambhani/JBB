import Link from 'next/link';
import { Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-bold text-white mb-4">
              JBB Asset Management
            </div>
            <p className="text-sm mb-4">
              Professional real estate asset management delivering exceptional returns and strategic property investments.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-blue-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-blue-500 transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-blue-500 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/investors" className="hover:text-blue-500 transition-colors">
                  Investors
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2 text-sm">
              <li>Asset Management</li>
              <li>Property Investment</li>
              <li>Portfolio Optimization</li>
              <li>Market Analysis</li>
              <li>Strategic Planning</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <Mail size={16} className="flex-shrink-0" />
                <a href="mailto:jbbassetmanagement@yahoo.com" className="hover:text-blue-500 transition-colors">
                  jbbassetmanagement@yahoo.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-sm text-center">
          <p>
            &copy; {currentYear} JBB Asset Management LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
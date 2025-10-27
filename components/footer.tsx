import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-bold text-white mb-4">
              RealEstate<span className="text-blue-500">Assets</span>
            </div>
            <p className="text-sm mb-4">
              Professional real estate asset management delivering exceptional returns and strategic property investments.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-500 transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
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
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Investor Portal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/login" className="hover:text-blue-500 transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/portal" className="hover:text-blue-500 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/portal/documents" className="hover:text-blue-500 transition-colors">
                  Documents
                </Link>
              </li>
              <li>
                <Link href="/portal/payments" className="hover:text-blue-500 transition-colors">
                  Payment History
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>123 Investment Plaza, Suite 500<br />New York, NY 10001</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} className="flex-shrink-0" />
                <a href="tel:+12125551234" className="hover:text-blue-500 transition-colors">
                  (212) 555-1234
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={16} className="flex-shrink-0" />
                <a href="mailto:info@realestateassets.com" className="hover:text-blue-500 transition-colors">
                  info@realestateassets.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-sm text-center">
          <p>
            &copy; {currentYear} RealEstate Assets. All rights reserved. |{' '}
            <Link href="/privacy" className="hover:text-blue-500 transition-colors">
              Privacy Policy
            </Link>{' '}
            |{' '}
            <Link href="/terms" className="hover:text-blue-500 transition-colors">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

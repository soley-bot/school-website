'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FooterContent } from '@/types/content';

interface FooterProps {
  content?: FooterContent;
}

const defaultCampuses = [
  {
    name: 'Main Campus',
    address: '123 Education Street, District 1',
    phone: '(123) 456-7890',
    email: 'info@stanford.edu'
  }
];

export default function Footer({ content }: FooterProps) {
  // Use content if provided, otherwise use default values
  const footerContent = content || {
    about_text: 'STANFORD AMERICAN SCHOOL provides quality education with a focus on academic excellence and personal growth.',
    address_line1: '123 Education Street',
    address_line2: 'Bangkok, Thailand',
    phone: '(123) 456-7890',
    email: 'info@stanford.edu',
    copyright_text: 'STANFORD AMERICAN SCHOOL. All rights reserved.',
  };

  return (
    <footer className="bg-[#2596be] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* School Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-14 h-14 rounded-full bg-white flex items-center justify-center p-2 shadow-sm">
                <Image
                  src="/images/logo.png"
                  alt="STANFORD American School"
                  fill
                  className="object-contain"
                  quality={100}
                />
              </div>
              <span className="text-lg font-semibold flex-1">
                STANFORD American School
              </span>
            </div>
            <p className="text-white/80 mb-6 whitespace-pre-line">
              {footerContent.about_text}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-white/80 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/academics" className="text-white/80 hover:text-white transition-colors">
                  Academics
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-white/80 hover:text-white transition-colors">
                  News
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-white/80">
                <h4 className="font-medium text-white mb-2">Main Location</h4>
                <ul className="space-y-2 text-sm">
                  <li>{footerContent.address_line1}</li>
                  <li>{footerContent.address_line2}</li>
                  <li>Tel: {footerContent.phone}</li>
                  <li>Email: {footerContent.email}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-white/80">
          <p>&copy; {new Date().getFullYear()} {footerContent.copyright_text}</p>
        </div>
      </div>
    </footer>
  );
} 
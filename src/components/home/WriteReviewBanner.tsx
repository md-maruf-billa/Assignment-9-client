'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function WriteReviewBanner() {
  return (
    <div className="relative w-full bg-white border-t border-b border-gray-200 py-4">
      <div className="absolute top-1/2 left-0 w-full h-px bg-gray-200 -z-10 transform -translate-y-1/2" />
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-gray-300 rounded-full bg-white shadow-sm text-sm text-gray-800">
          <span>Bought something recently?</span>
          <Link
            href="/write-review"
            className="text-blue-600 hover:underline flex items-center gap-1"
          >
            Write a review
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}

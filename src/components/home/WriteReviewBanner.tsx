'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function WriteReviewBanner() {
  return (
    <div className="w-full py-6 relative flex items-center justify-center">
      {/* Horizontal line */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-gray-200" />

      {/* Centered pill-style banner */}
      <div className="relative z-10 px-4 py-1.5 border border-gray-300 rounded-full shadow-sm flex items-center gap-2 text-sm text-gray-800 backdrop-blur-sm">
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
  );
}

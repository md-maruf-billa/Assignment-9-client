'use client';

import { Button } from '@/components/ui/button';

export default function BusinessPromo() {
  return (
    <section className="bg-[#ffe6eb] py-6 px-4 sm:px-8 mt-10 rounded-3xl">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">
            Looking to grow your business?
          </h3>
          <p className="text-xs sm:text-sm text-gray-700 leading-snug">
            Strengthen your reputation with real reviews on Trustpilot.
          </p>
        </div>
        <Button className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-full">
          Get started
        </Button>
      </div>
    </section>
  );
}

import BusinessPromo from '@/components/home/BusinessPromo';
import CategorySlider from '@/components/home/CategorySlider';
import ReviewBanner from '@/components/home/ReviewBanner';
import SearchHero from '@/components/home/SearchHero';
import SiteBanner from '@/components/home/SiteBanner';
import React from 'react';

const HomePage = () => {
  return (
    <main>
      <SearchHero />
      <div className="container mx-auto">
        <CategorySlider />
        <BusinessPromo />
        <ReviewBanner />
        <SiteBanner />
      </div>
    </main>
  );
};

export default HomePage;

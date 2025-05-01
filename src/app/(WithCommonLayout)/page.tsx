import BusinessPromo from '@/components/home/BusinessPromo';
import ReviewBanner from '@/components/home/ReviewBanner';
import SearchHero from '@/components/home/SearchHero';
import SiteBanner from '@/components/home/SiteBanner';
import React from 'react';

const HomePage = () => {
  return (
    <div>
      <SearchHero />
      <BusinessPromo />
      <ReviewBanner />
      <SiteBanner />
    </div>
  );
};

export default HomePage;

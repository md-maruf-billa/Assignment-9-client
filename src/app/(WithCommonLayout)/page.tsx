import BusinessPromo from '@/components/home/BusinessPromo';
import CategorySlider from '@/components/home/CategorySlider';
import RecentReview from '@/components/home/RecentReview';
import ReviewBanner from '@/components/home/ReviewBanner';
import SearchHero from '@/components/home/SearchHero';
import SiteBanner from '@/components/home/SiteBanner';
import SiteComparison from '@/components/home/SiteComparison';
import SiteReview from '@/components/home/SiteReview';
import WriteReviewBanner from '@/components/home/WriteReviewBanner';
import React from 'react';

const HomePage = () => {
  return (
    <main>
      <SearchHero />
      <div className="container mx-auto">
        <WriteReviewBanner />
        <CategorySlider />
        <BusinessPromo />
        <SiteComparison />
        <ReviewBanner />
        <SiteReview />
        <SiteBanner />
        <RecentReview />
      </div>
    </main>
  );
};

export default HomePage;

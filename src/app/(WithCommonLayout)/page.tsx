import BusinessPromo from '@/components/home/BusinessPromo';
import CategorySlider, { ICategory } from '@/components/home/CategorySlider';

import FaqAccordion from '@/components/home/FaqAccordion';
import PartnerCompany from '@/components/home/PartnerCompany';
import RecentReview from '@/components/home/RecentReview';
import ReviewBanner from '@/components/home/ReviewBanner';
import SearchHero from '@/components/home/SearchHero';
import SiteBanner from '@/components/home/SiteBanner';
import SiteComparison from '@/components/home/SiteComparison';
import SiteReview from '@/components/home/SiteReview';
import TeamSection from '@/components/home/TeamSeaction';
import WriteReviewBanner from '@/components/home/WriteReviewBanner';
import { allCategory } from '@/services/category';

const HomePage = async () => {
  const { data: categories } = await allCategory();
  return (
    <main>
      <SearchHero />
      <div className="container mx-auto space-y-7">
        <WriteReviewBanner />
        <CategorySlider {...(categories as ICategory[])} />
        <BusinessPromo />
        <SiteReview />
        <ReviewBanner />
        <SiteComparison />
        <SiteBanner />
        <RecentReview />
        <FaqAccordion />
        <PartnerCompany />
        <TeamSection />
      </div>
    </main>
  );
};

export default HomePage;

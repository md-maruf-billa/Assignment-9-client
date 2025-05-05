import BusinessPromo from '@/components/home/BusinessPromo';
import CategorySlider from '@/components/home/CategorySlider';
import ContactUs from '@/components/home/ContactUs';
import FaqAccordion from '@/components/home/FaqAccordion';
import PartnerCompany from '@/components/home/PartnerCompany';
import RecentReview from '@/components/home/RecentReview';
import ReviewBanner from '@/components/home/ReviewBanner';
import SearchHero from '@/components/home/SearchHero';
import SiteBanner from '@/components/home/SiteBanner';
import SiteComparison from '@/components/home/SiteComparison';
import SiteReview from '@/components/home/SiteReview';
import WriteReviewBanner from '@/components/home/WriteReviewBanner';

const HomePage = () => {
  return (
    <main>
      <SearchHero />
      <div className="container mx-auto space-y-7">
        <WriteReviewBanner />
        <CategorySlider />
        <BusinessPromo />
        <SiteReview />
        <ReviewBanner />
        <SiteComparison />
        <SiteBanner />
        <RecentReview />
        <FaqAccordion />
        <PartnerCompany />
        <ContactUs />
      </div>
    </main>
  );
};

export default HomePage;

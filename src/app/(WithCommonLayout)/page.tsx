import BusinessPromo from "@/components/home/BusinessPromo";
import CategorySlider, { ICategory } from "@/components/home/CategorySlider";

import FaqAccordion from "@/components/home/FaqAccordion";
import PartnerCompany from "@/components/home/PartnerCompany";
import RecentReview from "@/components/home/RecentReview";
import ReviewBanner from "@/components/home/ReviewBanner";
import SearchHero from "@/components/home/SearchHero";
import SiteBanner from "@/components/home/SiteBanner";
import SiteComparison from "@/components/home/SiteComparison";
import SiteReview from "@/components/home/SiteReview";
import TeamSection from "@/components/home/TeamSeaction";
import WriteReviewBanner from "@/components/home/WriteReviewBanner";
import { allCategory } from "@/services/category";
import { get_all_company } from "@/services/company";
import { get_all_products_action } from "@/services/product";
import { getALlReview } from "@/services/review";

const HomePage = async () => {
  const { data: categories } = await allCategory();
  const { data: productData } = await get_all_products_action();
  const { data: companies } = await get_all_company();
  const { data: reviews } = await getALlReview();

  return (
    <main>
      <SearchHero />
      <div className="container mx-auto space-y-7">
        <WriteReviewBanner />
        <CategorySlider {...(categories as ICategory[])} />
        <BusinessPromo />
        <SiteReview products={productData} />
        <ReviewBanner />
        <SiteComparison companies={companies} />
        <SiteBanner />
        <RecentReview reviews={reviews} />
        <FaqAccordion />
        <PartnerCompany />
        <TeamSection />
      </div>
    </main>
  );
};

export default HomePage;

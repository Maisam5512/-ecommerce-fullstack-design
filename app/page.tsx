import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import DealsSection from "@/components/deals-section"
import CategorySections from "@/components/category-sections"
import QuoteSection from "@/components/quote-section"
import RecommendedItems from "@/components/recommended-items"
import ExtraServices from "@/components/extra-services"
import SuppliersByRegion from "@/components/suppliers-by-region-copy"
import Newsletter from "@/components/newsletter"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <HeroSection />
        <DealsSection />
        <div className="container mx-auto px-4 py-8">
          <CategorySections />
          <QuoteSection />
        </div>

        <RecommendedItems />
        <ExtraServices />
        <SuppliersByRegion />
      </main>
      <Newsletter />
      <Footer />
    </div>
  )
}

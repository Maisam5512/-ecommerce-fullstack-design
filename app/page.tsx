import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import DealsSection from "@/components/deals-section"
import CategorySections from "@/components/category-sections"
import QuoteSection from "@/components/quote-section"
import RecommendedItems from "@/components/recommended-items"
import ExtraServices from "@/components/extra-services"
import SuppliersByRegion from "@/components/suppliers-by-region"
import Newsletter from "@/components/newsletter"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <DealsSection />
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CategorySections />
            </div>
            <div className="lg:col-span-1">
              <QuoteSection />
            </div>
          </div>
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

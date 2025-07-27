import Header from "@/components/header"
import ProductListingContent from "@/components/product-listing-content"
import Newsletter from "@/components/newsletter"
import Footer from "@/components/footer"

export default function ProductListingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <ProductListingContent />
      <Newsletter />
      <Footer />
    </div>
  )
}

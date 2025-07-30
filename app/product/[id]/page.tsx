import Header from "@/components/header"
import ProductDetailContent from "@/components/product-detial-content"
import Newsletter from "@/components/newsletter"
import Footer from "@/components/footer"

export default function ProductDetailPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <ProductDetailContent />
      <Newsletter />
      <Footer />
    </div>
  )
}

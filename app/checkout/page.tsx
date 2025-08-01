import Header from "@/components/header"
import CheckoutContent from "@/components/checkout-content"
import Newsletter from "@/components/newsletter"
import Footer from "@/components/footer"

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <CheckoutContent />
      <Newsletter />
      <Footer />
    </div>
  )
}

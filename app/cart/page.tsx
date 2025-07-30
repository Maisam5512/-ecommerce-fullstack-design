import Header from "@/components/header"
import CartContent from "@/components/cart-content"
import Newsletter from "@/components/newsletter"
import Footer from "@/components/footer"

export default function CartPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <CartContent />
      <Newsletter />
      <Footer />
    </div>
  )
}

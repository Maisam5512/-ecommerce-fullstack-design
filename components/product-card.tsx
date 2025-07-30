import Image from "next/image"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Product {
  id: number
  name: string
  price: string
  originalPrice?: string
  rating: number
  orders: number
  image: string
  description: string
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg border p-6 hover:shadow-lg transition-shadow">
      <div className="grid md:grid-cols-4 gap-6">
        {/* Product Image */}
        <div className="md:col-span-1">
          <div className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={200}
              height={200}
              className="object-contain"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>

          <div className="flex items-center space-x-4 mb-3">
            <div className="flex items-center space-x-1">
              <span className="text-2xl font-bold text-gray-800">{product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through">{product.originalPrice}</span>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4 mb-3">
            <div className="flex items-center space-x-1">
              <div className="flex text-orange-400">
                {"★★★★☆".split("").map((star, i) => (
                  <span key={i} className="text-sm">
                    {star}
                  </span>
                ))}
              </div>
              <span className="text-sm text-orange-500 font-medium">{product.rating}</span>
            </div>
            <span className="text-sm text-gray-500">• {product.orders} orders</span>
            <span className="text-sm text-green-600 font-medium">Free Shipping</span>
          </div>

          <p className="text-sm text-gray-600 mb-4 leading-relaxed">{product.description}</p>

          <Button variant="link" className="text-blue-600 p-0 h-auto">
            View details
          </Button>
        </div>

        {/* Wishlist */}
        <div className="md:col-span-1 flex justify-end">
          <Button variant="ghost" size="sm" className="p-2">
            <Heart className="w-5 h-5 text-gray-400 hover:text-red-500" />
          </Button>
        </div>
      </div>
    </div>
  )
}


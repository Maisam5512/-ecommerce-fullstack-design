import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import AddToCartButton from "@/components/add-to-cart-button"

interface Product {
  _id: string
  name: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  orders: number
  image: string
  description: string
  stock: number
  discount?: number
}

interface ProductCardProps {
  product: Product
  variant?: "grid" | "list"
}

export default function ProductCardWithCart({ product, variant = "grid" }: ProductCardProps) {
  const discountedPrice = product.discount ? product.price * (1 - product.discount / 100) : product.price

  if (variant === "list") {
    return (
      <div className="bg-white rounded-lg border   p-6 hover:shadow-lg transition-shadow">
        <div className="grid md:grid-cols-4 gap-6 ">
          {/* Product Image */}
          <div className="md:col-span-1 ">
            <Link href={`/product/${product._id}`}>
              <div className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center cursor-pointer">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="object-contain hover:scale-105 transition-transform"
                />
              </div>
            </Link>
          </div>

          {/* Product Details */}
          <div className="md:col-span-2">
            <Link href={`/product/${product._id}`}>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-blue-600 cursor-pointer">
                {product.name}
              </h3>
            </Link>

            <div className="flex items-center space-x-4 mb-3">
              <div className="flex items-center space-x-1">
                <span className="text-2xl font-bold text-gray-800">${discountedPrice.toFixed(2)}</span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-lg text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
                )}
                {product.discount && product.discount > 0 && (
                  <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded-full">
                    -{product.discount}%
                  </span>
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
              <span className="text-sm text-gray-500">• {product.reviews} reviews</span>
              <span className="text-sm text-gray-500">• {product.orders} orders</span>
              <span className="text-sm text-green-600 font-medium">Free Shipping</span>
            </div>

            <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-2">{product.description}</p>

            <div className="flex items-center space-x-4">
              <AddToCartButton productId={product._id} stock={product.stock} size="sm" />
              <Link href={`/product/${product._id}`}>
                <Button variant="link" className="text-blue-600 p-0 h-auto">
                  View details
                </Button>
              </Link>
            </div>
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

  // Grid variant
  return (
    <Card className="hover:shadow-lg transition-shadow bg-white">
      <CardContent className="p-4">
        <Link href={`/product/${product._id}`}>
          <div className="aspect-square mb-4 bg-gray-50 rounded-lg flex items-center justify-center cursor-pointer">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={200}
              height={200}
              className="object-contain hover:scale-105 transition-transform"
            />
          </div>
        </Link>

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-800">${discountedPrice.toFixed(2)}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <Button variant="ghost" size="sm" className="p-1">
            <Heart className="w-4 h-4 text-gray-400 hover:text-red-500" />
          </Button>
        </div>

        {product.discount && product.discount > 0 && (
          <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded-full mb-2 inline-block">
            -{product.discount}% OFF
          </span>
        )}

        <Link href={`/product/${product._id}`}>
          <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 cursor-pointer">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center space-x-1 mb-3">
          <div className="flex text-orange-400">
            {"★★★★☆".split("").map((star, i) => (
              <span key={i} className="text-xs">
                {star}
              </span>
            ))}
          </div>
          <span className="text-xs text-orange-500 font-medium">({product.reviews})</span>
        </div>

        <AddToCartButton productId={product._id} stock={product.stock} size="sm" className="w-full" />

        {product.stock <= 5 && product.stock > 0 && (
          <p className="text-xs text-orange-600 mt-2">Only {product.stock} left in stock!</p>
        )}
      </CardContent>
    </Card>
  )
}







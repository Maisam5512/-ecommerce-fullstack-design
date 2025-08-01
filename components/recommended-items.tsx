"use client"

import { useEffect, useState } from "react"
import { productAPI } from "@/lib/api"
import ProductCardWithCart from "@/components/product-card-with-cart"
import { Skeleton } from "@/components/ui/skeleton"

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

export default function RecommendedItems() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productAPI.getProducts({
          limit: 10,
          featured: true,
        })
        if (response.success) {
          setProducts(response.data)
        }
      } catch (error) {
        console.error("Error fetching recommended products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-gray-800 mb-8">Recommended items</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[...Array(10)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg p-4">
                <Skeleton className="aspect-square mb-4 rounded-lg" />
                <Skeleton className="h-4 mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h3 className="text-2xl font-bold text-gray-800 mb-8">Recommended items</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <ProductCardWithCart key={product._id} product={product} variant="grid" />
          ))}
        </div>
      </div>
    </div>
  )
}







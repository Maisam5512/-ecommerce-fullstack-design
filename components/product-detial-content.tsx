"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { ChevronRight, Check, Heart, Globe, Shield, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import Link from "next/link"
import ProductSpecs from "@/components/product-specs"
import AddToCartButton from "@/components/add-to-cart-button"
import { productAPI } from "@/lib/api"
import { Skeleton } from "@/components/ui/skeleton"
import toast from "react-hot-toast"

export default function ProductDetailContent() {
  const params = useParams()
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [relatedProducts, setRelatedProducts] = useState([])

  useEffect(() => {
    if (params.id) {
      fetchProduct(params.id as string)
    }
  }, [params.id])

  const fetchProduct = async (id: string) => {
    try {
      setLoading(true)
      const response = await productAPI.getProduct(id)

      if (response.success) {
        setProduct(response.data)
        // Fetch related products from same category
        fetchRelatedProducts(response.data.category, id)
      }
    } catch (error) {
      console.error("Error fetching product:", error)
      toast.error("Product not found")
    } finally {
      setLoading(false)
    }
  }

  const fetchRelatedProducts = async (category: string, excludeId: string) => {
    try {
      const response = await productAPI.getProducts({
        category,
        limit: 6,
      })

      if (response.success) {
        // Filter out current product
        const filtered = response.data.filter((p: any) => p._id !== excludeId)
        setRelatedProducts(filtered.slice(0, 5))
      }
    } catch (error) {
      console.error("Error fetching related products:", error)
    }
  }

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${index < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ))
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6 mb-12">
          <div className="lg:col-span-1">
            <Skeleton className="aspect-square mb-4" />
            <div className="grid grid-cols-6 gap-2">
              {[...Array(6)].map((_, index) => (
                <Skeleton key={index} className="aspect-square" />
              ))}
            </div>
          </div>
          <div className="lg:col-span-2">
            <Skeleton className="h-8 mb-4" />
            <Skeleton className="h-6 mb-4" />
            <Skeleton className="h-32 mb-4" />
          </div>
          <div className="lg:col-span-1">
            <Skeleton className="h-64" />
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="text-center py-16">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Product not found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist</p>
          <Link href="/products">
            <Button className="bg-blue-500 hover:bg-blue-600">Browse Products</Button>
          </Link>
        </div>
      </div>
    )
  }

  const images = product.images && product.images.length > 0 ? product.images : [product.image]
  const discountedPrice = product.discount ? product.price * (1 - product.discount / 100) : product.price

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/products" className="hover:text-blue-600">
          Products
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span>{product.category}</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-800">{product.name}</span>
      </div>

      {/* Main Product Section */}
      <div className="grid lg:grid-cols-4 gap-6 mb-12">
        {/* Product Images */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg p-6 h-full">
            <div className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center mb-4">
              <Image
                src={images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                width={400}
                height={400}
                className="object-contain max-h-full max-w-full"
              />
            </div>
            <div className="grid grid-cols-6 gap-2">
              {images.map((image: string, index: number) => (
                <div
                  key={index}
                  className={`aspect-square bg-gray-50 rounded border-2 ${
                    index === selectedImage ? "border-blue-500" : "border-gray-200"
                  } flex items-center justify-center cursor-pointer hover:border-blue-500`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg p-6 h-full">
            <div className="flex items-center space-x-2 mb-3">
              <Check className="w-4 h-4 text-green-500" />
              <span className="text-green-600 text-sm font-medium">
                {product.stock > 0 ? `In stock (${product.stock} available)` : "Out of stock"}
              </span>
            </div>

            <h1 className="text-2xl font-bold text-gray-800 mb-4">{product.name}</h1>

            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center space-x-1">
                <div className="flex">{renderStars(product.rating || 0)}</div>
                <span className="text-orange-500 font-medium">{product.rating || 0}</span>
              </div>
              <span className="text-gray-500">• {product.reviews || 0} reviews</span>
              <span className="text-gray-500">• {product.orders || 0} sold</span>
            </div>

            {/* Pricing */}
            <div className="mb-6">
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl font-bold text-gray-800">${discountedPrice.toFixed(2)}</span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-xl text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
                )}
                {product.discount && product.discount > 0 && (
                  <span className="bg-red-100 text-red-600 text-sm font-semibold px-3 py-1 rounded-full">
                    -{product.discount}% OFF
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Specifications */}
            {product.specifications && (
              <div className="space-y-3 mb-6">
                <h3 className="font-semibold text-gray-800">Specifications</h3>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  {product.specifications.size && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Size:</span>
                      <span className="text-gray-800">{product.specifications.size}</span>
                    </div>
                  )}
                  {product.specifications.color && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Color:</span>
                      <span className="text-gray-800">{product.specifications.color}</span>
                    </div>
                  )}
                  {product.specifications.material && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Material:</span>
                      <span className="text-gray-800">{product.specifications.material}</span>
                    </div>
                  )}
                  {product.brand && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Brand:</span>
                      <span className="text-gray-800">{product.brand}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <div className="border-t pt-6">
              <AddToCartButton productId={product._id} stock={product.stock} className="w-full" size="lg" />
            </div>
          </div>
        </div>

        {/* Seller Info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg p-6 h-full">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                <span className="text-teal-600 font-bold text-lg">{product.seller?.name?.charAt(0) || "S"}</span>
              </div>
              <div>
                <div className="text-sm text-gray-500">Seller</div>
                <div className="font-semibold text-gray-800">{product.seller?.name || "Default Seller"}</div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{product.seller?.location || "Unknown Location"}</span>
              </div>
              {product.seller?.verified && (
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-gray-600">Verified Seller</span>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Worldwide shipping</span>
              </div>
            </div>

            <div className="space-y-3">
              <Button className="w-full bg-blue-500 hover:bg-blue-600">Contact Seller</Button>
              <Button variant="outline" className="w-full bg-transparent">
                Seller's profile
              </Button>
              <Button variant="ghost" className="w-full text-blue-600 hover:text-blue-700">
                <Heart className="w-4 h-4 mr-2" />
                Save for later
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Related products</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {relatedProducts.map((relatedProduct: any) => (
              <Link key={relatedProduct._id} href={`/product/${relatedProduct._id}`}>
                <div className="bg-white rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center mb-3">
                    <Image
                      src={relatedProduct.image || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      width={120}
                      height={120}
                      className="object-contain"
                    />
                  </div>
                  <h4 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2">{relatedProduct.name}</h4>
                  <p className="text-sm font-bold text-gray-900">${relatedProduct.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Product Details Tabs */}
      <div className="bg-white rounded-lg">
        <Tabs defaultValue="description">
          <TabsList className="grid w-full grid-cols-4 bg-gray-50 rounded-t-lg">
            <TabsTrigger value="description" className="rounded-none">
              Description
            </TabsTrigger>
            <TabsTrigger value="specifications" className="rounded-none">
              Specifications
            </TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-none">
              Reviews ({product.reviews || 0})
            </TabsTrigger>
            <TabsTrigger value="shipping" className="rounded-none">
              Shipping
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="p-6">
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">{product.description}</p>
              {product.tags && product.tags.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-800 mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag: string, index: number) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="specifications" className="p-6">
            <ProductSpecs product={product} />
          </TabsContent>

          <TabsContent value="reviews" className="p-6">
            <div className="text-center py-8">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No reviews yet</h3>
              <p className="text-gray-600">Be the first to review this product</p>
              <Button className="mt-4 bg-blue-500 hover:bg-blue-600">Write a Review</Button>
            </div>
          </TabsContent>

          <TabsContent value="shipping" className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Standard delivery: 3-5 business days</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Express delivery: 1-2 business days</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">30-day return policy</span>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}


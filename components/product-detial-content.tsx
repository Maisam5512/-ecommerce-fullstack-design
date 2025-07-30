import { ChevronRight, Check, Heart, Globe, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import RelatedProducts from "@/components/related-products"
import ProductSpecs from "@/components/product-specs"

export default function ProductDetailContent() {
  const thumbnails = [
    "/images/Details/1.png",
    "/images/Details/2.png",
    "/images/Details/3.png",
    "/images/Details/4.png",
    "/images/Details/5.png",
    "/images/Details/6.png",
  ]

  const youMayLike = [
    {
      name: "Men Blazers Sets Elegant Formal",
      price: "$7.00 - $99.50",
      image: "/images/cloth/1.jpg",
    },
    {
      name: "Men Shirt Sleeve Polo Contrast",
      price: "$7.00 - $99.50",
      image: "/images/cloth/2.jpg",
    },
    {
      name: "Apple Watch Series Space Gray",
      price: "$7.00 - $99.50",
      image: "/images/cloth/3.jpg",
    },
    {
      name: "Basketball Crew Socks Long Stuff",
      price: "$7.00 - $99.50",
      image: "/images/cloth/4.jpg",
    },
    {
      name: "New Summer Men's castrol T-Shirts",
      price: "$7.00 - $99.50",
      image: "/images/cloth/5.jpg",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
        <span>Home</span>
        <ChevronRight className="w-4 h-4" />
        <span>Clothings</span>
        <ChevronRight className="w-4 h-4" />
        <span>Men's wear</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-800">Summer clothing</span>
      </div>

      {/* Main Product Section - Equal Height Blocks */}
      <div className="grid lg:grid-cols-4 gap-6 mb-12">
        {/* Product Images */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg p-6 h-full">
            <div className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center mb-4">
              <Image
                src="/images/Details/1.png"
                alt="Product"
                width={400}
                height={400}
                className="object-contain"
              />
            </div>
            <div className="grid grid-cols-6 gap-2">
              {thumbnails.map((thumb, index) => (
                <div
                  key={index}
                  className={`aspect-square bg-gray-50 rounded border-2 ${
                    index === 0 ? "border-blue-500" : "border-gray-200"
                  } flex items-center justify-center cursor-pointer hover:border-blue-500`}
                >
                  <Image
                    src={thumb || "/placeholder.svg"}
                    alt={`Thumbnail ${index + 1}`}
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
              <span className="text-green-600 text-sm font-medium">In stock</span>
            </div>

            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Mens Long Sleeve T-shirt Cotton Base Layer Slim Muscle
            </h1>

            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center space-x-1">
                <div className="flex text-orange-400">
                  {"★★★★☆".split("").map((star, i) => (
                    <span key={i} className="text-lg">
                      {star}
                    </span>
                  ))}
                </div>
                <span className="text-orange-500 font-medium">9.3</span>
              </div>
              <span className="text-gray-500">• 32 reviews</span>
              <span className="text-gray-500">• 154 sold</span>
            </div>

            {/* Pricing Tiers */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-red-600 mb-1">$98.00</div>
                <div className="text-sm text-gray-600">50-100 pcs</div>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-gray-800 mb-1">$90.00</div>
                <div className="text-sm text-gray-600">100-700 pcs</div>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-gray-800 mb-1">$78.00</div>
                <div className="text-sm text-gray-600">700+ pcs</div>
              </div>
            </div>

            {/* Product Specifications */}
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <span className="text-gray-500">Price:</span>
                <span className="col-span-2 text-gray-800">Negotiable</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <span className="text-gray-500">Type:</span>
                <span className="col-span-2 text-gray-800">Classic shoes</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <span className="text-gray-500">Material:</span>
                <span className="col-span-2 text-gray-800">Plastic material</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <span className="text-gray-500">Design:</span>
                <span className="col-span-2 text-gray-800">Modern nice</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <span className="text-gray-500">Customization:</span>
                <span className="col-span-2 text-gray-800">Customized logo and design custom packages</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <span className="text-gray-500">Protection:</span>
                <span className="col-span-2 text-gray-800">Refund Policy</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <span className="text-gray-500">Warranty:</span>
                <span className="col-span-2 text-gray-800">2 years full warranty</span>
              </div>
            </div>
          </div>
        </div>

        {/* Supplier Info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg p-6 h-full">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                <span className="text-teal-600 font-bold text-lg">R</span>
              </div>
              <div>
                <div className="text-sm text-gray-500">Supplier</div>
                <div className="font-semibold text-gray-800">Guanjoi Trading LLC</div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-2">
                <Image src="/images/flags/DE.png" alt="Germany" width={24} height={16} />
                <span className="text-sm text-gray-600">Germany, Berlin</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-gray-600">Verified Seller</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Worldwide shipping</span>
              </div>
            </div>

            <div className="space-y-3">
              <Button className="w-full bg-blue-500 hover:bg-blue-600">Send inquiry</Button>
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
      <RelatedProducts />

      {/* Product Details Tabs and You May Like - Same Block */}
      <div className="grid lg:grid-cols-4 gap-6 mt-12">
        <div className="lg:col-span-3">
          <Tabs defaultValue="description" className="bg-white rounded-lg h-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-50 rounded-t-lg">
              <TabsTrigger value="description" className="rounded-none">
                Description
              </TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-none">
                Reviews
              </TabsTrigger>
              <TabsTrigger value="shipping" className="rounded-none">
                Shipping
              </TabsTrigger>
              <TabsTrigger value="seller" className="rounded-none">
                About seller
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="p-6">
              <div className="space-y-6">
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                    dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  </p>
                </div>

                <ProductSpecs />

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-gray-700">Some great feature name here</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-gray-700">Lorem ipsum dolor sit amet, consectetur</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-gray-700">Duis aute irure dolor in reprehenderit</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-gray-700">Some great feature name here</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="p-6">
              <div className="text-gray-700">Reviews content will be displayed here...</div>
            </TabsContent>

            <TabsContent value="shipping" className="p-6">
              <div className="text-gray-700">Shipping information will be displayed here...</div>
            </TabsContent>

            <TabsContent value="seller" className="p-6">
              <div className="text-gray-700">Seller information will be displayed here...</div>
            </TabsContent>
          </Tabs>
        </div>

        {/* You may like - Same height as tabs */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg p-6 h-full">
            <h3 className="font-semibold text-gray-800 mb-4">You may like</h3>
            <div className="space-y-4">
              {youMayLike.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-50 rounded flex items-center justify-center">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-800 mb-1">{item.name}</h4>
                    <p className="text-sm text-gray-500">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

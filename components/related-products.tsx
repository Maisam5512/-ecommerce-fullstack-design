import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function RelatedProducts() {
  const products = [
    {
      name: "Xiaomi Redmi 8 Original",
      price: "$32.00-$40.00",
      image: "/images/cloth/6.jpg",
    },
    {
      name: "Xiaomi Redmi 8 Original",
      price: "$32.00-$40.00",
      image: "/images/tech/8.jpg",
    },
    {
      name: "Xiaomi Redmi 8 Original",
      price: "$32.00-$40.00",
      image: "/images/tech/9.jpg",
    },
    {
      name: "Xiaomi Redmi 8 Original",
      price: "$32.00-$40.00",
      image: "/images/cloth/4.jpg",
    },
    {
      name: "Xiaomi Redmi 8 Original",
      price: "$32.00-$40.00",
      image: "/images/interior/7.jpg",
    },
    {
      name: "Xiaomi Redmi 8 Original",
      price: "$32.00-$40.00",
      image: "/images/tech/10.jpg",
    },
  ]

  return (
    <div className="mb-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Related products</h3>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8 bg-white">
        {products.map((product, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow  border-gray-300">
            <CardContent className="p-4">
              <div className="aspect-square bg-white rounded-lg flex items-center justify-center mb-3">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="object-contain"
                />
              </div>
              <h4 className="text-sm font-medium text-gray-800 mb-2">{product.name}</h4>
              <p className="text-sm text-gray-500">{product.price}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Promotional Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-2">Super discount on more than 100 USD</h3>
          <p className="text-blue-100 mb-6">Have you ever finally just write dummy info</p>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">Shop now</Button>
        </div>
        <div className="absolute right-0 top-0 w-64 h-full bg-blue-400 opacity-30 transform rotate-12"></div>
      </div>
    </div>
  )
}

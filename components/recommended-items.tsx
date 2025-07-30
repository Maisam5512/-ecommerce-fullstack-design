import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export default function RecommendedItems() {
  const items = [
    {
      name: "T-shirts with multiple colors, for men",
      price: "$10.30",
      image: "/images/cloth/1.jpg",
    },
    {
      name: "Jeans shorts for men blue color",
      price: "$10.30",
      image: "/images/cloth/3.jpg",
    },
    { name: "Brown winter coat medium size", price: "$12.50", image: "/images/cloth/7.jpg" },
    { name: "Jeans bag for travel for men", price: "$34.00", image: "/images/cloth/6.jpg" },
    { name: "Leather wallet", price: "$99.00", image: "/images/cloth/5.jpg" },
    { name: "Jeans bag camera with lens", price: "$9.99", image: "/images/cloth/4.jpg" },
    { name: "Headset for gaming with mic", price: "$8.99", image: "/images/tech/9.jpg" },
    { name: "Smartwatch silver color modern", price: "$10.30", image: "/images/cloth/5.jpg" },
    {
      name: "Blue wallet for men leather material",
      price: "$10.30",
      image: "/images/interior/3.jpg",
    },
    { name: "Jeans bag for travel for men", price: "$80.95", image: "/images/tech/10.jpg" },
  ]

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h3 className="text-2xl font-bold text-gray-800 mb-8">Recommended items</h3>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 ">
          {items.map((item, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow bg-white border border-gray-300">
              <CardContent className="p-4">
                <div className="aspect-square mb-4 rounded-lg flex items-center justify-center">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={200}
                    height={200}
                    className="object-contain"
                  />
                </div>
                <p className="text-lg font-bold text-gray-800 mb-2">{item.price}</p>
                <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{item.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

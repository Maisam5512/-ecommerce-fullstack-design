import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function CategorySections() {
  const homeOutdoorItems = [
    { name: "Soft chairs", price: "From USD 19", image: "/images/interior/1.jpg" },
    { name: "Sofa & chair", price: "From USD 19", image: "/images/interior/6.jpg" },
    { name: "Kitchen dishes", price: "From USD 19", image: "/images/interior/5.jpg" },
    { name: "Smart watches", price: "From USD 19", image: "/images/interior/3.jpg" },
    { name: "Kitchen mixer", price: "From USD 100", image: "/images/interior/9.jpg" },
    { name: "Blenders", price: "From USD 39", image: "/images/interior/8.jpg" },
    { name: "Home appliance", price: "From USD 19", image: "/images/interior/7.jpg" },
    { name: "Coffee maker", price: "From USD 10", image: "/images/interior/4.jpg" },
  ]

  const electronicsItems = [
    { name: "Smart watches", price: "From USD 19", image: "/images/tech/8.jpg" },
    { name: "Cameras", price: "From USD 89", image: "/images/tech/6.jpg" },
    { name: "Headphones", price: "From USD 10", image: "/images/tech/9.jpg" },
    { name: "Smart watches", price: "From USD 90", image: "/images/tech/10.jpg" },
    { name: "Gaming set", price: "From USD 35", image: "/images/tech/5.jpg" },
    { name: "Laptops & PC", price: "From USD 340", image: "/images/tech/7.jpg" },
    { name: "Smartphones", price: "From USD 19", image: "/images/tech/2.jpg" },
    { name: "Electric kettle", price: "From USD 240", image: "/images/tech/1.jpg" },
  ]

  const CategoryBlock = ({
    title,
    buttonText,
    imageSrc,
    items,
  }: {
    title: string
    buttonText: string
    imageSrc: string
    items: typeof homeOutdoorItems
  }) => (
    <div className="bg-white rounded-lg overflow-hidden">
      <div className="grid md:grid-cols-4 gap-0">
        {/* Left Image Panel with Background Image */}
        <div
          className="relative p-6 flex flex-col justify-between h-full min-h-[280px] bg-cover bg-center"
          style={{ backgroundImage: `url(${imageSrc})` }}
        >
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 leading-snug">
              {title.split("\n").map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </h3>
            <Button variant="outline" size="sm" className="bg-white border-gray-300">
              {buttonText}
            </Button>
          </div>
        </div>

        {/* Right Items Grid */}
        <div className="md:col-span-3 p-0">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center border border-gray-100 py-6 px-2 text-center"
              >
                <div className="w-16 h-16 mb-3 rounded-lg flex items-center justify-center">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
                <h4 className="text-sm font-medium text-gray-800 mb-1">{item.name}</h4>
                <p className="text-xs text-gray-500">{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <CategoryBlock
        title={`Home and\noutdoor`}
        buttonText="Source now"
        imageSrc="/images/category/Banner1.png"
        items={homeOutdoorItems}
      />
      <CategoryBlock
        title={`Consumer\nelectronics and\ngadgets`}
        buttonText="Source now"
        imageSrc="/images/category/Banner2.png"
        items={electronicsItems}
      />
    </div>
  )
}


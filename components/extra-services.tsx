import Image from "next/image"
import { Search, Palette, Plane, Shield } from "lucide-react"

export default function ExtraServices() {
  const services = [
    {
      title: "Source from Industry Hubs",
      image: "/images/services/1.png",
      icon: <Search className="w-5 h-5 text-black" />,
    },
    {
      title: "Customize Your Products",
      image: "/images/services/2.png",
      icon: <Palette className="w-5 h-5 text-black" />,
    },
    {
      title: "Fast, reliable shipping by ocean or air",
      image: "/images/services/3.png",
      icon: <Plane className="w-5 h-5 text-black" />,
    },
    {
      title: "Product monitoring and inspection",
      image: "/images/services/4.png", // Ensure this path is correct
      icon: <Shield className="w-5 h-5 text-black" />,
    },
  ]

  return (
    <div className="py-12 bg-[#f6f9fc]">
      <div className="container mx-auto px-4">
        <h3 className="text-2xl font-bold text-gray-800 mb-8">Our extra services</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-md overflow-hidden"
            >
              {/* Image with icon absolutely at top-right */}
              <div className="relative w-full h-36">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2 bg-[#e3effc] p-2 rounded-full shadow-sm">
                  {service.icon}
                </div>
              </div>

              {/* Title */}
              <div className="p-4">
                <h4 className="text-sm font-medium text-gray-800 leading-snug">
                  {service.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}




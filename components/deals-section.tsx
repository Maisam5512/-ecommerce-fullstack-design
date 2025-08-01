import Image from "next/image"

export default function DealsSection() {
  const deals = [
    { name: "Smart watches", discount: "-25%", image: "/images/tech/8.jpg" },
    { name: "Laptops", discount: "-15%", image: "/images/tech/7.jpg" },
    { name: "GoPro cameras", discount: "-40%", image: "/images/tech/6.jpg" },
    { name: "Headphones", discount: "-25%", image: "/images/tech/5.jpg" },
    { name: "Canon cameras", discount: "-25%", image: "/images/tech/4.jpg" },
  ]

  return (
    <div className="container mx-auto px-4 mb-8">
      <div className="bg-white border border-gray-300 rounded-lg p-6">
        <div className="flex flex-col md:flex-row mb-6">
          {/* Left Section: Title + Timer */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-xl font-bold text-gray-800">Deals and offers</h3>
            <p className="text-gray-500 text-sm">Hygiene equipments</p>
            <div className="flex items-center space-x-2 mt-4">
              {["04", "13", "34", "56"].map((time, i) => (
                <div
                  key={i}
                  className="bg-gray-700 text-white px-3 py-2 rounded text-center min-w-[50px]"
                >
                  <div className="text-lg font-bold">{time}</div>
                  <div className="text-xs">
                    {["Days", "Hour", "Min", "Sec"][i]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section: Product Items */}
          <div className="w-full md:w-3/4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {deals.map((deal, index) => (
              <div
                key={index}
                className="text-center py-2"
              >
                <Image
                  src={deal.image}
                  alt={deal.name}
                  width={140}
                  height={140}
                  className="mx-auto object-contain"
                />
                <h4 className="text-sm font-medium text-gray-800 mt-2">
                  {deal.name}
                </h4>
                <span className="inline-block mt-1 bg-red-100 text-red-500 text-xs font-semibold px-3 py-1 rounded-full">
                  {deal.discount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


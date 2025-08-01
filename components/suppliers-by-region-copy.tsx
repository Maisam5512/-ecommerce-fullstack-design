export default function SuppliersByRegion() {
  const regions = [
    { country: "Arabic Emirates", code: "AE", website: "shopname.ae" },
    { country: "Australia", code: "AU", website: "shopname.ae" },
    { country: "United States", code: "US", website: "shopname.ae" },
    { country: "Russia", code: "RU", website: "shopname.ru" },
    { country: "Italy", code: "IT", website: "shopname.it" },
    { country: "Denmark", code: "DK", website: "denmark.com.dk" },
    { country: "France", code: "FR", website: "shopname.com.fr" },
    { country: "Arabic Emirates", code: "AE", website: "shopname.ae" },
    { country: "China", code: "CN", website: "shopname.cn" },
    { country: "Great Britain", code: "GB", website: "shopname.co.uk" },
  ]

  return (
    <div className="py-12 bg-[#f8fafc]"> {/* Light gray background to match design */}
      <div className="container mx-auto px-4">
        <h3 className="text-2xl font-bold text-gray-800 mb-8">Suppliers by region</h3>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {regions.map((region, index) => (
            <div key={index} className="flex items-center space-x-3">
              <img
                src={`/images/flags/${region.code}.png`}
                alt={`${region.country} flag`}
                className="w-8 h-6 object-cover  shadow"
              />
              <div>
                <h4 className="font-medium text-gray-800 text-sm">{region.country}</h4>
                <p className="text-xs text-gray-500">{region.website}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


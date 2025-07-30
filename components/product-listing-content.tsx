import { ChevronRight, Grid3X3, List, ChevronLeft, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import ProductCard from "@/components/product-card"

export default function ProductListingContent() {
  const products = [
    {
      id: 1,
      name: "Canon Cmera EOS 2000, Black 10x zoom",
      price: "$998.00",
      originalPrice: "$1128.00",
      rating: 7.5,
      orders: 154,
      image: "/images/tech/1.jpg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    },
    {
      id: 2,
      name: "GoPro HERO6 4K Action Camera - Black",
      price: "$998.00",
      rating: 7.5,
      orders: 154,
      image: "/images/tech/3.jpg",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit",
    },
    {
      id: 3,
      name: "GoPro HERO6 4K Action Camera - Black",
      price: "$998.00",
      rating: 7.5,
      orders: 154,
      image: "/images/tech/2.jpg",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit",
    },
    {
      id: 4,
      name: "GoPro HERO6 4K Action Camera - Black",
      price: "$998.00",
      originalPrice: "$1128.00",
      rating: 7.5,
      orders: 154,
      image: "/images/tech/7.jpg",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit",
    },
    {
      id: 5,
      name: "GoPro HERO6 4K Action Camera - Black",
      price: "$998.00",
      rating: 7.5,
      orders: 154,
      image: "/images/tech/8.jpg",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit",
    },
    {
      id: 6,
      name: "GoPro HERO6 4K Action Camera - Black",
      price: "$998.00",
      rating: 7.5,
      orders: 154,
      image: "/images/tech/9.jpg",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit",
    },
    {
      id: 7,
      name: "GoPro HERO6 4K Action Camera - Black",
      price: "$998.00",
      rating: 7.5,
      orders: 154,
      image: "/images/tech/4.jpg",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit",
    },
    {
      id: 8,
      name: "GoPro HERO6 4K Action Camera - Black",
      price: "$998.00",
      rating: 7.5,
      orders: 154,
      image: "/images/tech/6.jpg",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit",
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

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <div className="lg:col-span-1">
          <div className="space-y-6">
            {/* Category */}
            <Collapsible defaultOpen>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-0 text-left">
                <h3 className="text-lg font-semibold text-gray-800">Category</h3>
                <ChevronUp className="w-4 h-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4 space-y-3">
                <div className="text-sm text-gray-700 hover:text-blue-600 cursor-pointer">Mobile accessory</div>
                <div className="text-sm text-gray-700 hover:text-blue-600 cursor-pointer">Electronics</div>
                <div className="text-sm text-gray-700 hover:text-blue-600 cursor-pointer">Smartphones</div>
                <div className="text-sm text-gray-700 hover:text-blue-600 cursor-pointer">Modern tech</div>
                <Button variant="link" className="text-blue-600 p-0 h-auto text-sm">
                  See all
                </Button>
              </CollapsibleContent>
            </Collapsible>

            {/* Brands */}
            <Collapsible defaultOpen>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-0 text-left">
                <h3 className="text-lg font-semibold text-gray-800">Brands</h3>
                <ChevronUp className="w-4 h-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4 space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="samsung" />
                  <label htmlFor="samsung" className="text-sm text-gray-700">
                    Samsung
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="apple" />
                  <label htmlFor="apple" className="text-sm text-gray-700">
                    Apple
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="huawei" />
                  <label htmlFor="huawei" className="text-sm text-gray-700">
                    Huawei
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="pocco" />
                  <label htmlFor="pocco" className="text-sm text-gray-700">
                    Pocco
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="lenovo" />
                  <label htmlFor="lenovo" className="text-sm text-gray-700">
                    Lenovo
                  </label>
                </div>
                <Button variant="link" className="text-blue-600 p-0 h-auto text-sm">
                  See all
                </Button>
              </CollapsibleContent>
            </Collapsible>

            {/* Features */}
            <Collapsible defaultOpen>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-0 text-left">
                <h3 className="text-lg font-semibold text-gray-800">Features</h3>
                <ChevronUp className="w-4 h-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4 space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="metallic" />
                  <label htmlFor="metallic" className="text-sm text-gray-700">
                    Metallic
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="plastic" />
                  <label htmlFor="plastic" className="text-sm text-gray-700">
                    Plastic cover
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="8gb" />
                  <label htmlFor="8gb" className="text-sm text-gray-700">
                    8GB Ram
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="superpower" />
                  <label htmlFor="superpower" className="text-sm text-gray-700">
                    Super power
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="largememory" />
                  <label htmlFor="largememory" className="text-sm text-gray-700">
                    Large Memory
                  </label>
                </div>
                <Button variant="link" className="text-blue-600 p-0 h-auto text-sm">
                  See all
                </Button>
              </CollapsibleContent>
            </Collapsible>

            {/* Price Range */}
            <Collapsible defaultOpen>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-0 text-left">
                <h3 className="text-lg font-semibold text-gray-800">Price range</h3>
                <ChevronUp className="w-4 h-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4">
                <div className="space-y-4">
                  <div className="relative">
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-blue-500 rounded-full" style={{ width: "30%" }}></div>
                    </div>
                    <div className="absolute left-0 top-0 w-4 h-4 bg-blue-500 rounded-full -mt-1"></div>
                    <div className="absolute right-0 top-0 w-4 h-4 bg-gray-300 rounded-full -mt-1"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600">Min</label>
                      <Input placeholder="0" className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Max</label>
                      <Input placeholder="999999" className="mt-1" />
                    </div>
                  </div>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600">Apply</Button>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Condition */}
            <Collapsible defaultOpen>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-0 text-left">
                <h3 className="text-lg font-semibold text-gray-800">Condition</h3>
                <ChevronUp className="w-4 h-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4 space-y-3">
                <div className="flex items-center space-x-2">
                  <input type="radio" id="any" name="condition" defaultChecked className="text-blue-600" />
                  <label htmlFor="any" className="text-sm text-gray-700">
                    Any
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="radio" id="refurbished" name="condition" />
                  <label htmlFor="refurbished" className="text-sm text-gray-700">
                    Refurbished
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="radio" id="brandnew" name="condition" />
                  <label htmlFor="brandnew" className="text-sm text-gray-700">
                    Brand new
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="radio" id="olditems" name="condition" />
                  <label htmlFor="olditems" className="text-sm text-gray-700">
                    Old items
                  </label>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Ratings */}
            <Collapsible defaultOpen>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-0 text-left">
                <h3 className="text-lg font-semibold text-gray-800">Ratings</h3>
                <ChevronUp className="w-4 h-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4 space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="5star" />
                  <div className="flex text-orange-400">
                    {"★★★★★".split("").map((star, i) => (
                      <span key={i}>{star}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="4star" />
                  <div className="flex text-orange-400">
                    {"★★★★☆".split("").map((star, i) => (
                      <span key={i}>{star}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="3star" />
                  <div className="flex text-orange-400">
                    {"★★★☆☆".split("").map((star, i) => (
                      <span key={i}>{star}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="2star" />
                  <div className="flex text-orange-400">
                    {"★★☆☆☆".split("").map((star, i) => (
                      <span key={i}>{star}</span>
                    ))}
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                12,911 items in <strong>Mobile accessory</strong>
              </span>
              <div className="flex items-center space-x-2">
                <Checkbox id="verified" defaultChecked />
                <label htmlFor="verified" className="text-sm text-gray-700">
                  Verified only
                </label>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Select defaultValue="featured">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex border rounded">
                <Button variant="ghost" size="sm" className="p-2">
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="p-2">
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-8">
            <Select defaultValue="10">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">Show 10</SelectItem>
                <SelectItem value="20">Show 20</SelectItem>
                <SelectItem value="50">Show 50</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="bg-blue-500 text-white">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

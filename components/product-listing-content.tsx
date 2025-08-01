"use client"

import { useState, useEffect } from "react"
import { ChevronRight, ChevronLeft, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import ProductCardWithCart from "@/components/product-card-with-cart"
import { productAPI } from "@/lib/api"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProductListingContent() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState([])
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    search: "",
    sort: "createdAt",
    order: "desc",
    page: 1,
    limit: 12,
  })
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
  })

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [filters])

  const fetchProducts = async () => {
    try {
      setLoading(true)

      // Prepare params for API call
      const params: any = {
        page: filters.page,
        limit: filters.limit,
        sort: filters.sort,
        order: filters.order,
      }

      // Only add filters if they have values
      if (filters.category) params.category = filters.category
      if (filters.search) params.search = filters.search
      if (filters.minPrice) params.minPrice = Number(filters.minPrice)
      if (filters.maxPrice) params.maxPrice = Number(filters.maxPrice)

      const response = await productAPI.getProducts(params)

      if (response.success) {
        setProducts(response.data)
        setPagination(
          response.pagination || {
            currentPage: 1,
            totalPages: 1,
            totalProducts: response.data.length,
          },
        )
      }
    } catch (error) {
      console.error("Error fetching products:", error)
      setProducts([])
      setPagination({
        currentPage: 1,
        totalPages: 1,
        totalProducts: 0,
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await productAPI.getCategories()
      if (response.success) {
        setCategories(response.data)
      }
    } catch (error) {
      console.error("Error fetching categories:", error)
      setCategories([])
    }
  }

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1, // Reset to first page when filters change
    }))
  }

  const handlePriceFilter = () => {
    fetchProducts()
  }

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }))
  }

  if (loading && products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Skeleton className="h-96 w-full" />
          </div>
          <div className="lg:col-span-3">
            <div className="grid gap-6">
              {[...Array(6)].map((_, index) => (
                <Skeleton key={index} className="h-48 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
        <span>Home</span>
        <ChevronRight className="w-4 h-4" />
        <span>Products</span>
        {filters.category && (
          <>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-800">{filters.category}</span>
          </>
        )}
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
                <div
                  className={`text-sm cursor-pointer hover:text-blue-600 ${!filters.category ? "text-blue-600 font-medium" : "text-gray-700"}`}
                  onClick={() => handleFilterChange("category", "")}
                >
                  All Categories
                </div>
                {categories.map((category: string) => (
                  <div
                    key={category}
                    className={`text-sm cursor-pointer hover:text-blue-600 ${filters.category === category ? "text-blue-600 font-medium" : "text-gray-700"}`}
                    onClick={() => handleFilterChange("category", category)}
                  >
                    {category}
                  </div>
                ))}
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
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600">Min</label>
                      <Input
                        type="number"
                        placeholder="0"
                        className="mt-1"
                        value={filters.minPrice}
                        onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Max</label>
                      <Input
                        type="number"
                        placeholder="999999"
                        className="mt-1"
                        value={filters.maxPrice}
                        onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                      />
                    </div>
                  </div>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600" onClick={handlePriceFilter}>
                    Apply
                  </Button>
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
                {pagination.totalProducts} items found
                {filters.category && (
                  <span>
                    {" "}
                    in <strong>{filters.category}</strong>
                  </span>
                )}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Select
                value={`${filters.sort}-${filters.order}`}
                onValueChange={(value) => {
                  const [sort, order] = value.split("-")
                  handleFilterChange("sort", sort)
                  handleFilterChange("order", order)
                }}
              >
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="createdAt-desc">Newest First</SelectItem>
                  <SelectItem value="createdAt-asc">Oldest First</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="name-asc">Name: A to Z</SelectItem>
                  <SelectItem value="name-desc">Name: Z to A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="grid gap-6">
              {[...Array(6)].map((_, index) => (
                <Skeleton key={index} className="h-48 w-full" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📦</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">No products found</h2>
              <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
              <Button
                onClick={() =>
                  setFilters({
                    category: "",
                    minPrice: "",
                    maxPrice: "",
                    search: "",
                    sort: "createdAt",
                    order: "desc",
                    page: 1,
                    limit: 12,
                  })
                }
                className="bg-blue-500 hover:bg-blue-600"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid gap-6">
              {products.map((product: any) => (
                <ProductCardWithCart key={product._id} product={product} variant="list" />
              ))}
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between mt-8">
              <Select
                value={filters.limit.toString()}
                onValueChange={(value) => handleFilterChange("limit", Number(value))}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12">Show 12</SelectItem>
                  <SelectItem value="24">Show 24</SelectItem>
                  <SelectItem value="48">Show 48</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage <= 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>

                {[...Array(Math.min(5, pagination.totalPages))].map((_, index) => {
                  const pageNumber = index + 1
                  const isActive = pageNumber === pagination.currentPage

                  return (
                    <Button
                      key={pageNumber}
                      variant={isActive ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(pageNumber)}
                      className={isActive ? "bg-blue-500 text-white" : ""}
                    >
                      {pageNumber}
                    </Button>
                  )
                })}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage >= pagination.totalPages}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

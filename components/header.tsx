"use client"

import { ShoppingCart, Heart, User, MessageSquare, Menu, ChevronDown, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useCart } from "@/hooks/use-cart"

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { getItemCount } = useCart()
  const itemCount = getItemCount()

  return (
    <header className="w-full">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="p-2">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              <div className="p-6">
                {/* User Section */}
                <div className="flex items-center space-x-3 mb-6 pb-6 border-b">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-500" />
                  </div>
                  <div className="space-x-2">
                    <Button variant="link" className="p-0 h-auto text-blue-600">
                      Sign in
                    </Button>
                    <span className="text-gray-400">|</span>
                    <Button variant="link" className="p-0 h-auto text-blue-600">
                      Register
                    </Button>
                  </div>
                </div>

                {/* Navigation */}
                <div className="space-y-4">
                  <Link href="/" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600">
                    <div className="w-5 h-5 flex items-center justify-center">🏠</div>
                    <span>Home</span>
                  </Link>
                  <Link href="/categories" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600">
                    <div className="w-5 h-5 flex items-center justify-center">📋</div>
                    <span>Categories</span>
                  </Link>
                  <Link href="/favorites" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600">
                    <Heart className="w-5 h-5" />
                    <span>Favorites</span>
                  </Link>
                  <Link href="/orders" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600">
                    <div className="w-5 h-5 flex items-center justify-center">📦</div>
                    <span>My orders</span>
                  </Link>
                  <div className="flex items-center space-x-3 text-gray-700">
                    <div className="w-5 h-5 flex items-center justify-center">🌐</div>
                    <span>English | USD</span>
                  </div>
                  <Link href="/contact" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600">
                    <div className="w-5 h-5 flex items-center justify-center">🎧</div>
                    <span>Contact us</span>
                  </Link>
                  <Link href="/about" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600">
                    <div className="w-5 h-5 flex items-center justify-center">ℹ️</div>
                    <span>About</span>
                  </Link>
                </div>

                {/* Footer Links */}
                <div className="mt-8 pt-6 border-t space-y-3 text-sm text-gray-600">
                  <div>User agreement</div>
                  <div>Partnership</div>
                  <div>Privacy policy</div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
              <Image src="/logo.png" alt="Brand" width={60} height={60} />
            </div>
            <span className="text-xl font-bold text-blue-500">Brand</span>
          </Link>

          {/* Right Icons */}
          <div className="flex items-center space-x-2">
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="p-2 relative">
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </Link>
            <Button variant="ghost" size="sm" className="p-2">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input placeholder="Search" className="pl-10" />
          </div>
          <div className="flex space-x-2 mt-3 overflow-x-auto">
            <Button variant="ghost" size="sm" className="text-blue-600 whitespace-nowrap">
              All category
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600 whitespace-nowrap">
              Gadgets
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600 whitespace-nowrap">
              Clothes
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600 whitespace-nowrap">
              Accessories
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded flex items-center justify-center">
                <Image src="/logo.png" alt="Brand" width={44} height={44} />
              </div>
              <span className="text-2xl font-bold text-blue-500">Brand</span>
            </Link>

            {/* Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-2xl items-center">
              <div className="flex w-full border border-gray-300 rounded-lg overflow-hidden">
                <Input
                  placeholder="Search"
                  className="flex-1 border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 h-10"
                />
                <div className="border-l border-gray-300">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40 border-0 rounded-none focus:ring-0 h-10 bg-gray-50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All category</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="fashion">Fashion</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="bg-blue-500 hover:bg-blue-600 rounded-none h-10 px-6 border-0">Search</Button>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4 text-gray-600">
                <Button variant="ghost" size="sm" className="flex flex-col items-center p-2 h-auto">
                  <User className="w-5 h-5 mb-1" />
                  <span className="text-xs">Profile</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex flex-col items-center p-2 h-auto">
                  <MessageSquare className="w-5 h-5 mb-1" />
                  <span className="text-xs">Message</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex flex-col items-center p-2 h-auto">
                  <Heart className="w-5 h-5 mb-1" />
                  <span className="text-xs">Orders</span>
                </Button>
                <Link href="/cart">
                  <Button variant="ghost" size="sm" className="flex flex-col items-center p-2 h-auto relative">
                    <ShoppingCart className="w-5 h-5 mb-1" />
                    <span className="text-xs">My cart</span>
                    {itemCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
                        {itemCount}
                      </Badge>
                    )}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Navigation Menu */}
      <div className="hidden lg:block bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-8">
              <Button variant="ghost" size="sm" className="text-gray-700 hover:text-blue-600">
                <Menu className="w-4 h-4 mr-2" />
                All category
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-700 hover:text-blue-600">
                Hot offers
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-700 hover:text-blue-600">
                Gift boxes
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-700 hover:text-blue-600">
                Projects
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-700 hover:text-blue-600">
                Menu item
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-700 hover:text-blue-600 flex items-center">
                Help
                <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <Button variant="ghost" size="sm" className="flex items-center">
                English, USD
                <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center">
                Ship to{" "}
                <Image
                  src="/images/flags/DE.png"
                  alt="Germany"
                  width={24}
                  height={16}
                  className="mx-1"
                />
                <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

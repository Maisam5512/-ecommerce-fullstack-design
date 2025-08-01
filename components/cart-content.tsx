"use client"

import { ArrowLeft, Plus, Minus, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/hooks/use-cart"
import { useState, useEffect } from "react"

export default function CartContent() {
  const { items, removeItem, updateQuantity, clearCart, totalAmount, totalItems, isLoading, initializeCart } = useCart()

  const [couponInput, setCouponInput] = useState("")
  const [discount, setDiscount] = useState(0)
  const [savedItems, setSavedItems] = useState<string[]>([])

  // Initialize cart on component mount
  useEffect(() => {
    initializeCart()
  }, [initializeCart])

  const handleSaveForLater = (itemId: string) => {
    setSavedItems([...savedItems, itemId])
    removeItem(itemId)
  }

  const handleApplyCoupon = () => {
    if (couponInput === "SAVE60") {
      setDiscount(60)
    } else if (couponInput === "SAVE10") {
      setDiscount(10)
    } else {
      setDiscount(0)
    }
  }

  const subtotal = totalAmount
  const tax = totalAmount * 0.01
  const total = subtotal + tax - discount

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔄</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading your cart...</h2>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some items to get started</p>
          <Link href="/">
            <Button className="bg-blue-500 hover:bg-blue-600">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center space-x-4 mb-6">
        <Link href="/">
          <Button variant="ghost" size="sm" className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold text-gray-800">Shopping cart</h1>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My cart ({totalItems})</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item._id} className="bg-white rounded-lg p-4 lg:p-6">
              <div className="flex items-start space-x-4">
                {/* Product Image */}
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Image
                    src={item.product.image || "/placeholder.svg"}
                    alt={item.product.name}
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{item.product.name}</h3>
                  <div className="text-sm text-gray-500 space-y-1">
                    <div>Price: ${item.product.price.toFixed(2)}</div>
                    <div>Stock: {item.product.stock} available</div>
                  </div>

                  {/* Mobile Actions */}
                  <div className="lg:hidden flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                        className="w-8 h-8 p-0"
                        disabled={isLoading}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                        className="w-8 h-8 p-0"
                        disabled={isLoading}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="text-lg font-bold text-gray-800">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="p-2">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleSaveForLater(item.product._id)}>
                          Save for later
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => removeItem(item.product._id)} className="text-red-600">
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Desktop Actions */}
                  <div className="hidden lg:flex items-center space-x-4 mt-4">
                    <Button
                      variant="link"
                      className="text-red-500 hover:text-red-600 p-0 h-auto"
                      onClick={() => removeItem(item.product._id)}
                      disabled={isLoading}
                    >
                      Remove
                    </Button>
                    <Button
                      variant="link"
                      className="text-blue-500 hover:text-blue-600 p-0 h-auto"
                      onClick={() => handleSaveForLater(item.product._id)}
                    >
                      Save for later
                    </Button>
                  </div>
                </div>

                {/* Desktop Price and Quantity */}
                <div className="hidden lg:flex items-center space-x-6">
                  <div className="text-2xl font-bold text-gray-800">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                  <Select
                    value={item.quantity.toString()}
                    onValueChange={(value) => updateQuantity(item.product._id, Number.parseInt(value))}
                    disabled={isLoading}
                  >
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[...Array(Math.min(10, item.product.stock))].map((_, i) => (
                        <SelectItem key={i + 1} value={(i + 1).toString()}>
                          {i + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg p-6 sticky top-6">
            {/* Desktop Coupon Section */}
            <div className="hidden lg:block mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Have a coupon?</h3>
              <div className="flex space-x-2">
                <Input
                  placeholder="Add coupon"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleApplyCoupon} className="bg-blue-500 hover:bg-blue-600">
                  Apply
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount:</span>
                  <span className="font-semibold text-red-500">-${discount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-gray-600">Tax:</span>
                <span className="font-semibold text-green-600">+${tax.toFixed(2)}</span>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Mobile Summary */}
            <div className="lg:hidden mt-6 pt-6 border-t">
              <div className="flex justify-between text-sm mb-2">
                <span>Items ({totalItems}):</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping:</span>
                <span>$10.00</span>
              </div>
            </div>

            {/* Checkout Button */}
            <Button className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3" disabled={isLoading}>
              {isLoading ? "Processing..." : "Checkout"}
            </Button>

            {/* Clear Cart Button */}
            <Button variant="outline" className="w-full mt-2 bg-transparent" onClick={clearCart} disabled={isLoading}>
              Clear Cart
            </Button>

            {/* Payment Methods */}
            <div className="hidden lg:flex items-center justify-center space-x-2 mt-4">
              <Image src="/images/payment/America.png" alt="American Express" width={40} height={24} />
              <Image src="/images/payment/Master.png" alt="Mastercard" width={40} height={24} />
              <Image src="/images/payment/PayPal.png" alt="PayPal" width={40} height={24} />
              <Image src="/images/payment/visa.png" alt="Visa" width={40} height={24} />
              <Image src="/images/payment/App.png" alt="Apple Pay" width={40} height={24} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

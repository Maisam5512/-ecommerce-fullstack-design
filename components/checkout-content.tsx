"use client"

import Link from "next/link"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/hooks/use-cart"
import { orderAPI } from "@/lib/api"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function CheckoutContent() {
  const { items, getSubtotal, getTax, getTotal, clearCart, isLoading: isCartLoading } = useCart()
  const router = useRouter()
  const [isProcessingOrder, setIsProcessingOrder] = useState(false)
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  })

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setShippingAddress((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    if (items.length === 0) {
      toast.error("Your cart is empty.")
      return
    }

    // Basic validation
    const requiredFields = ["fullName", "address1", "city", "state", "zipCode", "country"]
    for (const field of requiredFields) {
      if (!shippingAddress[field as keyof typeof shippingAddress]) {
        toast.error(`Please fill in the ${field.replace(/([A-Z])/g, " $1").toLowerCase()} field.`)
        return
      }
    }

    setIsProcessingOrder(true)
    try {
      const response = await orderAPI.createOrder(shippingAddress)
      if (response.success) {
        toast.success("Order placed successfully!")
        clearCart() // Clear cart after successful order
        router.push(`/order-confirmation/${response.data._id}`) // Redirect to order confirmation
      } else {
        toast.error(response.message || "Failed to place order.")
      }
    } catch (error: any) {
      console.error("Error placing order:", error)
      toast.error(error.response?.data?.message || "Failed to place order.")
    } finally {
      setIsProcessingOrder(false)
    }
  }

  if (isCartLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Loading cart...</p>
      </div>
    )
  }

  if (items.length === 0 && !isProcessingOrder) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty.</h2>
        <p className="text-gray-600 mb-6">Add some products to proceed to checkout.</p>
        <Button asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Shipping Address Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Shipping Information</CardTitle>
            <CardDescription>Please provide your shipping details.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={shippingAddress.fullName}
                  onChange={handleAddressChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address1">Address Line 1</Label>
                <Input
                  id="address1"
                  name="address1"
                  value={shippingAddress.address1}
                  onChange={handleAddressChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address2">Address Line 2 (Optional)</Label>
                <Input id="address2" name="address2" value={shippingAddress.address2} onChange={handleAddressChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" value={shippingAddress.city} onChange={handleAddressChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State / Province</Label>
                <Input id="state" name="state" value={shippingAddress.state} onChange={handleAddressChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">Zip / Postal Code</Label>
                <Input
                  id="zipCode"
                  name="zipCode"
                  value={shippingAddress.zipCode}
                  onChange={handleAddressChange}
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  value={shippingAddress.country}
                  onChange={handleAddressChange}
                  required
                />
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.product._id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Image
                      src={item.product.image || "/placeholder.svg?height=50&width=50&query=product"}
                      alt={item.product.name}
                      width={50}
                      height={50}
                      className="rounded-md object-cover"
                    />
                    <div>
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${getSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>$0.00</span> {/* Assuming free shipping for now */}
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax (1%)</span>
                <span>${getTax().toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${getTotal().toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSubmitOrder} className="w-full" disabled={isProcessingOrder || items.length === 0}>
              {isProcessingOrder ? "Processing Order..." : "Place Order"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { ShoppingCart, Plus, Minus } from "lucide-react"
// import { useCart } from "@/hooks/use-cart"

// interface AddToCartButtonProps {
//   productId: string
//   stock: number
//   className?: string
//   variant?: "default" | "outline" | "ghost"
//   size?: "sm" | "default" | "lg"
// }

// export default function AddToCartButton({
//   productId,
//   stock,
//   className,
//   variant = "default",
//   size = "default",
// }: AddToCartButtonProps) {
//   const [quantity, setQuantity] = useState(1)
//   const { addItem, isLoading, items, initializeCart } = useCart()

//   // Check if item is already in cart
//   const cartItem = items.find((item) => item.product._id === productId)
//   const currentQuantity = cartItem?.quantity || 0

//   const handleAddToCart = async () => {
//     if (stock <= 0) return
//     await addItem(productId, quantity)
//     // Refresh cart to show updated data
//     await initializeCart()
//   }

//   const incrementQuantity = () => {
//     if (quantity < stock) {
//       setQuantity((prev) => prev + 1)
//     }
//   }

//   const decrementQuantity = () => {
//     if (quantity > 1) {
//       setQuantity((prev) => prev - 1)
//     }
//   }

//   if (stock <= 0) {
//     return (
//       <Button disabled className={className} variant="outline">
//         Out of Stock
//       </Button>
//     )
//   }

//   return (
//     <div className="flex items-center space-x-2">
//       {/* Quantity Selector */}
//       <div className="flex items-center border rounded-md">
//         <Button variant="ghost" size="sm" onClick={decrementQuantity} disabled={quantity <= 1} className="h-8 w-8 p-0">
//           <Minus className="w-3 h-3" />
//         </Button>
//         <span className="px-3 py-1 text-sm font-medium min-w-[40px] text-center">{quantity}</span>
//         <Button
//           variant="ghost"
//           size="sm"
//           onClick={incrementQuantity}
//           disabled={quantity >= stock}
//           className="h-8 w-8 p-0"
//         >
//           <Plus className="w-3 h-3" />
//         </Button>
//       </div>

//       {/* Add to Cart Button */}
//       <Button
//         onClick={handleAddToCart}
//         disabled={isLoading || stock <= 0}
//         variant={variant}
//         size={size}
//         className={className}
//       >
//         <ShoppingCart className="w-4 h-4 mr-2" />
//         {isLoading ? "Adding..." : "Add to Cart"}
//       </Button>

//       {currentQuantity > 0 && <span className="text-sm text-green-600 font-medium">{currentQuantity} in cart</span>}
//     </div>
//   )
// }






"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Plus, Minus } from "lucide-react"
import { useCart } from "@/hooks/use-cart"

interface AddToCartButtonProps {
  productId: string
  stock: number
  className?: string
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "default" | "lg"
  quantity?: number // allows controlled quantity from parent if needed
}

export default function AddToCartButton({
  productId,
  stock,
  className = "",
  variant = "default",
  size = "default",
  quantity: initialQuantity,
}: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(initialQuantity || 1)
  const { addItem, isLoading, items, initializeCart } = useCart()

  const cartItem = items.find((item) => item.product._id === productId)
  const currentQuantity = cartItem?.quantity || 0

  const handleAddToCart = async () => {
    if (stock <= 0) return
    await addItem(productId, quantity)
    await initializeCart()
  }

  const incrementQuantity = () => {
    if (quantity < stock) {
      setQuantity((prev) => prev + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  if (stock <= 0) {
    return (
      <Button disabled className={className} variant="outline" size={size}>
        Out of Stock
      </Button>
    )
  }

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {/* Quantity Selector (centered horizontally) */}
      <div className="flex justify-center">
        <div className="flex items-center border rounded-md overflow-hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={decrementQuantity}
            disabled={quantity <= 1}
            className="h-8 w-8 p-0"
          >
            <Minus className="w-3 h-3" />
          </Button>
          <span className="px-4 py-1 text-sm font-medium min-w-[40px] text-center">
            {quantity}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={incrementQuantity}
            disabled={quantity >= stock}
            className="h-8 w-8 p-0"
          >
            <Plus className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <Button
        onClick={handleAddToCart}
        disabled={isLoading || stock <= 0}
        variant={variant}
        size={size}
        className="w-full cursor-pointer"
      >
        <ShoppingCart className="w-4 h-4 mr-2 cursor-pointer" />
        {isLoading ? "Adding..." : "Add to Cart"}
      </Button>

      {/* In-cart Info */}
      {currentQuantity > 0 && (
        <p className="text-center text-sm text-green-600 font-medium">
          {currentQuantity} in cart
        </p>
      )}
    </div>
  )
}


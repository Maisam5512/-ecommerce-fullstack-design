"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { cartAPI } from "@/lib/api"
import { v4 as uuidv4 } from "uuid"
import toast from "react-hot-toast"

export interface CartItem {
  _id: string
  product: {
    _id: string
    name: string
    price: number
    image: string
    stock: number
  }
  quantity: number
  price: number
}

interface CartStore {
  sessionId: string
  items: CartItem[]
  totalAmount: number
  totalItems: number
  isLoading: boolean

  // Actions
  initializeCart: () => Promise<void>
  addItem: (productId: string, quantity?: number) => Promise<void>
  removeItem: (productId: string) => Promise<void>
  updateQuantity: (productId: string, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  getItemCount: () => number
  getSubtotal: () => number
  getTax: () => number
  getTotal: () => number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      sessionId: "",
      items: [],
      totalAmount: 0,
      totalItems: 0,
      isLoading: false,

      initializeCart: async () => {
        try {
          let { sessionId } = get()

          // Generate session ID if not exists
          if (!sessionId) {
            sessionId = uuidv4()
            set({ sessionId })
          }

          set({ isLoading: true })
          const response = await cartAPI.getCart(sessionId)

          if (response.success) {
            set({
              items: response.data.items || [],
              totalAmount: response.data.totalAmount || 0,
              totalItems: response.data.totalItems || 0,
            })
          }
        } catch (error) {
          console.error("Error initializing cart:", error)
          toast.error("Failed to load cart")
        } finally {
          set({ isLoading: false })
        }
      },

      addItem: async (productId: string, quantity = 1) => {
        try {
          const { sessionId } = get()
          set({ isLoading: true })

          const response = await cartAPI.addToCart(sessionId, productId, quantity)

          if (response.success) {
            set({
              items: response.data.items,
              totalAmount: response.data.totalAmount,
              totalItems: response.data.totalItems,
            })
            toast.success("Item added to cart")
          }
        } catch (error: any) {
          console.error("Error adding to cart:", error)
          toast.error(error.response?.data?.message || "Failed to add item to cart")
        } finally {
          set({ isLoading: false })
        }
      },

      removeItem: async (productId: string) => {
        try {
          const { sessionId } = get()
          set({ isLoading: true })

          const response = await cartAPI.removeFromCart(sessionId, productId)

          if (response.success) {
            set({
              items: response.data.items,
              totalAmount: response.data.totalAmount,
              totalItems: response.data.totalItems,
            })
            toast.success("Item removed from cart")
          }
        } catch (error: any) {
          console.error("Error removing from cart:", error)
          toast.error(error.response?.data?.message || "Failed to remove item")
        } finally {
          set({ isLoading: false })
        }
      },

      updateQuantity: async (productId: string, quantity: number) => {
        try {
          const { sessionId } = get()
          set({ isLoading: true })

          const response = await cartAPI.updateCartItem(sessionId, productId, quantity)

          if (response.success) {
            set({
              items: response.data.items,
              totalAmount: response.data.totalAmount,
              totalItems: response.data.totalItems,
            })
          }
        } catch (error: any) {
          console.error("Error updating cart:", error)
          toast.error(error.response?.data?.message || "Failed to update quantity")
        } finally {
          set({ isLoading: false })
        }
      },

      clearCart: async () => {
        try {
          const { sessionId } = get()
          set({ isLoading: true })

          const response = await cartAPI.clearCart(sessionId)

          if (response.success) {
            set({
              items: [],
              totalAmount: 0,
              totalItems: 0,
            })
            toast.success("Cart cleared")
          }
        } catch (error: any) {
          console.error("Error clearing cart:", error)
          toast.error(error.response?.data?.message || "Failed to clear cart")
        } finally {
          set({ isLoading: false })
        }
      },

      getItemCount: () => {
        return get().totalItems
      },

      getSubtotal: () => {
        return get().totalAmount
      },

      getTax: () => {
        return get().totalAmount * 0.01 // 1% tax
      },

      getTotal: () => {
        const subtotal = get().getSubtotal()
        const tax = get().getTax()
        return subtotal + tax
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({
        sessionId: state.sessionId,
        items: state.items,
        totalAmount: state.totalAmount,
        totalItems: state.totalItems,
      }),
    },
  ),
)

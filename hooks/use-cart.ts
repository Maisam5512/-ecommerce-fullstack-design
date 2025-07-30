"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  size: string
  color: string
  material: string
  seller: string
  image: string
}

interface CartStore {
  items: CartItem[]
  couponCode: string
  discount: number
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  applyCoupon: (code: string) => void
  clearCart: () => void
  getSubtotal: () => number
  getTax: () => number
  getTotal: () => number
  getItemCount: () => number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      couponCode: "",
      discount: 0,

      addItem: (item) => {
        const items = get().items
        const existingItem = items.find((i) => i.id === item.id)

        if (existingItem) {
          set({
            items: items.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + (item.quantity || 1) } : i)),
          })
        } else {
          set({
            items: [...items, { ...item, quantity: item.quantity || 1 }],
          })
        }
      },

      removeItem: (id) => {
        set({
          items: get().items.filter((item) => item.id !== id),
        })
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }

        set({
          items: get().items.map((item) => (item.id === id ? { ...item, quantity } : item)),
        })
      },

      applyCoupon: (code) => {
        let discount = 0
        if (code === "SAVE60") {
          discount = 60
        } else if (code === "SAVE10") {
          discount = 10
        }

        set({ couponCode: code, discount })
      },

      clearCart: () => {
        set({ items: [], couponCode: "", discount: 0 })
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
      },

      getTax: () => {
        return get().getSubtotal() * 0.01 // 1% tax
      },

      getTotal: () => {
        const subtotal = get().getSubtotal()
        const tax = get().getTax()
        const discount = get().discount
        return subtotal + tax - discount
      },

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
    }),
    {
      name: "cart-storage",
    },
  ),
)

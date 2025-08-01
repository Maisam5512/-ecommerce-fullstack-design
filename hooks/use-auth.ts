"use client"

import React from "react"
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { authAPI } from "@/lib/api"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

interface User {
  _id: string
  name: string
  email: string
  role: string
}

interface AuthStore {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  setUser: (user: User, token: string) => void
}

// Define a no-op storage for server-side rendering
const noopStorage = {
  getItem: (_name: string) => null,
  setItem: (_name: string, _value: string) => {},
  removeItem: (_name: string) => {},
}

export const useAuth = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      setUser: (user, token) => {
        set({ user, token, isAuthenticated: true })
      },

      login: async (email, password) => {
        set({ isLoading: true })
        try {
          const response = await authAPI.login({ email, password })
          if (response.success) {
            const { user, token } = response.data
            set({ user, token, isAuthenticated: true })
            // Manually store user in localStorage for AuthInitializer
            localStorage.setItem("user", JSON.stringify(user))
            toast.success("Logged in successfully!")
            return true
          }
          toast.error(response.message || "Login failed")
          return false
        } catch (error: any) {
          console.error("Login error:", error)
          toast.error(error.response?.data?.message || "Login failed")
          return false
        } finally {
          set({ isLoading: false })
        }
      },

      register: async (name, email, password) => {
        set({ isLoading: true })
        try {
          const response = await authAPI.register({ name, email, password })
          if (response.success) {
            const { user, token } = response.data
            set({ user, token, isAuthenticated: true })
            // Manually store user in localStorage for AuthInitializer
            localStorage.setItem("user", JSON.stringify(user))
            toast.success("Registration successful! You are now logged in.")
            return true
          }
          toast.error(response.message || "Registration failed")
          return false
        } catch (error: any) {
          console.error("Registration error:", error)
          toast.error(error.response?.data?.message || "Registration failed")
          return false
        } finally {
          set({ isLoading: false })
        }
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false })
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logged out successfully!")
      },
    }),
    {
      name: "auth-storage",
      // Conditionally use localStorage only in the browser
      getStorage: () => (typeof window !== "undefined" ? localStorage : noopStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)

// This component will be used to initialize the auth state on client side
export function AuthInitializer() {
  const initialize = useAuth((state) => state.setUser)
  const router = useRouter()

  React.useEffect(() => {
    const token = localStorage.getItem("token")
    const user = localStorage.getItem("user")
    if (token && user) {
      try {
        initialize(JSON.parse(user), token)
      } catch (e) {
        console.error("Failed to parse user from localStorage", e)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        router.push("/login") // Redirect to login if stored data is corrupt
      }
    }
  }, [initialize, router])

  return null
}










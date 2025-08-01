import axios from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

// Product API functions
export const productAPI = {
  // Get all products with filters
  getProducts: async (params?: {
    page?: number
    limit?: number
    category?: string
    search?: string
    minPrice?: number
    maxPrice?: number
    sort?: string
    order?: string
    featured?: boolean
    onSale?: boolean
  }) => {
    const response = await api.get("/products", { params })
    return response.data
  },

  // Get featured products
  getFeaturedProducts: async () => {
    const response = await api.get("/products/featured")
    return response.data
  },

  // Get single product
  getProduct: async (id: string) => {
    const response = await api.get(`/products/${id}`)
    return response.data
  },

  // Get product categories
  getCategories: async () => {
    const response = await api.get("/products/categories")
    return response.data
  },

  // Search products
  searchProducts: async (query: string) => {
    const response = await api.get("/products", {
      params: { search: query, limit: 20 },
    })
    return response.data
  },
}

// Cart API functions
export const cartAPI = {
  // Get cart
  getCart: async (sessionId: string) => {
    const response = await api.get(`/cart/${sessionId}`)
    return response.data
  },

  // Add item to cart
  addToCart: async (sessionId: string, productId: string, quantity = 1) => {
    const response = await api.post(`/cart/${sessionId}/add`, {
      productId,
      quantity,
    })
    return response.data
  },

  // Update cart item
  updateCartItem: async (sessionId: string, productId: string, quantity: number) => {
    const response = await api.put(`/cart/${sessionId}/update`, {
      productId,
      quantity,
    })
    return response.data
  },

  // Remove item from cart
  removeFromCart: async (sessionId: string, productId: string) => {
    const response = await api.delete(`/cart/${sessionId}/remove/${productId}`)
    return response.data
  },

  // Clear cart
  clearCart: async (sessionId: string) => {
    const response = await api.delete(`/cart/${sessionId}/clear`)
    return response.data
  },
}

// Auth API functions
export const authAPI = {
  // Register user
  register: async (userData: { name: string; email: string; password: string }) => {
    const response = await api.post("/auth/register", userData)
    return response.data
  },

  // Login user
  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post("/auth/login", credentials)
    return response.data
  },
}

export default api







const mongoose = require("mongoose")
const Product = require("../models/Product")
require("dotenv").config()

const sampleProducts = [
  {
    name: "Canon Camera EOS 2000, Black 10x zoom",
    description:
      "Professional DSLR camera with advanced features for photography enthusiasts. High-quality images with 10x optical zoom.",
    price: 998.0,
    originalPrice: 1128.0,
    image: "/images/tech/1.jpg",
    images: ["/images/tech/1.jpg", "/images/tech/2.jpg"],
    category: "Electronics",
    subcategory: "Cameras",
    stock: 25,
    rating: 4.5,
    reviews: 154,
    orders: 89,
    brand: "Canon",
    specifications: {
      size: "Medium",
      color: "Black",
      material: "Plastic/Metal",
      weight: "650g",
      dimensions: "15x10x8 cm",
    },
    seller: {
      name: "Tech Store LLC",
      location: "New York, USA",
      verified: true,
    },
    featured: true,
    onSale: true,
    discount: 12,
    tags: ["camera", "photography", "dslr", "canon"],
  },
  {
    name: "Smart Watch Series 7",
    description:
      "Advanced smartwatch with health monitoring, GPS, and long battery life. Perfect for fitness tracking and daily use.",
    price: 299.99,
    image: "/images/tech/8.jpg",
    images: ["/images/tech/8.jpg"],
    category: "Electronics",
    subcategory: "Wearables",
    stock: 50,
    rating: 4.7,
    reviews: 203,
    orders: 156,
    brand: "TechWatch",
    specifications: {
      size: "42mm",
      color: "Silver",
      material: "Aluminum",
      weight: "45g",
      dimensions: "4.2x3.6x1.1 cm",
    },
    seller: {
      name: "Gadget World",
      location: "California, USA",
      verified: true,
    },
    featured: true,
    onSale: false,
    discount: 0,
    tags: ["smartwatch", "fitness", "health", "wearable"],
  },
  {
    name: "Wireless Gaming Headphones",
    description: "High-quality wireless headphones designed for gaming with surround sound and noise cancellation.",
    price: 149.99,
    image: "/images/tech/9.jpg",
    images: ["/images/tech/9.jpg"],
    category: "Electronics",
    subcategory: "Audio",
    stock: 75,
    rating: 4.3,
    reviews: 89,
    orders: 67,
    brand: "GameSound",
    specifications: {
      size: "One Size",
      color: "Black/Red",
      material: "Plastic/Foam",
      weight: "320g",
      dimensions: "20x18x8 cm",
    },
    seller: {
      name: "Gaming Hub",
      location: "Texas, USA",
      verified: true,
    },
    featured: false,
    onSale: true,
    discount: 25,
    tags: ["headphones", "gaming", "wireless", "audio"],
  },
  {
    name: "Men's Cotton T-Shirt",
    description:
      "Comfortable cotton t-shirt for men, available in multiple colors. Perfect for casual wear and daily activities.",
    price: 24.99,
    image: "/images/cloth/1.jpg",
    images: ["/images/cloth/1.jpg", "/images/cloth/2.jpg"],
    category: "Clothing",
    subcategory: "Men's Wear",
    stock: 100,
    rating: 4.2,
    reviews: 45,
    orders: 234,
    brand: "ComfortWear",
    specifications: {
      size: "M, L, XL",
      color: "Blue, White, Black",
      material: "100% Cotton",
      weight: "200g",
      dimensions: "Standard Fit",
    },
    seller: {
      name: "Fashion Store",
      location: "Florida, USA",
      verified: true,
    },
    featured: false,
    onSale: false,
    discount: 0,
    tags: ["t-shirt", "men", "cotton", "casual"],
  },
  {
    name: "Gaming Laptop Pro",
    description:
      "High-performance gaming laptop with latest graphics card and fast processor. Perfect for gaming and professional work.",
    price: 1299.99,
    originalPrice: 1499.99,
    image: "/images/tech/7.jpg",
    images: ["/images/tech/7.jpg"],
    category: "Electronics",
    subcategory: "Computers",
    stock: 15,
    rating: 4.8,
    reviews: 76,
    orders: 23,
    brand: "GameTech",
    specifications: {
      size: "15.6 inch",
      color: "Black",
      material: "Aluminum",
      weight: "2.3kg",
      dimensions: "35x25x2 cm",
    },
    seller: {
      name: "Computer World",
      location: "Washington, USA",
      verified: true,
    },
    featured: true,
    onSale: true,
    discount: 13,
    tags: ["laptop", "gaming", "computer", "high-performance"],
  },
  {
    name: "Kitchen Blender Pro",
    description:
      "Professional kitchen blender with multiple speed settings and durable blades. Perfect for smoothies and food preparation.",
    price: 89.99,
    image: "/images/interior/8.jpg",
    images: ["/images/interior/8.jpg"],
    category: "Home & Garden",
    subcategory: "Kitchen Appliances",
    stock: 40,
    rating: 4.4,
    reviews: 112,
    orders: 89,
    brand: "KitchenPro",
    specifications: {
      size: "Large",
      color: "White",
      material: "Plastic/Steel",
      weight: "1.8kg",
      dimensions: "20x20x35 cm",
    },
    seller: {
      name: "Home Essentials",
      location: "Illinois, USA",
      verified: true,
    },
    featured: false,
    onSale: false,
    discount: 0,
    tags: ["blender", "kitchen", "appliance", "cooking"],
  },
  {
    name: "Comfortable Office Chair",
    description:
      "Ergonomic office chair with lumbar support and adjustable height. Perfect for long working hours and comfort.",
    price: 199.99,
    image: "/images/interior/1.jpg",
    images: ["/images/interior/1.jpg"],
    category: "Home & Garden",
    subcategory: "Furniture",
    stock: 30,
    rating: 4.6,
    reviews: 67,
    orders: 45,
    brand: "ComfortSeat",
    specifications: {
      size: "Standard",
      color: "Gray",
      material: "Fabric/Metal",
      weight: "15kg",
      dimensions: "60x60x110 cm",
    },
    seller: {
      name: "Office Furniture Co",
      location: "Ohio, USA",
      verified: true,
    },
    featured: false,
    onSale: true,
    discount: 15,
    tags: ["chair", "office", "furniture", "ergonomic"],
  },
  {
    name: "Smartphone Pro Max",
    description:
      "Latest smartphone with advanced camera system, fast processor, and long battery life. Perfect for photography and daily use.",
    price: 899.99,
    image: "/images/tech/2.jpg",
    images: ["/images/tech/2.jpg"],
    category: "Electronics",
    subcategory: "Mobile Phones",
    stock: 60,
    rating: 4.7,
    reviews: 189,
    orders: 134,
    brand: "TechPhone",
    specifications: {
      size: "6.7 inch",
      color: "Space Gray",
      material: "Glass/Aluminum",
      weight: "240g",
      dimensions: "16x8x0.8 cm",
    },
    seller: {
      name: "Mobile Store",
      location: "Nevada, USA",
      verified: true,
    },
    featured: true,
    onSale: false,
    discount: 0,
    tags: ["smartphone", "mobile", "phone", "technology"],
  },
]

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerce")
    console.log("✅ Connected to MongoDB")

    // Clear existing products
    await Product.deleteMany({})
    console.log("🗑️ Cleared existing products")

    // Insert sample products
    await Product.insertMany(sampleProducts)
    console.log(`✅ Inserted ${sampleProducts.length} sample products`)

    console.log("🎉 Database seeded successfully!")
    process.exit(0)
  } catch (error) {
    console.error("❌ Error seeding database:", error)
    process.exit(1)
  }
}

seedDatabase()

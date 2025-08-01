const mongoose = require("mongoose")
const User = require("../models/User")
require("dotenv").config()

const demoUsers = [
  {
    name: "Admin User",
    email: "admin@demo.com",
    password: "admin123",
    role: "admin",
  },
  {
    name: "Demo User",
    email: "user@demo.com",
    password: "user123",
    role: "user",
  },
]

async function seedUsers() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerce")
    console.log("✅ Connected to MongoDB")

    // Clear existing users
    await User.deleteMany({})
    console.log("🗑️ Cleared existing users")

    // Insert demo users
    await User.insertMany(demoUsers)
    console.log(`✅ Inserted ${demoUsers.length} demo users`)

    console.log("🎉 Users seeded successfully!")
    console.log("Demo accounts:")
    console.log("Admin: admin@demo.com / admin123")
    console.log("User: user@demo.com / user123")

    process.exit(0)
  } catch (error) {
    console.error("❌ Error seeding users:", error)
    process.exit(1)
  }
}

seedUsers()

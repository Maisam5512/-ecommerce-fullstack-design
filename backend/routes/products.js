const express = require("express")
const router = express.Router()
const Product = require("../models/Product")
const { validateProduct, validateProductUpdate } = require("../middleware/validation")

// GET /api/products - Get all products with filtering, sorting, and pagination
router.get("/", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      minPrice,
      maxPrice,
      search,
      sort = "createdAt",
      order = "desc",
      featured,
      onSale,
    } = req.query

    // Build filter object
    const filter = { isActive: true }

    if (category) filter.category = category
    if (featured !== undefined) filter.featured = featured === "true"
    if (onSale !== undefined) filter.onSale = onSale === "true"

    if (minPrice || maxPrice) {
      filter.price = {}
      if (minPrice) filter.price.$gte = Number(minPrice)
      if (maxPrice) filter.price.$lte = Number(maxPrice)
    }

    if (search) {
      filter.$text = { $search: search }
    }

    // Build sort object
    const sortObj = {}
    sortObj[sort] = order === "desc" ? -1 : 1

    // Execute query with pagination
    const skip = (page - 1) * limit
    const products = await Product.find(filter).sort(sortObj).skip(skip).limit(Number(limit)).lean()

    const total = await Product.countDocuments(filter)
    const totalPages = Math.ceil(total / limit)

    res.json({
      success: true,
      data: products,
      pagination: {
        currentPage: Number(page),
        totalPages,
        totalProducts: total,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    })
  } catch (error) {
    console.error("Error fetching products:", error)
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message,
    })
  }
})

// GET /api/products/featured - Get featured products
router.get("/featured", async (req, res) => {
  try {
    const products = await Product.find({
      featured: true,
      isActive: true,
    })
      .limit(10)
      .sort({ createdAt: -1 })
      .lean()

    res.json({
      success: true,
      data: products,
    })
  } catch (error) {
    console.error("Error fetching featured products:", error)
    res.status(500).json({
      success: false,
      message: "Error fetching featured products",
      error: error.message,
    })
  }
})

// GET /api/products/categories - Get unique categories
router.get("/categories", async (req, res) => {
  try {
    const categories = await Product.distinct("category", { isActive: true })
    res.json({
      success: true,
      data: categories,
    })
  } catch (error) {
    console.error("Error fetching categories:", error)
    res.status(500).json({
      success: false,
      message: "Error fetching categories",
      error: error.message,
    })
  }
})

// GET /api/products/:id - Get single product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean()

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      })
    }

    res.json({
      success: true,
      data: product,
    })
  } catch (error) {
    console.error("Error fetching product:", error)
    res.status(500).json({
      success: false,
      message: "Error fetching product",
      error: error.message,
    })
  }
})

// POST /api/products - Create new product (Admin only)
router.post("/", validateProduct, async (req, res) => {
  try {
    const product = new Product(req.body)
    await product.save()

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    })
  } catch (error) {
    console.error("Error creating product:", error)
    res.status(400).json({
      success: false,
      message: "Error creating product",
      error: error.message,
    })
  }
})

// PUT /api/products/:id - Update product (Admin only)
router.put("/:id", validateProductUpdate, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      })
    }

    res.json({
      success: true,
      message: "Product updated successfully",
      data: product,
    })
  } catch (error) {
    console.error("Error updating product:", error)
    res.status(400).json({
      success: false,
      message: "Error updating product",
      error: error.message,
    })
  }
})

// DELETE /api/products/:id - Delete product (Admin only)
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true })

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      })
    }

    res.json({
      success: true,
      message: "Product deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting product:", error)
    res.status(500).json({
      success: false,
      message: "Error deleting product",
      error: error.message,
    })
  }
})

module.exports = router

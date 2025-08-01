const express = require("express")
const router = express.Router()
const Category = require("../models/Category")

// GET /api/categories - Get all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).populate("subcategories").sort({ name: 1 }).lean()

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

// GET /api/categories/:id - Get single category
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate("subcategories").lean()

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      })
    }

    res.json({
      success: true,
      data: category,
    })
  } catch (error) {
    console.error("Error fetching category:", error)
    res.status(500).json({
      success: false,
      message: "Error fetching category",
      error: error.message,
    })
  }
})

module.exports = router

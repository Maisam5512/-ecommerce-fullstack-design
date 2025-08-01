const express = require("express")
const router = express.Router()
const Cart = require("../models/Cart")
const Product = require("../models/Product")

// GET /api/cart/:sessionId - Get cart by session ID
router.get("/:sessionId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ sessionId: req.params.sessionId })
      .populate("items.product", "name price image stock")
      .lean()

    if (!cart) {
      return res.json({
        success: true,
        data: {
          items: [],
          totalAmount: 0,
          totalItems: 0,
        },
      })
    }

    res.json({
      success: true,
      data: cart,
    })
  } catch (error) {
    console.error("Error fetching cart:", error)
    res.status(500).json({
      success: false,
      message: "Error fetching cart",
      error: error.message,
    })
  }
})

// POST /api/cart/:sessionId/add - Add item to cart
router.post("/:sessionId/add", async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body
    const sessionId = req.params.sessionId

    // Validate product exists and has stock
    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      })
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient stock",
      })
    }

    // Find or create cart
    let cart = await Cart.findOne({ sessionId })
    if (!cart) {
      cart = new Cart({ sessionId, items: [] })
    }

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex((item) => item.product.toString() === productId)

    if (existingItemIndex > -1) {
      // Update quantity
      cart.items[existingItemIndex].quantity += quantity
    } else {
      // Add new item
      cart.items.push({
        product: productId,
        quantity,
        price: product.price,
      })
    }

    await cart.save()

    // Populate and return updated cart
    await cart.populate("items.product", "name price image stock")

    res.json({
      success: true,
      message: "Item added to cart",
      data: cart,
    })
  } catch (error) {
    console.error("Error adding to cart:", error)
    res.status(500).json({
      success: false,
      message: "Error adding to cart",
      error: error.message,
    })
  }
})

// PUT /api/cart/:sessionId/update - Update item quantity
router.put("/:sessionId/update", async (req, res) => {
  try {
    const { productId, quantity } = req.body
    const sessionId = req.params.sessionId

    const cart = await Cart.findOne({ sessionId })
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      })
    }

    const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId)

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      })
    }

    if (quantity <= 0) {
      // Remove item
      cart.items.splice(itemIndex, 1)
    } else {
      // Update quantity
      cart.items[itemIndex].quantity = quantity
    }

    await cart.save()
    await cart.populate("items.product", "name price image stock")

    res.json({
      success: true,
      message: "Cart updated",
      data: cart,
    })
  } catch (error) {
    console.error("Error updating cart:", error)
    res.status(500).json({
      success: false,
      message: "Error updating cart",
      error: error.message,
    })
  }
})

// DELETE /api/cart/:sessionId/remove/:productId - Remove item from cart
router.delete("/:sessionId/remove/:productId", async (req, res) => {
  try {
    const { sessionId, productId } = req.params

    const cart = await Cart.findOne({ sessionId })
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      })
    }

    cart.items = cart.items.filter((item) => item.product.toString() !== productId)

    await cart.save()
    await cart.populate("items.product", "name price image stock")

    res.json({
      success: true,
      message: "Item removed from cart",
      data: cart,
    })
  } catch (error) {
    console.error("Error removing from cart:", error)
    res.status(500).json({
      success: false,
      message: "Error removing from cart",
      error: error.message,
    })
  }
})

// DELETE /api/cart/:sessionId/clear - Clear cart
router.delete("/:sessionId/clear", async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { sessionId: req.params.sessionId },
      { items: [], totalAmount: 0, totalItems: 0 },
      { new: true },
    )

    res.json({
      success: true,
      message: "Cart cleared",
      data: cart || { items: [], totalAmount: 0, totalItems: 0 },
    })
  } catch (error) {
    console.error("Error clearing cart:", error)
    res.status(500).json({
      success: false,
      message: "Error clearing cart",
      error: error.message,
    })
  }
})

module.exports = router

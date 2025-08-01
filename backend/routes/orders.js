const express = require("express")
const router = express.Router()
const Order = require("../models/Order")
const Cart = require("../models/Cart")
const Product = require("../models/Product")
const { protect } = require("../middleware/auth")

// All order routes now require authentication
router.use(protect)

// POST /api/orders - Create a new order from the user's cart
router.post("/", async (req, res) => {
  try {
    const userId = req.user.id
    const { shippingAddress } = req.body

    // Find the user's cart
    const cart = await Cart.findOne({ userId }).populate("items.product")

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" })
    }

    // Calculate total amount and check stock
    let totalAmount = 0
    const orderItems = []

    for (const item of cart.items) {
      const product = await Product.findById(item.product._id)
      if (!product) {
        return res.status(404).json({ success: false, message: `Product not found: ${item.product.name}` })
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ success: false, message: `Insufficient stock for ${product.name}` })
      }

      orderItems.push({
        product: item.product._id,
        name: product.name,
        image: product.image,
        price: item.price,
        quantity: item.quantity,
      })
      totalAmount += item.price * item.quantity
    }

    // Create the order
    const order = new Order({
      userId,
      items: orderItems,
      shippingAddress,
      totalAmount,
      status: "Pending", // Initial status
    })

    await order.save()

    // Decrease product stock
    for (const item of cart.items) {
      await Product.findByIdAndUpdate(item.product._id, { $inc: { stock: -item.quantity } })
    }

    // Clear the user's cart after order creation
    await Cart.findOneAndUpdate({ userId }, { items: [], totalAmount: 0, totalItems: 0 })

    res.status(201).json({ success: true, message: "Order placed successfully", data: order })
  } catch (error) {
    console.error("Error creating order:", error)
    res.status(500).json({ success: false, message: "Error placing order", error: error.message })
  }
})

// GET /api/orders - Get all orders for the authenticated user
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .populate("items.product", "name image")
      .sort({ createdAt: -1 })
    res.json({ success: true, data: orders })
  } catch (error) {
    console.error("Error fetching orders:", error)
    res.status(500).json({ success: false, message: "Error fetching orders", error: error.message })
  }
})

// GET /api/orders/:id - Get a single order by ID for the authenticated user
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, userId: req.user.id }).populate(
      "items.product",
      "name image",
    )

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" })
    }

    res.json({ success: true, data: order })
  } catch (error) {
    console.error("Error fetching order:", error)
    res.status(500).json({ success: false, message: "Error fetching order", error: error.message })
  }
})

module.exports = router

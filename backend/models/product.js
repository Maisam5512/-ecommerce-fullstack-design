const mongoose = require("mongoose")

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [200, "Product name cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },
    originalPrice: {
      type: Number,
      min: [0, "Original price cannot be negative"],
    },
    image: {
      type: String,
      required: [true, "Product image is required"],
    },
    images: [
      {
        type: String,
      },
    ],
    category: {
      type: String,
      required: [true, "Product category is required"],
      enum: [
        "Electronics",
        "Clothing",
        "Home & Garden",
        "Sports",
        "Books",
        "Toys",
        "Beauty",
        "Automotive",
        "Health",
        "Food",
      ],
    },
    subcategory: {
      type: String,
      trim: true,
    },
    stock: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
    rating: {
      type: Number,
      min: [0, "Rating cannot be less than 0"],
      max: [5, "Rating cannot be more than 5"],
      default: 0,
    },
    reviews: {
      type: Number,
      min: [0, "Reviews count cannot be negative"],
      default: 0,
    },
    orders: {
      type: Number,
      min: [0, "Orders count cannot be negative"],
      default: 0,
    },
    brand: {
      type: String,
      trim: true,
    },
    specifications: {
      size: String,
      color: String,
      material: String,
      weight: String,
      dimensions: String,
    },
    seller: {
      name: {
        type: String,
        default: "Default Seller",
      },
      location: {
        type: String,
        default: "Unknown",
      },
      verified: {
        type: Boolean,
        default: false,
      },
    },
    featured: {
      type: Boolean,
      default: false,
    },
    onSale: {
      type: Boolean,
      default: false,
    },
    discount: {
      type: Number,
      min: [0, "Discount cannot be negative"],
      max: [100, "Discount cannot exceed 100%"],
      default: 0,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// Virtual for discounted price
productSchema.virtual("discountedPrice").get(function () {
  if (this.discount > 0) {
    return this.price * (1 - this.discount / 100)
  }
  return this.price
})

// Index for search functionality
productSchema.index({
  name: "text",
  description: "text",
  category: "text",
  brand: "text",
})

// Index for filtering
productSchema.index({ category: 1, price: 1 })
productSchema.index({ featured: 1 })
productSchema.index({ onSale: 1 })

module.exports = mongoose.model("Product", productSchema)

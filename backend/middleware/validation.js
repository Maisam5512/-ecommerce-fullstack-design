const Joi = require("joi")

// Product validation schemas
const productSchema = Joi.object({
  name: Joi.string().required().max(200),
  description: Joi.string().required().max(2000),
  price: Joi.number().required().min(0),
  originalPrice: Joi.number().min(0),
  image: Joi.string().required(),
  images: Joi.array().items(Joi.string()),
  category: Joi.string()
    .required()
    .valid(
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
    ),
  subcategory: Joi.string(),
  stock: Joi.number().required().min(0),
  rating: Joi.number().min(0).max(5),
  reviews: Joi.number().min(0),
  orders: Joi.number().min(0),
  brand: Joi.string(),
  specifications: Joi.object({
    size: Joi.string(),
    color: Joi.string(),
    material: Joi.string(),
    weight: Joi.string(),
    dimensions: Joi.string(),
  }),
  seller: Joi.object({
    name: Joi.string(),
    location: Joi.string(),
    verified: Joi.boolean(),
  }),
  featured: Joi.boolean(),
  onSale: Joi.boolean(),
  discount: Joi.number().min(0).max(100),
  tags: Joi.array().items(Joi.string()),
  isActive: Joi.boolean(),
})

const productUpdateSchema = productSchema.fork(
  ["name", "description", "price", "image", "category", "stock"],
  (schema) => schema.optional(),
)

// User validation schemas
const registerSchema = Joi.object({
  name: Joi.string().required().min(2).max(50),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6),
})

const loginSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
})

// Validation middleware functions
const validateProduct = (req, res, next) => {
  const { error } = productSchema.validate(req.body)
  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      error: error.details[0].message,
    })
  }
  next()
}

const validateProductUpdate = (req, res, next) => {
  const { error } = productUpdateSchema.validate(req.body)
  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      error: error.details[0].message,
    })
  }
  next()
}

const validateRegister = (req, res, next) => {
  const { error } = registerSchema.validate(req.body)
  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      error: error.details[0].message,
    })
  }
  next()
}

const validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body)
  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      error: error.details[0].message,
    })
  }
  next()
}

module.exports = {
  validateProduct,
  validateProductUpdate,
  validateRegister,
  validateLogin,
}

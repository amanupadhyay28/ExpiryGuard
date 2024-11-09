const mongoose = require("mongoose");

const productRequestSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true,
  },
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  supplierEmail: {
    type: String,
    required: true,
  },
  retailerEmail: {
    type: String,
    required: true,
  },
  expiryDate: {
    type: String,
  },
  reqType: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ProductRequest =
  mongoose.models.ProductRequest ||
  mongoose.model("ProductRequest", productRequestSchema);

module.exports = ProductRequest;

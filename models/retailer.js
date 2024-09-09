const mongoose = require("mongoose");

const retailerSchema = new mongoose.Schema({
  retailerId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  suppliers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Supplier" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

retailerSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Retailer = mongoose.model("Retailer", retailerSchema);
module.exports = Retailer;

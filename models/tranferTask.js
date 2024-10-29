const mongoose = require("mongoose");

const transferTaskSchema = new mongoose.Schema({
  taskId: String,
  sourceRetailerEmail: String,
  targetRetailerEmail: String,
  products: [
    {
      productName: String,
      quantity: Number,
    },
  ],
  driverId: String,
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("TransferTask", transferTaskSchema);

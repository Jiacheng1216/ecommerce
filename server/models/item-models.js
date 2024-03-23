const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  seller: {
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    sellerName: { type: mongoose.Schema.Types.String, ref: "User" },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Item", itemSchema);

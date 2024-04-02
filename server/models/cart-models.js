const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  itemID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
  },

  quantity: {
    type: Number,
  },

  imagePath: {
    type: String,
  },

  title: {
    type: String,
  },

  price: {
    type: Number,
  },

  total: {
    type: Number,
  },
});

cartSchema.pre("save", function (next) {
  this.total = this.quantity * this.price;
  next();
});

module.exports = mongoose.model("Cart", cartSchema);

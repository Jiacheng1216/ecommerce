const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemSchema = new Schema({
  id: { type: String },
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
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Item", itemSchema);

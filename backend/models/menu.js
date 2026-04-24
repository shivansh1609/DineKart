const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  restaurantId: String,
  name: String,
  price: Number,
  category: String,
  isVeg: Boolean,
  image: String   // 🔥 NEW
});

module.exports = mongoose.model("Menu", menuSchema);
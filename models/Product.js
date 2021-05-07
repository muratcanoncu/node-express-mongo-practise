const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  title: String,
  price: Number,
  quantity: Number,
  discount: Number,
});

const Item = mongoose.model("Item", ItemSchema);
module.exports = Item;

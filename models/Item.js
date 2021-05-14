const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  fieldname: String,
  originalname: String,
  encoding: String,
  mimetype: String,
  destination: String,
  filename: String,
  path: String,
  size: Number,
});

const Item = mongoose.model("Item", ItemSchema);
module.exports = Item;

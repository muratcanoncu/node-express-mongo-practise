const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const costumerSchema = new Schema({
  name: String,
  email: String,
  password: String,
  age: Number,
  role: String,
  profilePic: String,
});

const Costumer = mongoose.model("Costumer", costumerSchema);
module.exports = Costumer;

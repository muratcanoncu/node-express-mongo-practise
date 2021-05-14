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
const ProfileSchema = new Schema({
  name: String,
  email: { type: String, require: true },
  password: String,
  age: Number,
  profilePic: String,
  gallery: [ItemSchema],
});

const Profile = mongoose.model("Profile", ProfileSchema);
module.exports = Profile;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  name: String,
  email: { type: String, require: true },
  password: String,
  age: Number,
  profilePic: String,
  gallery: [{}],
});

const Profile = mongoose.model("Profile", ProfileSchema);
module.exports = Profile;

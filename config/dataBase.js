require("dotenv").config();
const mongoose = require("mongoose");

const dataBaseName = process.env.hiddenDataBaseName;
const dataBaseLink = process.env.hiddenDataBaseLink + dataBaseName;

const connectDataBase = async () => {
  try {
    await mongoose.connect(dataBaseLink, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connection is successful");
  } catch (error) {
    console.error("MongoDB connection is failed");
    process.exit(1);
  }
};

module.exports = connectDataBase;

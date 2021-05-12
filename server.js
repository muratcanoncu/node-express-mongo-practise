const express = require("express");
const app = express();
const multer = require("multer");
const dataBase = require("./config/dataBase");
dataBase();
const PORT = 9000;
app.use(express.static(`${__dirname}/public`));
app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: false }));
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/uploadedImage");
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage });
//! Routes
const indexRoute = require("./routes/indexRoute");
const loginRoute = require("./routes/loginRoute");

app.get("/uploadform", (req, res) => {
  res.render("fileForm");
});
// upload.array("pictures")
app.post("/uploadForm", upload.array("profilePic"), (req, res) => {
  // console.log("uploadData:", req.file);
  // console.log("uploadData:", req.files);
  const arrayOfPictures = req.files;
  console.log(arrayOfPictures);
  res.render("fileForm", { pictureArray: arrayOfPictures });
});

app.use("/", indexRoute);
app.use("/login", loginRoute);

app.listen(PORT, () => {
  console.log("Server is running on PORT::" + PORT);
});

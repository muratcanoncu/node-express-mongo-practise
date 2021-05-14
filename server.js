const express = require("express");
const app = express();

const session = require("express-session");
app.use(
  session({
    secret: "I am Admin",
    cookie: {
      maxAge: 1000 * 60 * 10,
    },
  })
);
const dataBase = require("./config/dataBase");
dataBase();
const PORT = 9000;
app.use(express.static(`${__dirname}/public`));
app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: false }));

//! Routes
const indexRoute = require("./routes/indexRoute");
const loginRoute = require("./routes/loginRoute");

app.use("/", indexRoute);
app.use("/login", loginRoute);

app.get("*", (req, res) => {
  res.send("Wrong path");
});
app.listen(PORT, () => {
  console.log("Server is running on PORT::" + PORT);
});

//!_________
// app.get("/uploadform", (req, res) => {
//   res.render("fileForm");
// });
// // upload.array("pictures")
// app.post("/uploadForm", upload.array("profilePic"), (req, res) => {
//   // console.log("uploadData:", req.file);
//   // console.log("uploadData:", req.files);
//   const arrayOfPictures = req.files;
//   console.log(arrayOfPictures);
//   res.render("fileForm", { pictureArray: arrayOfPictures });
// });

const express = require("express");
const app = express();
const PORT = 9000;

app.use(express.static(`${__dirname}/public`));
app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: false }));

//! Routes
const indexRoute = require("./routes/indexRoute");
//* index
app.use("/", indexRoute);

app.listen(PORT, () => {
  console.log("Server is running on PORT::" + PORT);
});

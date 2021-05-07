const express = require("express");
const app = express();
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

app.listen(PORT, () => {
  console.log("Server is running on PORT::" + PORT);
});

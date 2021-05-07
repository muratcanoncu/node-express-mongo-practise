const url = require("url");
const Costumer = require("../models/costumer");
const loginForm = (req, res) => {
  res.render("login");
};
// const loginFromPost = (req,res)=>{
//   res.render("login")
// }
const signUpForm = (req, res) => {
  res.render("signUp");
};
// const signUpFormPost = (req, res) => {
// const newCostumerData = req.body
// const newCostumer = new Costumer(newCostumerData)
//   res.render("signup");
// }

module.exports = { loginForm, signUpForm };

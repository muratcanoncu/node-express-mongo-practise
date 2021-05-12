const url = require("url");
const Profile = require("../models/Profile");
const bcrypt = require("bcrypt");
const loginForm = (req, res) => {
  res.render("login");
};
// const loginFromPost = (req,res)=>{
//   res.render("login")
// }
const signUpForm = (req, res) => {
  const message = req.query;
  res.render("signUp", { message });
};
const signUpFormPost = (req, res) => {
  if (req.file) {
    req.body.profilePic = req.file.filename;
  }
  const newProfileData = req.body;
  const saltRounds = 5;
  bcrypt.hash(newProfileData.password, saltRounds, (err, hashedPassword) => {
    newProfileData.password = hashedPassword;
  });
  Profile.findOne({ email: req.body.email }, (err, profile) => {
    if (profile === null) {
      const newProfile = new Profile(newProfileData);
      newProfile.save(() => {
        res.redirect("/login");
      });
    } else {
      res.redirect(
        url.format({
          pathname: "/login/register",
          query: {
            takenMessage: "This E-mail address is already taken!",
            isMailTaken: true,
          },
        })
      );
    }
  });
};

module.exports = { loginForm, signUpForm, signUpFormPost };

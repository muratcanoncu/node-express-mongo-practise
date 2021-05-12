const url = require("url");
const Profile = require("../models/Profile");
const bcrypt = require("bcrypt");
const loginForm = (req, res) => {
  const message = req.query;
  res.render("login", { message });
};
const loginFormPost = (req, res) => {
  Profile.findOne({ email: req.body.email }, (err, profile) => {
    if (profile == null) {
      res.redirect(
        url.format({
          pathname: "/login",
          query: {
            failMessage: "E-mail is not found, please check again!",
            falseEntered: true,
          },
        })
      );
    } else {
      bcrypt.compare(req.body.password, profile.password, (err, result) => {
        console.log("Password Matched:", result);
        if (!result) {
          res.redirect(
            url.format({
              pathname: "/login",
              query: {
                failMessage: "Password is wrong, please check again!",
                falseEntered: true,
              },
            })
          );
        } else {
          req.session.loggedInProfile = profile;
          console.log(req.session.loggedInProfile);
          res.redirect(
            url.format({
              pathname: "/login/userprofile",
              query: {
                userName: profile.name,
                userPhoto: profile.pictureName,
              },
            })
          );
        }
      });
    }
  });
};

const signUpForm = (req, res) => {
  const message = req.query;
  res.render("signUp", { message });
};
//! New Profile create
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
const userProfile = (req, res) => {
  res.render("userProfile");
};
module.exports = {
  loginForm,
  loginFormPost,
  signUpForm,
  signUpFormPost,
  userProfile,
};

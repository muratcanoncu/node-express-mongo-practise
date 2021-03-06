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
          res.redirect(
            url.format({
              pathname: "/login/userprofile",
              query: {
                email: profile.email,
              },
            })
          );
        }
      });
    }
  });
};
//! logout
const logOut = (req, res) => {
  res.redirect("/login");
};
//! Signup ----------
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
const userProfile = async (req, res) => {
  const userQuery = req.query;
  const activeUser = req.session.loggedInProfile;
  await Profile.findOne({ email: activeUser.email }, (err, profile) => {
    res.render("userProfile", {
      userDataBase: profile,
      query: userQuery,
    });
  });
};
const userProfilePost = async (req, res) => {
  const userId = req.session.loggedInProfile._id;
  const arrayOfPictures = req.files;
  Profile.findOneAndUpdate(
    { _id: userId },
    { $push: { gallery: arrayOfPictures } },
    (err, profile) => {
      console.log(`${profile.name} added post/s`);
      res.redirect(
        url.format({
          pathname: "/login/userprofile",
          query: {
            email: profile.email,
            addMessage: "New post is successfully added!",
            messageAdded: true,
          },
        })
      );
    }
  );
};
const deletePost = (req, res) => {
  const postId = req.params.id;
  const activeUserEmail = req.session.loggedInProfile.email;
  Profile.update(
    { email: activeUserEmail },
    { $pull: { gallery: { _id: postId } } },
    { safe: true },
    (err, obj) => {
      res.redirect(
        url.format({
          pathname: "/login/userprofile",
          query: {
            email: activeUserEmail,
            deleteMessage: "Post is successfully deleted!",
            messageDeleted: true,
          },
        })
      );
    }
  );
};
module.exports = {
  loginForm,
  loginFormPost,
  signUpForm,
  signUpFormPost,
  userProfile,
  userProfilePost,
  deletePost,
  logOut,
};

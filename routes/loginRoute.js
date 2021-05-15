const express = require("express");
const router = express.Router();
const multer = require("multer");
const auth = require("../config/auth");
const loginControllers = require("../controllers/loginControllers");

router.get("/", auth.checkLogin, loginControllers.loginForm);
router.post("/", loginControllers.loginFormPost);
//! delete session and send user to login when logout
router.get("/logout", auth.logOut, loginControllers.logOut);
router.get("/register", loginControllers.signUpForm);
//! Define storage destination and filename
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/img/uploads");
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage });

router.post(
  "/register",
  //! User profile Picture
  upload.single("profilePic"),
  loginControllers.signUpFormPost
);
router.get("/userprofile", auth.notLoggedIn, loginControllers.userProfile);
router.post(
  "/userprofile",
  //! User posts
  upload.array("userPosts"),
  loginControllers.userProfilePost
);
router.get("/userprofile/delete/:id", loginControllers.deletePost);
module.exports = router;

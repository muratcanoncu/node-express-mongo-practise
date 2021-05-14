const express = require("express");
const router = express.Router();
const multer = require("multer");
const loginControllers = require("../controllers/loginControllers");

router.get("/", loginControllers.loginForm);
router.post("/", loginControllers.loginFormPost);
router.get("/register", loginControllers.signUpForm);
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
  upload.single("profilePic"),
  loginControllers.signUpFormPost
);
router.get("/userprofile", loginControllers.userProfile);
router.post(
  "/userprofile",
  upload.array("userPosts"),
  loginControllers.userProfilePost
);
router.get("/userprofile/delete/:id", loginControllers.deletePost);
module.exports = router;

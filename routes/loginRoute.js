const express = require("express");
const router = express.Router();
const loginControllers = require("../controllers/loginControllers");

router.get("/", loginControllers.loginForm);
router.post("/", loginControllers.loginFormPost);
router.get("/register", loginControllers.signUpForm);
router.post("/register", loginControllers.signUpFormPost);

router.get("/userprofile", loginControllers.userProfile);

module.exports = router;

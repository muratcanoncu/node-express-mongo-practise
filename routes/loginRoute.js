const express = require("express");
const router = express.Router();
const loginControllers = require("../controllers/loginControllers");

router.get("/", loginControllers.loginForm);
// router.post("/", indexControllers.loginFormPost)

router.get("/register", loginControllers.signUpForm);
router.post("/register", loginControllers.signUpFormPost);

module.exports = router;

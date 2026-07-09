const express = require("express");
const router = express.Router();
const { signUp, logIn, logOut, getCurrentUser } = ("../controllers/auth.controller");




router.post("/signup", signUp);
router.post("/login", logIn);
router.post("/logout", logOut);
router.get("/user", getCurrentUser);




module.exports = router;
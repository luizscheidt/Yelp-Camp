const express = require("express");
const router = express.Router();
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync");
const User = require("../models/user");
const {storeReturnTo} = require("../middleware");
const users = require("../controllers/users");

router.get("/register", users.renderRegister);

router.post("/register", wrapAsync(users.register));

router.get("/login", users.renderLogin);

router.post(
  "/login",
  storeReturnTo,
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  users.login
);

router.get("/logout", users.logout);
module.exports = router;

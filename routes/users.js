const express = require("express");
const router = express.Router();
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync");
const {storeReturnTo} = require("../middleware");
const users = require("../controllers/users");

router
  .route("/register")
  .get(users.renderRegister)
  .post(wrapAsync(users.register));

router
  .route("/login")
  .get(users.renderLogin)
  .post(
    storeReturnTo,
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    users.login
  );

router.get("/logout", users.logout);
module.exports = router;

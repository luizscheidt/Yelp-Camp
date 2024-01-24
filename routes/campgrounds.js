const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const campgrounds = require("../controllers/campgrounds");
const {isLoggedIn, validateCampground, isAuthor} = require("../middleware");

router.get("/", wrapAsync(campgrounds.index));

router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router.post(
  "/",
  isLoggedIn,
  validateCampground,
  wrapAsync(campgrounds.createCampground)
);

router.get("/:id", wrapAsync(campgrounds.showPage));

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  wrapAsync(campgrounds.renderEditForm)
);

router.put(
  "/:id",
  isLoggedIn,
  isAuthor,
  validateCampground,
  wrapAsync(campgrounds.updateCampground)
);

router.delete(
  "/:id",
  isLoggedIn,
  isAuthor,
  wrapAsync(campgrounds.deleteCampground)
);

module.exports = router;

const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const {campgroundSchema} = require("../schemas");
const ExpressError = require("../utils/ExpressError");
const Campground = require("../models/campground");
const {isLoggedIn} = require("../middleware");

const validateCampground = (req, res, next) => {
  const {error} = campgroundSchema.validate(req.body);
  if (error) {
    const message = error.details.map((element) => element.message).join(",");
    throw new ExpressError(message, 400);
  } else {
    next();
  }
};

router.get(
  "/",
  wrapAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", {campgrounds});
  })
);

router.get("/new", isLoggedIn, (req, res) => {
  res.render("campgrounds/new");
});

router.post(
  "/",
  isLoggedIn,
  validateCampground,
  wrapAsync(async (req, res, next) => {
    // if (!req.body.campground)
    //   throw new ExpressError("Invalid Campground Data", 400);

    const campground = new Campground(req.body.campground);
    campground.author = req.user._id;
    await campground.save();
    req.flash("success", "Created a new campground!");
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id)
      .populate("reviews")
      .populate("author");
    if (!campground) {
      req.flash("error", "Campground not found");
      res.redirect("/campgrounds");
    }
    res.render("campgrounds/show", {campground});
  })
);

router.get(
  "/:id/edit",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    if (!campground) {
      req.flash("error", "Campground not found");
      res.redirect("/campgrounds");
    }
    res.render("campgrounds/edit", {campground});
  })
);

router.put(
  "/:id",
  isLoggedIn,
  validateCampground,
  wrapAsync(async (req, res) => {
    const {id} = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {
      ...req.body.campground,
    });
    req.flash("success", "The campground has been edited");
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

router.delete(
  "/:id",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash("success", "The campground has been deleted");
    res.redirect("/campgrounds");
  })
);

module.exports = router;

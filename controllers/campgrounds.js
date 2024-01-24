const Campground = require("../models/campground");

const index = async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campgrounds/index", {campgrounds});
};

const renderNewForm = (req, res) => {
  res.render("campgrounds/new");
};

const createCampground = async (req, res, next) => {
  const campground = new Campground(req.body.campground);
  campground.author = req.user._id;
  await campground.save();
  req.flash("success", "Created a new campground!");
  res.redirect(`/campgrounds/${campground._id}`);
};

const showPage = async (req, res) => {
  const campground = await Campground.findById(req.params.id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("author");
  if (!campground) {
    req.flash("error", "Campground not found");
    res.redirect("/campgrounds");
  }
  res.render("campgrounds/show", {campground});
};

const renderEditForm = async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  if (!campground) {
    req.flash("error", "Campground not found");
    res.redirect("/campgrounds");
  }
  res.render("campgrounds/edit", {campground});
};

const updateCampground = async (req, res) => {
  const {id} = req.params;
  const campground = await Campground.findByIdAndUpdate(id, {
    ...req.body.campground,
  });
  req.flash("success", "The campground has been edited");
  res.redirect(`/campgrounds/${campground._id}`);
};

const deleteCampground = async (req, res) => {
  const {id} = req.params;
  await Campground.findByIdAndDelete(id);
  req.flash("success", "The campground has been deleted");
  res.redirect("/campgrounds");
};

module.exports = {
  index,
  renderNewForm,
  createCampground,
  showPage,
  renderEditForm,
  updateCampground,
  deleteCampground,
};

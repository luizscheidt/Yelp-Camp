const Review = require("../models/review");
const Campground = require("../models/campground");

const createReview = async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  const review = new Review(req.body.review);
  review.author = req.user._id;
  campground.reviews.push(review);
  await review.save();
  await campground.save();
  req.flash("success", "Review sent!");
  res.redirect(`/campgrounds/${campground._id}`);
};

const deleteReview = async (req, res) => {
  const {id, reviewId} = req.params;
  await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "The review has been deleted");
  res.redirect(`/campgrounds/${id}`);
};

module.exports = {createReview, deleteReview};

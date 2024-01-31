const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const campgrounds = require("../controllers/campgrounds");
const {isLoggedIn, validateCampground, isAuthor} = require("../middleware");
const multer = require("multer");
const upload = multer({dest: "uploads/"});

router
  .route("/")
  .get(wrapAsync(campgrounds.index))
  .post(upload.single("image"), (req, res) => {
    console.log(req.body, req.file);
    res.send("boa");
  });
// .post(
//   isLoggedIn,
//   validateCampground,
//   wrapAsync(campgrounds.createCampground)
// );

router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(campgrounds.showPage))
  .put(
    isLoggedIn,
    isAuthor,
    validateCampground,
    wrapAsync(campgrounds.updateCampground)
  )
  .delete(isLoggedIn, isAuthor, wrapAsync(campgrounds.deleteCampground));

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  wrapAsync(campgrounds.renderEditForm)
);

module.exports = router;

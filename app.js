const express = require("express");
const path = require("path");
const app = express();
// const mongoose = require("mongoose");

// mongoose
//   .connect("mongodb://127.0.0.1:27017/yelpCamp")
//   .then(() => {
//     console.log("Mongo connection open");
//   })
//   .catch((err) => {
//     console.log("Something went wrong when connecting to mongo");
//     console.log(err);
//   });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

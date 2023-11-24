const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const Campground = require("./models/campground");

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp"),
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  };

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error connecting to database"));
db.once("open", () => {
  console.log("Database connected");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/newcamp", async (req, res) => {
  const camp = new Campground({ title: "Casa Vó", location: "São Miguel" });
  await camp.save();
  res.send(camp);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

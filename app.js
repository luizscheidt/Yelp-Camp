const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const ExpressError = require("./utils/ExpressError");
const methodOverride = require("method-override");

const campgrounds = require("./routes/campgrounds");
const reviews = require("./routes/reviews");

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

app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

const sessionConfig = {
  secret: "Secreto",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));

app.use("/campgrounds", campgrounds);
app.use("/campgrounds/:id/reviews", reviews);

app.get("/", (req, res) => {
  res.send("Home");
});

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const {statusCode = 500} = err;
  if (!err.message) err.message = "Something went wrong";
  res.status(statusCode).render("error", {err});
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

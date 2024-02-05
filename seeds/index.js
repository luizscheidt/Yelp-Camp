const mongoose = require("mongoose");
const cities = require("./cities");
const {places, descriptors} = require("./seeds");
const Campground = require("../models/campground");

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

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 150; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "65aebcec74fe82c0f86c06ea",
      location: `${cities[random1000].city} - ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere eum soluta a consequatur eaque numquam illum sequi assumenda animi porro aliquam dolore, fuga reiciendis distinctio deserunt earum cum culpa dolor",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dw5mtmra1/image/upload/v1706972201/YelpCamp/tllk0miny2oi70oqjr6j.jpg",
          filename: "YelpCamp/tllk0miny2oi70oqjr6j",
        },
        {
          url: "https://res.cloudinary.com/dw5mtmra1/image/upload/v1706972202/YelpCamp/dkzemiluoe4csbrujg7i.jpg",
          filename: "YelpCamp/dkzemiluoe4csbrujg7i",
        },
        {
          url: "https://res.cloudinary.com/dw5mtmra1/image/upload/v1706972204/YelpCamp/fxvk3iqmsm4sgaqxd0jr.jpg",
          filename: "YelpCamp/fxvk3iqmsm4sgaqxd0jr",
        },
        {
          url: "https://res.cloudinary.com/dw5mtmra1/image/upload/v1706972205/YelpCamp/scfrptk8fhvrb54i7y8b.jpg",
          filename: "YelpCamp/scfrptk8fhvrb54i7y8b",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});

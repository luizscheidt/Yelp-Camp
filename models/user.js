const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

//Adds username and password to our schema, makes sure that the username is unique and gives us some aditional methods
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);

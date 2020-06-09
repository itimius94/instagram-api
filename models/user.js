const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  user_name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  full_name: {
    type: String,
    default: null,
    trim: true,
    validate(value) {
      if (value > 32) throw new Error("Maxlength > 32 charactor");
    },
  },
  url_image: {
    type: String,
    default: null,
    trim: true,
  },
  url_website: {
    type: String,
    default: null,
    trim: true,
  },
  bio: {
    type: String,
    default: null,
    trim: true,
  },
  phone_number: {
    type: String,
    default: null,
    trim: true,
  },
  gender: {
    type: String,
    default: null,
    trim: true,
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
